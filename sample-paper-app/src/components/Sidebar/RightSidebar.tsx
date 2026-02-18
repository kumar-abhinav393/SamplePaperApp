import { Stack, Flex, Tag, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { UserRole } from "@/helpers/enum";
import type { BoardProps, FacultyProfileProps } from "@/types/types";

interface RightSidebarProps {
  boards: BoardProps[];
  isHorizontal?: boolean;
  role: UserRole | undefined;
  profile: FacultyProfileProps | null;
  faculties?: {id: string; props: FacultyProfileProps}[];
}

export const RightSidebar = ({ isHorizontal = false, role, profile, boards, faculties = [] }: RightSidebarProps) => {

  const textColor = useColorModeValue("#3bc8f6d6", undefined);
  const uCount =  faculties.reduce((sum, f) => sum + (f.props.uploadCount ?? 0), 0);

  return (
    <>
      <Stack
        direction={isHorizontal ? "row" : "column"}
        gap={isHorizontal ? 8 : 20}
        justifyContent={isHorizontal ? "space-around" : "center"}
        align="center"
        w="100%"
      >
        {role === UserRole.STUDENT && (
          <>
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
                  {0}
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
                  {0}
                </Tag.Label>
              </Tag.Root>
            </Flex>
          </>
        )}
        {role === UserRole.FACULTY && (
          <>
            <Flex gap={3} flexDirection="column" alignItems="center">
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                My Boards
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label
                  colorScheme="blue"
                  fontSize={"l"}
                >
                  {profile?.assignedBoard?.join(" | ")}
                </Tag.Label>
              </Tag.Root>
            </Flex>
            <Flex gap={3} flexDirection="column" alignItems="center">
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                My Profile
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label
                  colorScheme="blue"
                  fontSize={"l"}
                >
                  
                </Tag.Label>
              </Tag.Root>
            </Flex>
            <Flex gap={3} flexDirection="column" alignItems="center">
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                My Uploads
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label
                  colorScheme="green"
                  fontSize={"l"}
                >
                  {profile?.uploadCount ?? 0}
                </Tag.Label>
              </Tag.Root>
            </Flex>
          </>
        )}
        {role === UserRole.ADMIN && (
          <>
            <Flex gap={3} flexDirection="column" alignItems="center">
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                Total Boards
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label
                  colorScheme="blue"
                  fontSize={"l"}
                >
                  {boards.map(b => b.props.code).join(' | ')}
                </Tag.Label>
              </Tag.Root>
            </Flex>
            <Flex gap={3} flexDirection="column" alignItems="center">
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                Total Uploads
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label
                  colorScheme="blue"
                  fontSize={"l"}
                >
                  {uCount}
                </Tag.Label>
              </Tag.Root>
            </Flex>
            <Flex gap={3} flexDirection="column" alignItems="center">
              <Text
                color={"#3bc8f6d6"}
                fontWeight="medium"
                fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
              >
                Total Downloads
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label
                  colorScheme="green"
                  fontSize={"l"}
                >
                  {0}
                </Tag.Label>
              </Tag.Root>
            </Flex>
          </>
        )}
      </Stack>
    </>
  );
};
