import { Stack, Flex, Tag, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { UserRole } from "@/helpers/enum";
import type { ClassProps, FacultyProfileProps, SubjectProps } from "@/types/types";

interface LeftSidebarProps {
  classes: ClassProps[];
  isHorizontal?: boolean;
  subjects: SubjectProps[];
  role: UserRole | undefined;
  status: "active" | "inactive";
  profile: FacultyProfileProps | null;
}

export const LeftSidebar = ({ isHorizontal = false, status, role, profile, classes, subjects }: LeftSidebarProps) => {

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
        {role === UserRole.STUDENT && (
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
                Total Boards
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label colorScheme="blue" fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>{0}</Tag.Label>
              </Tag.Root>
            </Flex>
          </>
        )}
        {role === UserRole.FACULTY && profile && (
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
                <Tag.Label fontSize={["l", "l", "l", "l", "l"]}>{status}</Tag.Label>
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
                <Tag.Label fontSize={"l"}>{profile.assignedClass?.join(" | ")}</Tag.Label>
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
                <Tag.Label colorScheme="blue" fontSize={"l"}>{profile.assignedSubject?.join(" | ")}</Tag.Label>
              </Tag.Root>
            </Flex>
          </>
        )}
        {role === UserRole.ADMIN && (
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
                Total Students
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label fontSize={["l", "l", "l", "l", "l"]}>{}</Tag.Label>
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
                <Tag.Label fontSize={["l", "l", "l", "l", "l"]}>{classes.map(c => c.props.name).join(' | ')}</Tag.Label>
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
                Total Subjects
              </Text>
              <Tag.Root bg={textColor} border={"1px solid black"}>
                <Tag.Label fontSize={["l", "l", "l", "l", "l"]}>{subjects.length}</Tag.Label>
              </Tag.Root>
            </Flex>
          </>
        )}
      </Stack>
    </>
  )
}