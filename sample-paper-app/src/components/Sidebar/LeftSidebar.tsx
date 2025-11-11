import { Stack, Flex, Tag, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { useUserRole } from "@/hooks/useUserRole";
import { UserRole } from "@/helpers/enum";

interface LeftSidebarProps {
  isHorizontal?: boolean;
  status: "active" | "inactive";
  totalClasses: number;
  totalBoards: number;
}

export const LeftSidebar = ({ isHorizontal = false, status, totalClasses, totalBoards }: LeftSidebarProps) => {

  const { role } = useUserRole();
  const textColor = useColorModeValue("#3bc8f6d6", undefined);

  return (
    <>
      <Stack
        display={"flex"}
        direction={isHorizontal ? "row" : "column"}
        gap={isHorizontal ? 8 : 20}
        justifyContent={isHorizontal ? "space-around" : "center"}
        align="center"
        w="100%"
      >
        {role?.role === UserRole.STUDENT && (
          <>
            <Flex
              gap={3}
              flexDirection="column"
              alignItems="center"
            >
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                Status
              </Text>
              <Tag.Root border={"1px solid black"} colorPalette={status === "active" ? "green" : "red"}>
                <Tag.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>{status}</Tag.Label>
              </Tag.Root>
            </Flex>
            <Flex
              gap={3}
              flexDirection="column"
              alignItems="center"
            >
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                Total Classes
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>{totalClasses}</Tag.Label>
              </Tag.Root>
            </Flex>
            <Flex
              gap={3}
              flexDirection="column"
              alignItems="center"
            >
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                Total Boards
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label colorScheme="blue" fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>{totalBoards}</Tag.Label>
              </Tag.Root>
            </Flex>
          </>
        )}
        {role?.role === UserRole.FACULTY && (
          <>
            <Flex
              gap={3}
              flexDirection="column"
              alignItems="center"
            >
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                Status
              </Text>
              <Tag.Root border={"1px solid black"} colorPalette={status === "active" ? "green" : "red"}>
                <Tag.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>{status}</Tag.Label>
              </Tag.Root>
            </Flex>
            <Flex
              gap={3}
              flexDirection="column"
              alignItems="center"
            >
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                My Classes
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>{0}</Tag.Label>
              </Tag.Root>
            </Flex>
            <Flex
              gap={3}
              flexDirection="column"
              alignItems="center"
            >
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                My Subjects
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label colorScheme="blue" fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>{0}</Tag.Label>
              </Tag.Root>
            </Flex>
          </>
        )}
      </Stack>
    </>
  )
}