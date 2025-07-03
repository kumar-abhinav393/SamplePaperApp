import { Box, Button, Flex, Grid, GridItem, Input, SimpleGrid, Text } from "@chakra-ui/react"
import { TfiSearch } from "react-icons/tfi";
import { FaSortNumericDown } from "react-icons/fa";
import { FaSortNumericUp } from "react-icons/fa";
import { TimeFilterSelect } from "@/components/TimeFilterSelect/TimeFilterSelect";

export const MyAssignments = () => {
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
              colEnd={[24, 24, 23, 23, 23]}
              colStart={[1, 1, 2, 2, 2]}
              display={"flex"}
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
              colStart={[25, 25, 23, 23, 23]}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
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
              colStart={[1, 1, 2, 2, 2]}
              display={"flex"}
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
              colStart={[25, 25, 23, 23, 23]}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Button
                ml={1}
                color={"white"}
                bg={"#3b82f6d6"}
                border={"1px solid #444746"}
                h={["30px", "30px", "40px", "40px", "40px"]}
                w={["25px", "25px", "35px", "40px", "40px"]}
              >
                <FaSortNumericDown />
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </SimpleGrid>
    </Box>
  )
}