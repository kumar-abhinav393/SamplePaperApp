import { GyaanLogo } from "@/assets/gyaan-logo"
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
                        fontSize={["12px", "12px", "15px", "18px", "20px"]}
                    >
                        <Text
                            cursor={"pointer"}
                            _hover={{color: "#3b82f6d6"}}
                        >Filter Assignments</Text>
                    </Flex>
                </GridItem>
                <GridItem
                    colStart={12}
                    colEnd={14}
                    display={"flex"}
                    position={"relative"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Box
                        position="absolute"
                        left={["47%","47%","49%","49%","49%"]}
                        top={0}
                        bottom={[8,8,12,12,14]}
                        borderLeft="1px solid #444746"
                        pointerEvents="none"
                    />
                    <Box
                        position="absolute"
                        left={["47%","47%","49%","49%","49%"]}
                        top={[8,8,12,12,14]}
                        bottom={0}
                        borderLeft="1px solid #444746"
                        pointerEvents="none"
                    />
                    <Flex alignItems={"center"} justifyContent={"center"} h={["20px", "20px", "30px", "30px", "40px"]}>
                        <Box h={["20px", "20px", "30px", "30px", "40px"]}>
                            <GyaanLogo height="100%" />
                        </Box>
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
                        fontSize={["12px", "12px", "15px", "18px", "20px"]}
                    >
                        <Text
                            cursor={"pointer"}
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