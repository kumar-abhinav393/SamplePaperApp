import { useEffect, useState } from "react";
import { Filter } from "./Filter";
import { useCollection } from "@/hooks/useCollection";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LeftSidebar } from "@/components/Sidebar/LeftSidebar";
import { RightSidebar } from "@/components/Sidebar/RightSidebar";
import type {
  AssignmentProps,
  BoardProps,
  ClassProps,
  QueryParams,
  SubjectProps,
} from "@/types/types";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

export const FilterAssignments = () => {
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const textColor = useColorModeValue("black", "white");

  const { user } = useAuthContext();

  const [selectedPaperCode, setSelectedPaperCode] = useState<string | null>(null);
  const [selectedBoardCode, setSelectedBoardCode] = useState<string | null>(null);
  const [selectedClassCode, setSelectedClassCode] = useState<number | null>(null);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string | null>(null);

  const { documents: Boards } = useCollection<BoardProps>("Boards");
  const { documents: Classes } = useCollection<ClassProps>("Classes");

  const subjectQuery: QueryParams | undefined =
    selectedClassCode != null
      ? {
        fieldPath: "classLevels",
        opStr: "array-contains",
        value: selectedClassCode,
      }
      : undefined;

  const AssignmentQuery: QueryParams | undefined = {
    fieldPath: "code",
    opStr: "==",
    value: "ASSIGNMENTS"
  }

  const { documents: Subjects } = useCollection<SubjectProps>("Subjects", subjectQuery);
  const { documents: Assignments } = useCollection<AssignmentProps>("Papers", AssignmentQuery);

  useEffect(() => {
    console.log(
      Assignments.map(a => ({
        author: a.props.createdBy,
        topicName: a.props.topicName,
        createdAt: a.props.createdAt,
        classLevel: a.props.classLevels,
        subjectCode: a.props.subjectCode,
        boardLevel: a.props.boardFilters,
        description: a.props.description,
      }))
    )
  }, [Assignments])

  const totalBoards = Boards.length;
  const totalClasses = Classes.length;
  const totalSubjects = Subjects.length;
  const status = user ? "active" : "inactive";

  const handleClearAll = () => {
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
    } else {
      console.log(
        Assignments.map(a => ({
          author: a.props.createdBy,
          topicName: a.props.topicName,
          createdAt: a.props.createdAt,
          classLevel: a.props.classLevels,
          subjectCode: a.props.subjectCode,
          boardLevel: a.props.boardFilters,
          description: a.props.description,
        }))
      )
    }
  };

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
            isHorizontal={true}
            status={status}
            totalClasses={totalClasses}
            totalBoards={totalBoards}
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
            totalClasses={totalClasses}
            totalBoards={totalBoards}
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
              boards={Boards}
              classes={Classes}
              subjects={Subjects}
              assignments={Assignments}
              selectedPaperCode={selectedPaperCode}
              selectedBoardCode={selectedBoardCode}
              selectedClassCode={selectedClassCode}
              selectedSubjectCode={selectedSubjectCode}
              setSelectedPaperCode={setSelectedPaperCode}
              onClassCodeChange={setSelectedClassCode}
              setSelectedBoardCode={setSelectedBoardCode}
              setSelectedSubjectCode={setSelectedSubjectCode}
            />
            <Flex mt={4} w={"100%"} justifyContent={"space-between"}>
              <Button
                w={"120px"}
                color={textColor}
                bg={"#3bc8f6d6"}
                onClick={handleClearAll}
                border={"1px solid black"}
                fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
              >
                Clear All
              </Button>
              <Button
                w={"120px"}
                color={textColor}
                bg={"#3bc8f6d6"}
                onClick={handleFilter}
                border={"1px solid black"}
                fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
              >
                Filter
              </Button>
            </Flex>
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
          <RightSidebar isHorizontal={false} totalSubjects={totalSubjects} />
        </Box>
      </SimpleGrid>
      {isTablet && (
        <Box display="flex" justifyContent="center" w="100%" p={"10"}>
          <Box h="1px" bg="#444746" w="99%" borderRadius="1px" />
        </Box>
      )}

      {isTablet && (
        <Box mt={4} display="flex" justifyContent="center" w="100%">
          <RightSidebar isHorizontal={true} totalSubjects={totalSubjects} />
        </Box>
      )}
    </Box>
  );
};