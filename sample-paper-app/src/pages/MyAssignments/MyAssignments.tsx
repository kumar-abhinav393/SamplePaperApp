import {
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
import { useColorModeValue } from "@/components/ui/color-mode";
import { TimeFilter, SortOrder, ColorMode } from "@/helpers/enum";
import { AssignmentCard } from "@/pages/MyAssignments/AssignmentCard";
import { TimeFilterSelect } from "@/components/TimeFilterSelect/TimeFilterSelect";
import { formatFirestoreDate } from "@/helpers/dateFormatting";

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
  const textColor = useColorModeValue(ColorMode.black, ColorMode.white);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.desc);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.All);

  const { state } = useLocation() as { state: LocationState };
  const assignments: AssignmentProps[] = state?.assignments ?? []

  const getCreatedMillis = (assignment: AssignmentProps) => {
    return new Date(formatFirestoreDate((assignment.props.createdAt))).getTime()
  }
  
  const visibleAssignments = useMemo(() => {
    if (!assignments?.length) return []

    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const startOfThisMonth = new Date(year, month, 1).getTime()
    const startOfNextMonth = new Date(year, month + 1, 1).getTime()
    const startOfLastMonth = new Date(year, month - 1, 1).getTime()
    
    let list = assignments;

    if(timeFilter === TimeFilter.ThisMonth) {
      list = assignments.filter(a => {
        const t = getCreatedMillis(a)
        return t >= startOfThisMonth && t < startOfNextMonth
      });
    }

    if(timeFilter === TimeFilter.LastMonth) {
      list = assignments.filter(a => {
        const t = getCreatedMillis(a)
        return t >= startOfLastMonth && t < startOfThisMonth
      })
    }

    return [...list].sort((a, b) => {
      const x = a.props.createdAt?.toMillis?.() ?? 0;
      const y = b.props.createdAt?.toMillis?.() ?? 0;
      return sortOrder === SortOrder.asc ? x - y : y - x;
    })
  }, [assignments, timeFilter, sortOrder])

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
                placeholder="Search assignments..."
                fontSize={["l", "l", "xl", "1xl", "1xl"]}
                h={["30px", "30px", "40px", "40px", "40px"]}
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
              <TimeFilterSelect />
              <Flex gap={2} display={{ base: "none", lg: "flex" }}>
                <Button
                  h={"40px"}
                  w={"100px"}
                  fontSize={"lg"}
                  color={textColor}
                  border={"1px solid black"}
                  onClick={() => setTimeFilter(TimeFilter.All)}
                  bg={timeFilter === TimeFilter.All ? "#70f63bd6" : "#3bc8f6d6"}
                >
                  All
                </Button>
                <Button
                  h={"40px"}
                  w={"100px"}
                  fontSize={"lg"}
                  color={textColor}
                  border={"1px solid black"}
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
                  onClick={() => setTimeFilter(TimeFilter.LastMonth)}
                  bg={timeFilter === TimeFilter.LastMonth ? "#70f63bd6" : "#3bc8f6d6"}
                >
                  Last Month
                </Button>
                <Button
                  h={"40px"}
                  w={"100px"}
                  disabled
                  fontSize={"lg"}
                  color={textColor}
                  border={"1px solid black"}
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
          <AssignmentCard assignments={visibleAssignments} />
        </Box>
      </SimpleGrid>
    </Box>
  );
};