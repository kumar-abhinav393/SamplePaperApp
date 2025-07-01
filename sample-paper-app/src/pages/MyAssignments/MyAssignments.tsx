import { Box, Button, Grid, GridItem, Input, SimpleGrid } from "@chakra-ui/react"
import { TfiSearch } from "react-icons/tfi";

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
              colEnd={23}
              colStart={2}
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
              colSpan={2}
              colEnd={24}
              colStart={23}
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
              >
                <TfiSearch />
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </SimpleGrid>
    </Box>
  )
}