import {
  Alert,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import { useLocation } from "react-router-dom";
import { FaSortNumericUp } from "react-icons/fa";
import { FaSortNumericDown } from "react-icons/fa";
import type { AssignmentProps, FacultyProfileProps } from "@/types/types";
import { formatFirestoreDate } from "@/helpers/dateFormatting";
import { useColorModeValue } from "@/components/ui/color-mode";
import { TimeFilter, SortOrder, ColorMode, UserRole } from "@/helpers/enum";
import { AssignmentCard } from "@/pages/MyAssignments/AssignmentCard";
import { TimeFilterSelect } from "@/components/TimeFilterSelect/TimeFilterSelect";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { useCollection } from "@/hooks/useCollection";
import { useFirestore } from "@/hooks/useFirestore";
import { toaster } from "@/components/ui/toaster";
import { FacultyFilterSelect } from "@/components/FacultyFilterSelect/FacultyFilterSelect";

type LocationState = {
  assignments?: AssignmentProps[];
  filters?: {
    paper: string | null;
    classCode: number | null;
    boardCode: string | null;
    subjectCode: string | null;
  };
};

export const MyAssignments = () => {
  const { role } = useUserRole();
  const { user } = useAuthContext();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const textColor = useColorModeValue(ColorMode.black, ColorMode.white);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.desc);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.All);

  const { state } = useLocation() as { state: LocationState };
  const { updateDocument, deleteDocument, response } = useFirestore<AssignmentProps>("Papers");

  const { documents: uploadedAssignments } = useCollection<AssignmentProps>("Papers", {
    where: {
      fieldPath: "createdBy",
      opStr: "==",
      value: user?.displayName
    }
  });

  const { documents: Faculties } = useCollection<{ id: string; props: FacultyProfileProps }>("Faculties");

  const normalize = (s: unknown): string =>
    typeof s === "string" ? s
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ") : ""

  const getCreatedMillis = (assignment: AssignmentProps) => {
    return new Date(formatFirestoreDate((assignment.props.createdAt))).getTime()
  }

  const requireFilterFirst = role?.role !== UserRole.FACULTY && !state?.filters;

  const visibleAssignments = useMemo(() => {
    if (requireFilterFirst) return [];
    return state?.assignments ?? [];
  }, [state?.assignments, requireFilterFirst]);

  // Conditional assignments based on role
  const assignmentToShow = role?.role === UserRole.FACULTY ? uploadedAssignments : visibleAssignments;

  const processedAssignments = useMemo(() => {
    if (!assignmentToShow.length) return []

    const sortAssignments = (arr: AssignmentProps[], order: SortOrder = sortOrder) => {
      return [...arr].sort((a, b) => {
        const dateA = new Date(formatFirestoreDate(a.props.createdAt)).getTime()
        const dateB = new Date(formatFirestoreDate(b.props.createdAt)).getTime()
        return order === SortOrder.asc ? dateA - dateB : dateB - dateA
      })
    }

    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const startOfThisMonth = new Date(year, month, 1).getTime()
    const startOfNextMonth = new Date(year, month + 1, 1).getTime()
    const startOfLastMonth = new Date(year, month - 1, 1).getTime()

    let list = [...assignmentToShow];

    if (timeFilter === TimeFilter.ThisMonth) {
      list = assignmentToShow.filter(a => {
        const t = getCreatedMillis(a)
        return t >= startOfThisMonth && t < startOfNextMonth
      });
    }

    if (timeFilter === TimeFilter.LastMonth) {
      list = assignmentToShow.filter(a => {
        const t = getCreatedMillis(a)
        return t >= startOfLastMonth && t < startOfThisMonth
      })
    }

    if (timeFilter === TimeFilter.Upcoming) {
      list = assignmentToShow.filter(a => {
        const t = getCreatedMillis(a)
        return t > startOfNextMonth
      })
    }

    if (searchTerm.trim() !== "") {
      const q = normalize(searchTerm)
      list = list.filter((a) => {
        const topic = normalize((a)?.props?.topicName ?? "")
        const facultyName = normalize((a)?.props?.createdBy)
        const uploadDate = normalize(
          (a)?.props?.createdAt
            ? formatFirestoreDate((a)?.props?.createdAt)
            : ""
        )
        return topic.includes(q) || facultyName.includes(q) || uploadDate.includes(q)
      })
    }

    return sortAssignments(list, sortOrder)
  }, [assignmentToShow, timeFilter, sortOrder, searchTerm])

  const hasNoResults = !requireFilterFirst && processedAssignments.length === 0;

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === SortOrder.desc ? SortOrder.asc : SortOrder.desc));
  };

  useEffect(() => {
    if (response.error) {
      toaster.error({
        title: response.error,
      })
    }
  }, [response])

  return (
    <Box
      id="my-assignments"
      mx={"auto"}
      maxW={"1200px"}
      w={["100vw", "100vw", "100vw", "95vw", "90vw"]}
    >
      <SimpleGrid h={"100vh"} gridRowStart={3} templateRows={"auto auto 1fr"}>
        <Box mt={[3, 3, 5, 5, 6]}>
          <Grid
            templateColumns={"repeat(24, 1fr)"}
            h={["30px", "30px", "40px", "40px", "40px"]}
          >
            <GridItem
              display={"flex"}
              colStart={[1, 1, 2, 2, 2]}
              colEnd={[24, 24, 23, 23, 23]}
            >
              <Input
                value={searchTerm}
                disabled={requireFilterFirst}
                placeholder="Search assignments..."
                fontSize={["l", "l", "xl", "1xl", "1xl"]}
                h={["30px", "30px", "40px", "40px", "40px"]}
                onChange={(e) => setSearchTerm(e.target.value)}
                css={{
                  "--focus-color": "#3bc8f6d6",
                  border: "1px solid #444746",
                }}
              />
            </GridItem>
            <GridItem
              colEnd={24}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              colStart={[25, 25, 23, 23, 23]}
            >
              <Button
                ml={1}
                color={textColor}
                bg={"#3bc8f6d6"}
                border={"1px solid black"}
                disabled={requireFilterFirst}
                h={["30px", "30px", "40px", "40px", "40px"]}
                w={["25px", "25px", "35px", "40px", "40px"]}
              >
                <TfiSearch />
              </Button>
            </GridItem>
          </Grid>
        </Box>
        <Box mt={[3, 3, 5, 5, 6]}>
          <Grid
            templateColumns={"repeat(24, 1fr)"}
            h={["30px", "30px", "40px", "40px", "40px"]}
          >
            {(role?.role === UserRole.STUDENT || role?.role === UserRole.FACULTY) && (
              <GridItem colEnd={[23]} display={"flex"} colStart={[1, 1, 2, 2, 2]}>
                <TimeFilterSelect
                  value={timeFilter}
                  onChange={setTimeFilter}
                  disabled={requireFilterFirst} />
                <Flex gap={2} display={{ base: "none", lg: "flex" }}>
                  <Button
                    color={textColor}
                    border={"1px solid black"}
                    disabled={requireFilterFirst}
                    fontSize={["sm", "sm", "md", "lg", "lg"]}
                    h={["30px", "30px", "30px", "40px", "40px"]}
                    onClick={() => setTimeFilter(TimeFilter.All)}
                    w={["80px", "80px", "100px", "120px", "120px"]}
                    bg={timeFilter === TimeFilter.All ? "#70f63bd6" : "#3bc8f6d6"}
                  >
                    All
                  </Button>
                  <Button
                    color={textColor}
                    border={"1px solid black"}
                    disabled={requireFilterFirst}
                    fontSize={["sm", "sm", "md", "lg", "lg"]}
                    h={["30px", "30px", "30px", "40px", "40px"]}
                    w={["80px", "80px", "100px", "120px", "120px"]}
                    onClick={() => setTimeFilter(TimeFilter.ThisMonth)}
                    bg={timeFilter === TimeFilter.ThisMonth ? "#70f63bd6" : "#3bc8f6d6"}
                  >
                    This Month
                  </Button>
                  <Button
                    color={textColor}
                    border={"1px solid black"}
                    disabled={requireFilterFirst}
                    fontSize={["sm", "sm", "md", "lg", "lg"]}
                    h={["30px", "30px", "30px", "40px", "40px"]}
                    w={["80px", "80px", "100px", "120px", "120px"]}
                    onClick={() => setTimeFilter(TimeFilter.LastMonth)}
                    bg={timeFilter === TimeFilter.LastMonth ? "#70f63bd6" : "#3bc8f6d6"}
                  >
                    Last Month
                  </Button>
                  <Button
                    color={textColor}
                    border={"1px solid black"}
                    disabled={requireFilterFirst}
                    fontSize={["sm", "sm", "md", "lg", "lg"]}
                    h={["30px", "30px", "30px", "40px", "40px"]}
                    w={["80px", "80px", "100px", "120px", "120px"]}
                    onClick={() => setTimeFilter(TimeFilter.Upcoming)}
                    bg={timeFilter === TimeFilter.Upcoming ? "#70f63bd6" : "#3bc8f6d6"}
                  >
                    Upcoming
                  </Button>
                </Flex>
              </GridItem>
            )}
            {role?.role === UserRole.ADMIN && (
              <GridItem colEnd={[23]} display={"flex"} colStart={[1, 1, 2, 2, 2]}>
                <FacultyFilterSelect faculties={Faculties} />
              </GridItem>
            )}
            <GridItem
              colEnd={24}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              colStart={[25, 25, 23, 23, 23]}
            >
              <Button
                ml={1}
                color={textColor}
                bg={"#3bc8f6d6"}
                onClick={handleSortToggle}
                border={"1px solid black"}
                disabled={requireFilterFirst}
                h={["30px", "30px", "40px", "40px", "40px"]}
                w={["25px", "25px", "35px", "40px", "40px"]}
              >
                {sortOrder === SortOrder.desc ? (
                  <FaSortNumericUp />
                ) : (
                  <FaSortNumericDown />
                )}
              </Button>
            </GridItem>
          </Grid>
        </Box>
        <Box
          mt={[5, 5, 6]}
          overflowX={"auto"}
          borderRadius={"lg"}
          whiteSpace={"nowrap"}
          pb={[2, 2, 4, 4, 10]}
          mx={[0, 0, 8, 10, 10]}
          border={"1px solid #444746"}
          bg={{ base: "white", _dark: "black" }}
        >
          {requireFilterFirst && (
            <Alert.Root
              status="info"
              textWrap={"wrap"}
              title="This is the alert title"
              size={["sm", "sm", "md", "md", "lg"]}>
              <Alert.Indicator />
              <Alert.Title
                fontSize={["l", "l", "xl", "1xl", "1xl"]}
              >
                Please open <b>Filter Assignment</b> tab and select your filters first.
              </Alert.Title>
            </Alert.Root>
          )}
          {hasNoResults && (
            <Alert.Root
              status="info"
              textWrap={"wrap"}
              title="This is the alert title"
              size={["sm", "sm", "md", "md", "lg"]}>
              <Alert.Indicator />
              {role?.role === UserRole.FACULTY ? (
                <Alert.Title
                  fontSize={["l", "l", "xl", "1xl", "1xl"]}
                >
                  No Assignment uploaded so far.
                </Alert.Title>
              ) : (
                <Alert.Title
                  fontSize={["l", "l", "xl", "1xl", "1xl"]}
                >
                  No Assignment found for the current filter.
                </Alert.Title>
              )}
            </Alert.Root>
          )}
          {processedAssignments.length && (
            <AssignmentCard
              assignments={processedAssignments}
              role={role?.role}
              deleteDocument={deleteDocument}
              updateDocument={updateDocument} />
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
};