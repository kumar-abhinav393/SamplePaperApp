import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react"

export const Navigation = () => {
    return (
        <Box id="navigation"
            mx={"auto"}
            maxW={"1200px"}
            w={["100vw", "100vw", "100vw", "95vw", "90vw"]}
        >
            <Grid
                bg={"#141218"}
                roundedBottom={"lg"}
                roundedTop={"lg"}
                borderX={"1px solid #444746"}
                templateColumns={"repeat(24, 1fr)"}
                borderBottom={"1px solid #444746"}
                h={["45px", "45px", "60px", "60px", "70px"]}
            >
                <GridItem
                    colEnd={12}
                    colStart={[1, 1, 2, 2, 2]}
                    display={"flex"}
                    overflow={"hidden"}
                    justifyContent={"center"}
                >
                    <Flex
                        alignItems={"center"}
                        fontSize={["l", "l", "xl", "1xl", "1xl"]}
                    >
                        <Text
                            cursor={"pointer"}
                            fontWeight={"bold"}
                            _hover={{color: "#3b82f6d6"}}
                        >Filter Assignments</Text>
                    </Flex>
                </GridItem>
                <GridItem
                    colStart={12}
                    colEnd={14}
                    display={"flex"}
                    justifyContent={"center"}
                >
                    <Flex border={"1px solid #444746"} alignItems={"center"}>
                        <Text>LOGO</Text>
                    </Flex>

                </GridItem>
                <GridItem
                    colStart={14}
                    colEnd={[25, 25, 25, 24, 24]}
                    display={"flex"}
                    overflow={"hidden"}
                    justifyContent={"center"}
                >
                    <Flex
                        alignItems={"center"}
                        fontSize={["l", "l", "xl", "1xl", "1xl"]}
                    >
                        <Text
                            cursor={"pointer"}
                            fontWeight={"bold"}
                            _hover={{color: "#3b82f6d6"}}
                        >
                            My Assignments
                        </Text>
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    )
}