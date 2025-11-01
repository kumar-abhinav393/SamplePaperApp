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
import { useMemo, useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import { useLocation } from "react-router-dom";
import { FaSortNumericUp } from "react-icons/fa";
import { FaSortNumericDown } from "react-icons/fa";
import type { AssignmentProps } from "@/types/types";
import { formatFirestoreDate } from "@/helpers/dateFormatting";
import { useColorModeValue } from "@/components/ui/color-mode";
import { TimeFilter, SortOrder, ColorMode } from "@/helpers/enum";
import { AssignmentCard } from "@/pages/MyAssignments/AssignmentCard";
import { TimeFilterSelect } from "@/components/TimeFilterSelect/TimeFilterSelect";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const textColor = useColorModeValue(ColorMode.black, ColorMode.white);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.desc);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.All);

  const { state } = useLocation() as { state: LocationState };

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

  const requireFilterFirst = !state?.filters;

  const visibleAssignments = useMemo(() => {
    if (requireFilterFirst) return [];
    const sortAssignments = (arr: AssignmentProps[], order: SortOrder = sortOrder) => {
      return [...arr].sort((a, b) => {
        const dateA = new Date(formatFirestoreDate(a.props.createdAt)).getTime()
        const dateB = new Date(formatFirestoreDate(b.props.createdAt)).getTime()
        return order === SortOrder.asc ? dateA - dateB : dateB - dateA
      })
    }
    const assignments: AssignmentProps[] = state?.assignments ?? []
    if (!assignments?.length) return []

    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const startOfThisMonth = new Date(year, month, 1).getTime()
    const startOfNextMonth = new Date(year, month + 1, 1).getTime()
    const startOfLastMonth = new Date(year, month - 1, 1).getTime()

    let list = [...assignments];

    if (timeFilter === TimeFilter.ThisMonth) {
      list = assignments.filter(a => {
        const t = getCreatedMillis(a)
        return t >= startOfThisMonth && t < startOfNextMonth
      });
    }

    if (timeFilter === TimeFilter.LastMonth) {
      list = assignments.filter(a => {
        const t = getCreatedMillis(a)
        return t >= startOfLastMonth && t < startOfThisMonth
      })
    }

    if (timeFilter === TimeFilter.Upcoming) {
      list = assignments.filter(a => {
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
  }, [state?.assignments, timeFilter, sortOrder, searchTerm, requireFilterFirst])

  const hasNoResults = !requireFilterFirst && visibleAssignments.length === 0; 
  
  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === SortOrder.desc ? SortOrder.asc : SortOrder.desc));
  };

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
            <GridItem colEnd={[23]} display={"flex"} colStart={[1, 1, 2, 2, 2]}>
              <TimeFilterSelect value={timeFilter} onChange={setTimeFilter} disabled={requireFilterFirst} />
              <Flex gap={2} display={{ base: "none", lg: "flex" }}>
                <Button
                  h={"40px"}
                  w={"100px"}
                  fontSize={"lg"}
                  color={textColor}
                  border={"1px solid black"}
                  disabled={requireFilterFirst}
                  onClick={() => setTimeFilter(TimeFilter.All)}
                  bg={timeFilter === TimeFilter.All && !requireFilterFirst ? "#70f63bd6" : "#3bc8f6d6"}
                >
                  All
                </Button>
                <Button
                  h={"40px"}
                  w={"100px"}
                  fontSize={"lg"}
                  color={textColor}
                  border={"1px solid black"}
                  disabled={requireFilterFirst}
                  onClick={() => setTimeFilter(TimeFilter.ThisMonth)}
                  bg={timeFilter === TimeFilter.ThisMonth ? "#70f63bd6" : "#3bc8f6d6"}
                >
                  This Month
                </Button>
                <Button
                  h={"40px"}
                  w={"100px"}
                  fontSize={"lg"}
                  color={textColor}
                  border={"1px solid black"}
                  disabled={requireFilterFirst}
                  onClick={() => setTimeFilter(TimeFilter.LastMonth)}
                  bg={timeFilter === TimeFilter.LastMonth ? "#70f63bd6" : "#3bc8f6d6"}
                >
                  Last Month
                </Button>
                <Button
                  h={"40px"}
                  w={"100px"}
                  fontSize={"lg"}
                  color={textColor}
                  border={"1px solid black"}
                  disabled={requireFilterFirst}
                  onClick={() => setTimeFilter(TimeFilter.Upcoming)}
                  bg={timeFilter === TimeFilter.Upcoming ? "#70f63bd6" : "#3bc8f6d6"}
                >
                  Upcoming
                </Button>
              </Flex>
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
              <Alert.Title
                fontSize={["l", "l", "xl", "1xl", "1xl"]}
                >
                  No Assignment found for the current filter.
                </Alert.Title>
            </Alert.Root>
          )}
          <AssignmentCard assignments={visibleAssignments} />
        </Box>
      </SimpleGrid>
    </Box>
  );
};