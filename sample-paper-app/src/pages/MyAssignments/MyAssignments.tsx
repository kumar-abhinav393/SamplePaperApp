import { Box, Button, Flex, Grid, GridItem, Input, SimpleGrid } from "@chakra-ui/react"
import { TfiSearch } from "react-icons/tfi";
import { FaSortNumericDown } from "react-icons/fa";
import { FaSortNumericUp } from "react-icons/fa";
import { TimeFilterSelect } from "@/components/TimeFilterSelect/TimeFilterSelect";
import { useState } from "react";
import { AssignmentCard } from "@/components/AssignmentCard/AssignmentCard";

export const MyAssignments = () => {

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  }

  return (
    <Box id="my-assignments"
      mx={"auto"}
      maxW={"1200px"}
      w={["100vw", "100vw", "100vw", "95vw", "90vw"]}
    >
      <SimpleGrid
        h={"100vh"}
        gridRowStart={3}
        templateRows={"auto auto 1fr"}
      >
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
                css={{ "--focus-color": "#3b82f6d6", "border": "1px solid #444746" }}
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
                color={"white"}
                bg={"#3b82f6d6"}
                border={"1px solid #444746"}
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
            <GridItem
              colEnd={[23]}
              display={"flex"}
              colStart={[1, 1, 2, 2, 2]}
            >
                <TimeFilterSelect />
              <Flex gap={2} display={{ base: "none", lg: "flex" }}>
                <Button h={"40px"} w={"100px"} bg={"#3b82f6d6"} color={"white"} fontSize={"lg"}>This Month</Button>
                <Button h={"40px"} w={"100px"} bg={"#3b82f6d6"} color={"white"} fontSize={"lg"}>Last Month</Button>
                <Button h={"40px"} w={"100px"} bg={"#3b82f6d6"} color={"white"} fontSize={"lg"}>Upcoming</Button>
                <Button h={"40px"} w={"100px"} bg={"#3b82f6d6"} color={"white"} fontSize={"lg"}>All</Button>
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
                color={"white"}
                bg={"#3b82f6d6"}
                onClick={handleSortToggle}
                border={"1px solid #444746"}
                h={["30px", "30px", "40px", "40px", "40px"]}
                w={["25px", "25px", "35px", "40px", "40px"]}
              >
                {sortOrder === "desc" ? <FaSortNumericUp /> : <FaSortNumericDown />}
              </Button>
            </GridItem>
          </Grid>
        </Box>
        <Box
          pb={[2, 2, 4, 4, 10]}
          mt={[5, 5, 6]}
          bg={"#141218"}
          overflowX={"auto"}
          borderRadius={"lg"}
          whiteSpace={"nowrap"}
          mx={[0, 0, 8, 10, 10]}
          border={"1px solid #444746"}
        >
          <AssignmentCard />
        </Box>
      </SimpleGrid>
    </Box>
  )
}