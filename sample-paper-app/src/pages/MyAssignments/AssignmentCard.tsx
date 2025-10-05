import {
  Card,
  SimpleGrid,
  Box,
  Text,
  Flex,
  Heading,
  Dialog,
  Link,
  Portal,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { MdTopic } from "react-icons/md";
import { MdPreview } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdSubject } from "react-icons/md";
import type { AssignmentProps } from "@/types/types";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineUpdate } from "react-icons/md";
import { formatFirestoreDate } from "@/helpers/dateFormatting";
import { MdOutlineUpdateDisabled } from "react-icons/md";
import { useColorModeValue } from "@/components/ui/color-mode";
import { MdOutlineDescription } from "react-icons/md";


interface AssignmenCardProps {
  assignments: AssignmentProps[];
}

export const AssignmentCard = ({ assignments }: AssignmenCardProps) => {
  const textColor = useColorModeValue("black", "white");
  return (
    <div>
      {assignments.map((item) => (
        <Card.Root key={item.id} size="lg" m={2} border={"1px solid black"} bg={{ base: "#f5f5f5ff", _dark: "#141218" }}>
          <SimpleGrid
            gap={3}
            alignItems="start"
            gridTemplateColumns={{
              base: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)",
              sm: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr)",
              md: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr)",
              lg: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr)",
            }}
          >
            <Box
              m={1}
              minW={0}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
            >
              <Heading
                gap={2}
                display={"flex"}
                color={"#3bc8f6d6"}
                flexDirection={"row"}
                alignItems={"center"}
                fontSize={["13px", "13px", "18px", "18px", "20px"]}
              >
                <MdTopic />
                <Text
                  color={textColor}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  title={item.props.topicName}
                >
                  {item.props.topicName}
                </Text>
              </Heading>
              <Flex
                gap={2}
                color={"#3bc8f6d6"}
                alignItems={"center"}
                flexDirection={"row"}
                fontSize={["12px", "12px", "18px", "18px", "20px"]}
              >
                <MdSubject />
                <Text
                  color={textColor}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  title={String(item.props.subjectCode)}
                >
                  {item.props.subjectCode}
                </Text>
              </Flex>
              <Flex
                gap={2}
                color={"#3bc8f6d6"}
                alignItems={"center"}
                flexDirection={"row"}
                fontSize={["12px", "12px", "18px", "18px", "20px"]}
              >
                <GiTeacher />
                <Text
                  color={textColor}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  title={item.props.createdBy}
                >
                  {item.props.createdBy}
                </Text>
              </Flex>
              <Flex
                gap={2}
                color={"#3bc8f6d6"}
                alignItems={"center"}
                flexDirection={"row"}
                fontSize={["12px", "12px", "18px", "18px", "20px"]}
              >
                <MdOutlineUpdate />
                <Text color={textColor} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                  {formatFirestoreDate(item.props.createdAt, "PP")}
                </Text>
              </Flex>
              <Flex
                gap={2}
                color={"#3bc8f6d6"}
                alignItems={"center"}
                flexDirection={"row"}
                fontSize={["12px", "12px", "18px", "18px", "20px"]}
              >
                <MdOutlineUpdateDisabled />
                <Text color={textColor} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                  {formatFirestoreDate(item.props.submittedAt, "PP")}
                </Text>
              </Flex>
            </Box>
            <Box
              m={1}
              minW={0}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Heading
                mt={"1"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
                fontSize={["20px", "20px", "20px", "20px", "20px"]}
              >
                <Dialog.Root size={{ smToMd: "full", md: "lg" }}>
                  <Dialog.Trigger asChild>
                    <Link variant={"underline"}><MdOutlineDescription /></Link>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title mx={"auto"}>Short Description</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          <Text textAlign={"justify"} whiteSpace={"pre-wrap"}>
                            {item.props.description}
                          </Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button mx={"auto"} color={textColor} bg={"#3bc8f6d6"} variant={"outline"}>Cancel</Button>
                          </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                          <CloseButton size={"sm"} />
                        </Dialog.CloseTrigger>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>
              </Heading>
            </Box>
            <Box
              m={1}
              minW={0}
              display={"flex"}
              alignItems={"flex-start"}
              justifyContent={"flex-end"}
              fontSize={["12px", "12px", "18px", "18px", "20px"]}
            >
              <Heading color={textColor}>
                <Flex mt={1} gap={1}>
                  <MdPreview />
                  <MdOutlineFileDownload />
                </Flex>
              </Heading>
            </Box>
          </SimpleGrid>
        </Card.Root>
      ))}
    </div>
  );
};