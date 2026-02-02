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
  ButtonGroup,
} from "@chakra-ui/react";
import { MdTopic } from "react-icons/md";
import { MdPreview } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdSubject } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { type AssignmentProps } from "@/types/types";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineUpdate } from "react-icons/md";
import { formatFirestoreDate } from "@/helpers/dateFormatting";
import { useColorModeValue } from "@/components/ui/color-mode";
import { MdOutlineDescription } from "react-icons/md";
import { ColorMode, UserRole } from "@/helpers/enum";
import { useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase.config";
import { DeleteModal } from "@/components/Modals/DeleteModel";
import { UpdateModal } from "@/components/Modals/UpdateModal";
import type { DocumentData } from "firebase/firestore";
import { dialog } from "@/components/Modals/DescriptionModal";
import { toaster } from "@/components/ui/toaster";

interface AssignmenCardProps {
  assignments: AssignmentProps[];
  role: UserRole | undefined;
  deleteDocument: (documentId: string, filePath: string) => Promise<void>;
  updateDocument: (document: Partial<DocumentData>, documentId: string) => Promise<void>;
}

export const AssignmentCard = ({ assignments, role, deleteDocument, updateDocument }: AssignmenCardProps) => {
  const textColor = useColorModeValue(ColorMode.black, ColorMode.white);

  const [loadingUrl, setLoadingUrl] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<AssignmentProps | null>(null);
  const [selectedItemToUpdate, setSelectedItemToUpdate] = useState<AssignmentProps | null>(null);

  const handlePreviewClick = async (path: string) => {
    setLoadingUrl(true);
    try {
      const fileRef = ref(storage, path);
      const url = await getDownloadURL(fileRef);
      setPdfUrl(url);
    } catch (err) {
      console.error("Failed to fetch PDF: ", err);
      setPdfUrl(null);
    }
    setLoadingUrl(false);
  };

  const handleDownloadClick = async (path: string) => {
    try {
      const fileRef = ref(storage, path);
      const url = await getDownloadURL(fileRef);
      window.open(url, "_blank");
    } catch(error) {
      console.error("Error downloading PDF: ", error);
    }
  };

  return (
    <div>
      {role && assignments.map((item) => (
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
                <Dialog.Root
                  size={{ smToMd: "full", md: "lg" }}
                >
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
                          <ButtonGroup
                            mx={"auto"}
                            display={"flex"}
                            color={textColor}
                            size={["2xs", "2xs", "sm", "sm", "sm"]}
                          >
                            <Button
                              bg={"#3bc8f6d6"}
                              variant={"outline"}
                              width={["50px", "50px", "70px", "100px", "100px"]}
                              onClick={() => {
                                dialog.open("a", {
                                  title: "Edit Description",
                                  description: item.props.description,
                                }).then(async (newDescription) => {
                                  if (newDescription && newDescription !== item.props.description) {
                                    try {
                                      await updateDocument({ description: newDescription }, item.id);
                                      toaster.create({
                                        title: "description updated",
                                        type: "success",
                                        description: "Description updated successfully"
                                      });
                                    } catch (error) {
                                      toaster.create({
                                        title: "Update failed",
                                        type: "error",
                                        description: error
                                      });
                                    }
                                  }
                                }).catch(() => {
                                  // User cancelled - do nothing
                                });
                              }}
                            >
                              Edit
                            </Button>
                            <Dialog.ActionTrigger asChild>
                              <Button
                                bg={"#3bc8f6d6"}
                                variant={"outline"}
                                width={["50px", "50px", "70px", "100px", "100px"]}
                              >
                                Cancel
                              </Button>
                            </Dialog.ActionTrigger>
                            <dialog.Viewport />
                          </ButtonGroup>
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
                  <Dialog.Root
                    size={{ smToMd: "full", md: "lg" }}
                    onOpenChange={(isOpen) => {
                      if (isOpen) {
                        handlePreviewClick(item.props.filePath);
                      } else {
                        setPdfUrl(null);
                      }
                    }}
                  >
                    <Dialog.Trigger asChild>
                      <Link variant={"underline"}><MdPreview /></Link>
                    </Dialog.Trigger>
                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.Header justifyContent={"center"}>
                            {item.props.topicName}
                          </Dialog.Header>
                          <Dialog.Body>
                            {loadingUrl ? (
                              <Text>Loading PDF...</Text>
                            ) : pdfUrl ? (
                              <iframe
                                src={pdfUrl}
                                width={"100%"}
                                height={"500px"}
                                style={{ border: "none" }}
                                title="Assignment PDF Preview"
                              />
                            ) : (
                              <Text>PDF not available</Text>
                            )}
                          </Dialog.Body>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>
                  {role === UserRole.STUDENT && (
                    <>
                      <MdOutlineFileDownload
                        cursor={"pointer"}
                        onClick={() => handleDownloadClick(item.props.filePath)}
                      />
                    </>
                  )}
                  {role === UserRole.FACULTY && (
                    <>
                      <CiEdit
                        cursor={"pointer"}
                        onClick={() => {
                          setSelectedItemToUpdate(item);
                          setIsUpdateModalOpen(true);
                        }}
                      />
                      <MdOutlineDeleteOutline
                        cursor={"pointer"}
                        onClick={() => {
                          setSelectedItemToDelete(item);
                          setIsDeleteModalOpen(true);
                        }}
                      />
                    </>
                  )}
                </Flex>
              </Heading>
            </Box>
          </SimpleGrid>
        </Card.Root>
      ))}
      {isDeleteModalOpen && selectedItemToDelete && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedItemToDelete(null);
          }}
          content={selectedItemToDelete}
          deleteDocument={deleteDocument}
        />
      )}
      {isUpdateModalOpen && selectedItemToUpdate && (
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedItemToUpdate(null);
          }}
          content={selectedItemToUpdate}
          updateDocument={updateDocument}
        />
      )}
    </div>
  );
};