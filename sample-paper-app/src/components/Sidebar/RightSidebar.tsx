import { Stack, Flex, Tag, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

interface RightSidebarProps {
  isHorizontal?: boolean;
  totalSubjects: number;
}

export const RightSidebar = ({
  isHorizontal = false,
  totalSubjects,
}: RightSidebarProps) => {
  const textColor = useColorModeValue("#3bc8f6d6", undefined);

  return (
    <>
      <Stack
        direction={isHorizontal ? "row" : "column"}
        gap={isHorizontal ? 8 : 20}
        justifyContent={isHorizontal ? "space-around" : "center"}
        align="center"
        w="100%"
      >
        <Flex gap={3} flexDirection="column" alignItems="center">
          <Text
            color={"#3bc8f6d6"}
            fontWeight="medium"
            fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
          >
            Total Subjects
          </Text>
          <Tag.Root bg={textColor} border={"1px solid black"}>
            <Tag.Label
              colorScheme="blue"
              fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
            >
              {totalSubjects}
            </Tag.Label>
          </Tag.Root>
        </Flex>
        <Flex gap={3} flexDirection="column" alignItems="center">
          <Text
            color={"#3bc8f6d6"}
            fontWeight="medium"
            fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
          >
            My Downloads
          </Text>
          <Tag.Root bg={textColor} border={"1px solid black"}>
            <Tag.Label
              colorScheme="blue"
              fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
            >
              0
            </Tag.Label>
          </Tag.Root>
        </Flex>
        <Flex gap={3} flexDirection="column" alignItems="center">
          <Text
            color={"#3bc8f6d6"}
            fontWeight="medium"
            fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
          >
            My Notifications
          </Text>
          <Tag.Root bg={textColor} border={"1px solid black"}>
            <Tag.Label
              colorScheme="green"
              fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
            >
              0
            </Tag.Label>
          </Tag.Root>
        </Flex>
      </Stack>
    </>
  );
};
