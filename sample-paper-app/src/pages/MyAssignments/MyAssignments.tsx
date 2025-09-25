import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { TfiSearch } from "react-icons/tfi";
import { FaSortNumericDown } from "react-icons/fa";
import { FaSortNumericUp } from "react-icons/fa";
import { TimeFilterSelect } from "@/components/TimeFilterSelect/TimeFilterSelect";
import { useState } from "react";
import { AssignmentCard } from "@/pages/MyAssignments/AssignmentCard";
import { useColorModeValue } from "@/components/ui/color-mode";

export const MyAssignments = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const textColor = useColorModeValue("black", "white");

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
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
                  bg={"#3bc8f6d6"}
                  border={"1px solid black"}
                >
                  This Month
                </Button>
                <Button
                  h={"40px"}
                  w={"100px"}
                  fontSize={"lg"}
                  color={textColor}
                  bg={"#3bc8f6d6"}
                  border={"1px solid black"}
                >
                  Last Month
                </Button>
                <Button
                  h={"40px"}
                  w={"100px"}
                  fontSize={"lg"}
                  color={textColor}
                  bg={"#3bc8f6d6"}
                  border={"1px solid black"}
                >
                  Upcoming
                </Button>
                <Button
                  h={"40px"}
                  w={"100px"}
                  fontSize={"lg"}
                  color={textColor}
                  bg={"#3bc8f6d6"}
                  border={"1px solid black"}
                >
                  All
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
                {sortOrder === "desc" ? (
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
          <AssignmentCard />
        </Box>
      </SimpleGrid>
    </Box>
  );
};