import { Card, SimpleGrid, Box, Text, Flex, Heading, Link } from "@chakra-ui/react"
import { MdPreview } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";


const Assignments = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: "Assignment Name",
    subjectName: "Subject",
    topicName: "Topic",
    dateOfRelease: "DOR",
    facultyName: "Faculty",
    desc: "Description",
}));

export const AssignmentCard = () => {
    return (
        <div>
            {Assignments.map((item) => (
                <Card.Root key={item.id} size="lg" m={4}>
                    <SimpleGrid
                        gridTemplateColumns={{
                            base: "auto auto auto",
                            md: "auto auto auto",
                            lg: "auto auto auto"
                        }}
                    >
                        <Box
                            m={3}
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"flex-start"}
                        >
                            <Heading
                                color={"#3bc8f6d6"}
                                fontSize={["13px", "13px", "18px", "18px", "20px"]}
                            >
                                {item.title}
                            </Heading>
                            <Flex
                                flexDirection={"column"}
                                fontSize={["12px", "12px", "18px", "18px", "20px"]}
                            >
                                <Text>{item.subjectName}</Text>
                                <Text>{item.facultyName}</Text>
                                <Text>{item.dateOfRelease}</Text>
                            </Flex>
                        </Box>
                        <Box
                            mt={3}
                            display={"flex"}
                            alignItems={"center"}
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                        >
                            <Heading
                                fontSize={["13px", "13px", "18px", "18px", "20px"]}
                            >
                                <Link
                                variant={"underline"}
                                color={"#3bc8f6d6"}
                            >
                                Description
                            </Link>
                            </Heading>
                        </Box>
                        <Box
                            m={4}
                            display={"flex"}
                            alignItems={"flex-start"}
                            justifyContent={"flex-end"}
                            fontSize={["12px", "12px", "18px", "18px", "20px"]}
                        >
                            <Heading
                                color={"#3bc8f6d6"}
                            >
                                <Flex gap={1}>
                                    <MdPreview />
                                    <MdOutlineFileDownload />
                                </Flex>
                            </Heading>
                        </Box>
                    </SimpleGrid>
                </Card.Root>
            ))}
        </div>
    )
}