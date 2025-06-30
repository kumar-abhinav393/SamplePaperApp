import { Stack, Flex, Tag, Text } from "@chakra-ui/react"

interface RightSidebarProps {
        isHorizontal?: boolean
    }

export const RightSidebar = ({isHorizontal = false} : RightSidebarProps) => {
    return (
        <>
            <Stack
                direction={isHorizontal ? "row" : "column"}
                gap={ isHorizontal ? 8 : 20}
                justifyContent={isHorizontal ? "space-around" : "center"}
                align="center"
                w="100%"
            >
                <Flex
                    gap={3}
                    flexDirection="column"
                    alignItems="center"
                >
                    <Text
                        color={"#3b82f6d6"}
                        fontWeight="medium"
                        fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                    >
                        Total Subjects
                    </Text>
                    <Tag.Root>
                        <Tag.Label colorScheme="blue" fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>5</Tag.Label>
                    </Tag.Root>
                </Flex>
                <Flex
                    gap={3}
                    flexDirection="column"
                    alignItems="center"
                >
                    <Text
                        color={"#3b82f6d6"}
                        fontWeight="medium"
                        fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                    >
                        Total Classes
                    </Text>
                    <Tag.Root>
                        <Tag.Label colorScheme="blue" fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>2</Tag.Label>
                    </Tag.Root>
                </Flex>
                <Flex
                    gap={3}
                    flexDirection="column"
                    alignItems="center"
                >
                    <Text
                        color={"#3b82f6d6"}
                        fontWeight="medium"
                        fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                    >
                        Status
                    </Text>
                    <Tag.Root>
                        <Tag.Label colorScheme="green" fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>active</Tag.Label>
                    </Tag.Root>
                </Flex>
            </Stack>
        </>
    )
}