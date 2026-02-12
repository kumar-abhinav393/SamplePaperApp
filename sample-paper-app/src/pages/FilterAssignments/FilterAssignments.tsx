import { useEffect, useState } from "react";
import { Filter } from "./Filter";
import { UserRole } from "@/helpers/enum";
import { useCollection } from "@/hooks/useCollection";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LeftSidebar } from "@/components/Sidebar/LeftSidebar";
import { RightSidebar } from "@/components/Sidebar/RightSidebar";
import {
  type AssignmentProps,
  type BoardProps,
  type ClassProps,
  type FacultyProfileProps,
  type PaperCode,
  type QueryParams,
  type SubjectProps,
} from "@/types/types";
import {
  Text,
  Box,
  Button,
  Flex,
  SimpleGrid,
  Stack,
  useBreakpointValue,
  CloseButton,
  Clipboard,
  InputGroup,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { RouterPaths } from "@/global/enum";
import { useUserRole } from "@/hooks/useUserRole";
import { useFacultyProfile } from "@/hooks/useFacultyProfile";
import { FacultyProfile } from "@/components/Modals/FacultyProfile";
import { uploadAssignmentPdf } from "@/helpers/uploadAssignmentPdf";
import { createAssignmentDocument } from "@/helpers/createAssignmentDocument";
import { createInviteToken } from "@/helpers/createInviteToken";
import { Timestamp } from "firebase/firestore";

export const FilterAssignments = () => {
  const navigate = useNavigate();
  const { role } = useUserRole();
  const { user } = useAuthContext();
  const { profile, loading } = useFacultyProfile();

  const textColor = useColorModeValue("black", "white");
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });

  const status = user ? "active" : "inactive";
  const isFaculty = role?.role === UserRole.FACULTY;

  const [topicName, setTopicName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [addDescription, setAddDescription] = useState("");
  const [inviteLink, setInviteLink] = useState<string>("");
  const [inviteRole, setInviteRole] = useState<UserRole | null>(null);
  const [assignmentPdf, setAssignmentPdf] = useState<File | null>(null);
  const [inviteCreatedAt, setInviteCreatedAt] = useState<string | null>(null);
  const [inviteExpiresAt, setInviteExpiresAt] = useState<string | null>(null);
  const [showFacultyProfileModal, setShowFacultyProfileModal] = useState(false);
  const [selectedBoardCode, setSelectedBoardCode] = useState<string | null>(null);
  const [selectedClassCode, setSelectedClassCode] = useState<number | null>(null);
  const [selectedPaperCode, setSelectedPaperCode] = useState<PaperCode | null>(null);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string | null>(null);

  const { documents: Boards } = useCollection<BoardProps>("Boards");
  const { documents: Classes } = useCollection<ClassProps>("Classes");
  const facultiesCollection = role?.role === UserRole.ADMIN ? "Faculties" : undefined;
  const { documents: Faculties } = useCollection<{ id: string; props: FacultyProfileProps }>(
    facultiesCollection
  );

  const paperTypes: { code: PaperCode; name: string }[] = [
    { code: "ASSIGNMENT", name: "Assignments" },
    { code: "QUESTION_PAPER", name: "Question Papers" },
  ]

  const subjectQuery: QueryParams | undefined =
    selectedClassCode != null
      ? {
        where: { fieldPath: "classLevels", opStr: "array-contains", value: selectedClassCode, }
      }
      : undefined;

  const AssignmentQuery: QueryParams | undefined =
    selectedPaperCode === "ASSIGNMENT"
      ? {
        where: { fieldPath: "code", opStr: "==", value: "ASSIGNMENT" },
        orderBy: { fieldPath: "createdAt", direction: "desc" }
      }
      : undefined;

  const { documents: Subjects } = useCollection<SubjectProps>("Subjects", subjectQuery);
  const { documents: Assignments } = useCollection<AssignmentProps>("Papers", AssignmentQuery);

  useEffect(() => {
    if (!loading && isFaculty && user && !profile) {
      setShowFacultyProfileModal(true);
    }
  }, [loading, isFaculty, user, profile]);

  const handleClearAll = () => {
    setTopicName("");
    setInviteLink("");
    setInviteRole(null);
    setAddDescription("");
    setAssignmentPdf(null);
    setInviteCreatedAt(null);
    setInviteExpiresAt(null);
    setSelectedPaperCode(null);
    setSelectedClassCode(null);
    setSelectedBoardCode(null);
    setSelectedSubjectCode(null);
  };

  const handleFilter = () => {
    if (
      !selectedPaperCode ||
      !selectedClassCode ||
      !selectedBoardCode ||
      !selectedSubjectCode
    ) {
      toaster.create({
        title: "Missing Selection",
        type: "warning",
        description: "Please make the selection before filtering",
      });
      return;
    }

    if (selectedPaperCode === "QUESTION_PAPER") {
      toaster.create({
        title: "Coming Soon",
        type: "info",
        description: "Filtering 'Question Papers' will be added soon."
      });
      return
    }

    // In-memory filtering (simple, effecitve for small datasets)
    const filtered = Assignments
      .filter(a => a.props.classLevels === selectedClassCode)
      .filter(a => a.props.boardFilters.includes(selectedBoardCode))
      .filter(a => a.props.subjectCode === selectedSubjectCode);

    if (filtered.length === 0) {
      toaster.create({
        title: "No Results",
        type: "info",
        description: "No assignments found for your current filter."
      });
      return
    }
    filtered.map(a => ({
      author: a.props.createdBy,
      topicName: a.props.topicName,
      createdAt: a.props.createdAt,
      classLevel: a.props.classLevels,
      subjectCode: a.props.subjectCode,
      boardLevel: a.props.boardFilters,
      description: a.props.description,
      submittedAt: a.props.submittedAt,
    }))
    navigate(RouterPaths.MyAssignments, {
      state: {
        assignments: filtered,
        filters: {
          class: selectedClassCode,
          board: selectedBoardCode,
          subject: selectedSubjectCode,
          paper: selectedPaperCode
        }
      }
    })
  }

  const handleUpload = async () => {
    if (
      !selectedPaperCode ||
      !selectedClassCode ||
      !selectedBoardCode ||
      !selectedSubjectCode
    ) {
      toaster.create({
        title: "Missing Selection",
        type: "warning",
        description: "Please make the selection before Uploading.",
      });
      return;
    } else if (!topicName) {
      toaster.create({
        title: "Missing Topic Name",
        type: "warning",
        description: "Please enter the topic name before uploading.",
      });
      return
    } else {
      try {
        if (assignmentPdf) {
          setIsUploading(true);
          const downloadUrl = await uploadAssignmentPdf(assignmentPdf);
          const response = await createAssignmentDocument({
            status: status,
            topicName: topicName,
            filePath: downloadUrl,
            name: selectedPaperCode,
            authorId: user?.uid || "",
            description: addDescription ? addDescription : "No Description so far",
            classLevels: selectedClassCode,
            boardFilters: [selectedBoardCode],
            subjectCode: selectedSubjectCode,
            createdBy: user?.displayName || "",
            code: selectedPaperCode.toLocaleUpperCase(),
          });
          if (response) {
            toaster.create({
              title: "Assignment uploaded",
              type: "success",
              description: "You Assignment is successfully uploaded"
            })
          }
        }
      } catch (error) {
        toaster.create({
          title: "Upload failed",
          type: "error",
          description: error
        })
      }
      finally {
        setIsUploading(false);
        handleClearAll();
      }
    }
  }

  const handleCreateInvite = async () => {
    if (!inviteRole || !inviteCreatedAt || !inviteExpiresAt) {
      toaster.create({
        title: "Missing Fields",
        type: "warning",
        description: "Please fill in all invite fields"
      });
      return
    };

    if (!user || role?.role !== UserRole.ADMIN) {
      toaster.create({
        title: "Not authorised",
        type: "warning",
        description: "Only admins can generate the invite links."
      });
      return;
    }

    try {
      setIsGenerating(true);
      const inviteId = await createInviteToken(
        inviteRole,
        Timestamp.fromDate(new Date(inviteCreatedAt)),
        Timestamp.fromDate(new Date(inviteExpiresAt)),
        user.uid
      );
      const inviteToken = `${window.location.origin}${RouterPaths.Signup}?invite=${inviteId}`;
      setInviteLink(inviteToken);
    } catch (err) {
      toaster.create({
        title: "Error",
        type: "error",
        description: err
      });
    } finally {
      setIsGenerating(false);
      handleClearAll();
    }
  }

  const ClipboardIconButton = () => {
    return (
      <Clipboard.Trigger asChild>
        <IconButton variant={"surface"} size={"xs"} me={"-2"}>
          <Clipboard.Indicator />
        </IconButton>
      </Clipboard.Trigger>
    )
  }

  return (
    <Box
      id="filter-assignment"
      mx={"auto"}
      maxW={"1200px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      w={["100vw", "100vw", "100vw", "100vw", "95vw"]}
    >
      {isTablet && (
        <Box mb={4} display={"flex"} justifyContent={"center"}>
          <LeftSidebar
            status={status}
            role={role?.role}
            profile={profile}
            classes={Classes}
            subjects={Subjects}
            isHorizontal={true}
          />
        </Box>
      )}

      {isTablet && (
        <Box display="flex" justifyContent="center" w="100%" p={"10"}>
          <Box h="1px" bg="#444746" w="99%" borderRadius="1px" />
        </Box>
      )}

      <SimpleGrid
        w={"100%"}
        alignItems={"stretch"}
        gridTemplateColumns={{
          base: "1fr",
          md: isTablet ? "1fr" : "180px 24px 1fr 24px 180px",
          lg: "220px 24px 2.5fr 24px 220px",
        }}
        columns={{ base: 1, md: isTablet ? 1 : 5, lg: 5 }}
      >
        <Box
          h={"100%"}
          as={"aside"}
          alignItems={"center"}
          justifyContent={"center"}
          display={{ base: "none", md: isTablet ? "none" : "flex", lg: "flex" }}
        >
          <LeftSidebar
            status={status}
            role={role?.role}
            profile={profile}
            classes={Classes}
            subjects={Subjects}
          />
        </Box>
        <Box
          alignItems={"stretch"}
          justifyContent={"center"}
          display={{ base: "none", md: isTablet ? "none" : "flex", lg: "flex" }}
        >
          <Box w={"1px"} bg={"#444746"} h={"100%"} />
        </Box>
        <Box
          w={"100%"}
          mx={"auto"}
          as={"form"}
          p={[4, 6, 8]}
          borderRadius={"lg"}
          maxW={["100%", "100%", "100%"]}
        >
          <Stack gap={4}>
            <Filter
              role={role?.role}
              boards={Boards}
              classes={Classes}
              subjects={Subjects}
              topicName={topicName}
              paperTypes={paperTypes}
              inviteRole={inviteRole}
              assignments={Assignments}
              setTopicName={setTopicName}
              assignmentPdf={assignmentPdf}
              setInviteRole={setInviteRole}
              addDescription={addDescription}
              inviteCreatedAt={inviteCreatedAt}
              inviteExpiresAt={inviteExpiresAt}
              setAssignmentPdf={setAssignmentPdf}
              setAddDescription={setAddDescription}
              selectedPaperCode={selectedPaperCode}
              selectedBoardCode={selectedBoardCode}
              selectedClassCode={selectedClassCode}
              setInviteCreatedAt={setInviteCreatedAt}
              setInviteExpiresAt={setInviteExpiresAt}
              onClassCodeChange={setSelectedClassCode}
              selectedSubjectCode={selectedSubjectCode}
              setSelectedPaperCode={setSelectedPaperCode}
              setSelectedBoardCode={setSelectedBoardCode}
              setSelectedSubjectCode={setSelectedSubjectCode}
            />
            {assignmentPdf && (
              <Box
                display={"flex"}
                justifyContent={"flex-end"}
              >
                <Text
                  fontSize={"sm"}
                  color={"#3bc8f6d6"}
                >
                  {assignmentPdf.name}
                </Text>
                <CloseButton
                  size={"2xs"}
                  variant={"ghost"}
                  onClick={() => setAssignmentPdf(null)}
                />
              </Box>
            )}
            <Flex justifyContent={"space-between"}>
              <Button
                color={textColor}
                bg={"#3bc8f6d6"}
                onClick={handleClearAll}
                border={"1px solid black"}
                fontSize={["sm", "sm", "md", "lg", "lg"]}
                h={["30px", "30px", "30px", "40px", "40px"]}
                w={["80px", "80px", "100px", "120px", "120px"]}
              >
                Clear All
              </Button>
              <Button
                color={textColor}
                bg={"#3bc8f6d6"}
                loading={isUploading}
                disabled={role?.role === UserRole.FACULTY
                  ? isUploading
                  : role?.role === UserRole.ADMIN
                    ? isGenerating
                    : false
                }
                border={"1px solid black"}
                fontSize={["sm", "sm", "md", "lg", "lg"]}
                h={["30px", "30px", "30px", "40px", "40px"]}
                w={["80px", "80px", "100px", "120px", "120px"]}
                onClick={role?.role == UserRole.FACULTY
                  ? handleUpload
                  : role?.role == UserRole.STUDENT
                    ? handleFilter
                    : handleCreateInvite}
              >
                {role?.role === UserRole.FACULTY ? "Upload"
                  : role?.role === UserRole.STUDENT ? "Filter"
                    : role?.role === UserRole.ADMIN ? "Create" : ""}
              </Button>
            </Flex>
            {role?.role === UserRole.ADMIN && (
              <Clipboard.Root
                maxW={"100%"}
                value={inviteLink}
              >
                <InputGroup endElement={<ClipboardIconButton />}>
                  <Clipboard.Input asChild>
                    <Input readOnly />
                  </Clipboard.Input>
                </InputGroup>
              </Clipboard.Root>
            )}
          </Stack>
        </Box>
        <Box
          alignItems={"stretch"}
          justifyContent={"center"}
          display={{ base: "none", md: isTablet ? "none" : "flex", lg: "flex" }}
        >
          <Box w={"1px"} bg={"#444746"} h={"100%"} />
        </Box>
        <Box
          h={"100%"}
          as={"aside"}
          alignItems={"center"}
          justifyContent={"center"}
          display={{ base: "none", md: isTablet ? "none" : "flex", lg: "flex" }}
        >
          <RightSidebar
            boards={Boards}
            role={role?.role}
            profile={profile}
            isHorizontal={false}
            faculties={Faculties}
          />
        </Box>
      </SimpleGrid>
      {isTablet && (
        <Box display="flex" justifyContent="center" w="100%" p={"10"}>
          <Box h="1px" bg="#444746" w="99%" borderRadius="1px" />
        </Box>
      )}

      {isTablet && (
        <Box mt={4} display="flex" justifyContent="center" w="100%">
          <RightSidebar
            boards={Boards}
            role={role?.role}
            profile={profile}
            isHorizontal={true}
            faculties={Faculties}
          />
        </Box>
      )}
      {showFacultyProfileModal && (
        <Box
          top={0}
          left={0}
          w={"100vw"}
          h={"100vh"}
          zIndex={1000}
          display={"flex"}
          position={"fixed"}
          alignItems={"center"}
          bg="rgba(0, 0, 0, 0.8)"
          justifyContent={"center"}
          backdropFilter={"blur(3px)"}
        >
          <FacultyProfile
            user={{
              displayName: user?.displayName || "",
              email: user?.email || ""
            }}
            onClose={() => setShowFacultyProfileModal(false)}
            classes={Classes}
            subjects={Subjects}
            boards={Boards}
          />
        </Box>
      )}
    </Box>
  )
};