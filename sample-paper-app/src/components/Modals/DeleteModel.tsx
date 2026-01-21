import { Box, Button, Flex, Portal, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { useState } from "react";
import { toaster } from "../ui/toaster";
import type { AssignmentProps } from "@/types/types";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: AssignmentProps;
  deleteDocument: (documentId: string, filePath: string) => Promise<void>;
}

export const DeleteModal = ({ isOpen, onClose, content, deleteDocument }: DeleteModalProps) => {
  const textColor = useColorModeValue("black", "white");

  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleCancel = () => {
    onClose();
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteDocument(content.id, content.props.filePath);
      toaster.create({
        title: "Assignment deleted",
        type: "success",
        description: "Assignment is deleted successfully"
      });
      onClose();
    } catch (error) {
      toaster.create({
        title: "Delete failed",
        type: "error",
        description: error
      })
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Portal>
      <Box
        top={0}
        left={0}
        zIndex={9999}
        w={"100%"}
        h={"100%"}
        display={"flex"}
        position={"fixed"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          p={6}
          maxW={"400px"}
          display={"flex"}
          boxShadow={"lg"}
          borderRadius={"md"}
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"center"}
          border={"1px solid #444746"}
          bg={{ base: "#f5f5f5ff", _dark: "#141218" }}
        >
          <Text
            mb={4}
            color={textColor}
            fontWeight={"bold"}
            fontSize={["sm", "sm", "md", "lg", "lg"]}
          >
            DELETE {content.props.name}
          </Text>
          <Box display="flex" justifyContent="center" w="100%" p={"3"}>
            <Box h="1px" bg="#444746" w="100%" borderRadius="1px" />
          </Box>
          <Box
            m={4}
            gap={2}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Text color={textColor}>{content.props.topicName}</Text>
            <Text color={textColor}>{content.props.subjectCode}</Text>
            <Text color={textColor}>{content.props.createdBy}</Text>
          </Box>
          <Box display="flex" justifyContent="center" w="100%" p={"3"}>
            <Box h="1px" bg="#444746" w="99%" borderRadius="1px" />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Text
              m={4}
              color={textColor}
              fontWeight={"bold"}
              fontSize={["sm", "sm", "md", "lg", "lg"]}
            >
              Need to delete this {content.props.code}?
            </Text>
          </Box>
          <Flex
            mt={3}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Button
              color={textColor}
              bg={"#3bc8f6d6"}
              fontWeight={"bold"}
              onClick={handleCancel}
              border={"1px solid black"}
              fontSize={["sm", "sm", "md", "lg", "lg"]}
            >
              Cancel
            </Button>
            <Button
              color={textColor}
              bg={"#3bc8f6d6"}
              fontWeight={"bold"}
              onClick={handleDelete}
              border={"1px solid black"}
              fontSize={["sm", "sm", "md", "lg", "lg"]}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </Flex>
        </Box>
      </Box>
    </Portal>
  );
}
