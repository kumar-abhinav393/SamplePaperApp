import type {
  AssignmentProps,
  BoardProps,
  ClassProps,
  PaperCode,
  SubjectProps,
} from "@/types/types";
import {
  Select,
  Portal,
  createListCollection,
  Text,
  Grid,
  GridItem,
  Input,
  Box,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { UserRole } from "@/helpers/enum";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { dialog } from "@/components/Modals/DescriptionModal";

interface FilterProps {
  topicName: string;
  boards: BoardProps[];
  classes: ClassProps[];
  addDescription: string;
  subjects: SubjectProps[];
  role: UserRole | undefined;
  assignmentPdf: File | null;
  assignments: AssignmentProps[];
  selectedBoardCode: string | null;
  selectedClassCode: number | null;
  selectedSubjectCode: string | null;
  selectedPaperCode: PaperCode | null;
  setAssignmentPdf: (file: File | null) => void;
  paperTypes: { code: PaperCode; name: string }[];
  onClassCodeChange: (value: number | null) => void;
  setSelectedBoardCode: (value: string | null) => void;
  setSelectedSubjectCode: (value: string | null) => void;
  setSelectedPaperCode: (value: PaperCode | null) => void;
  setTopicName: React.Dispatch<React.SetStateAction<string>>
  setAddDescription: React.Dispatch<React.SetStateAction<string>>
}

export const Filter = ({
  role,
  boards,
  classes,
  subjects,
  topicName,
  paperTypes,
  setTopicName,
  setAssignmentPdf,
  selectedPaperCode,
  selectedClassCode,
  selectedBoardCode,
  onClassCodeChange,
  setAddDescription,
  selectedSubjectCode,
  setSelectedPaperCode,
  setSelectedBoardCode,
  setSelectedSubjectCode,
}: FilterProps) => {
  useEffect(() => {
    setSelectedBoardCode(null);
  }, [selectedClassCode, setSelectedBoardCode]);

  useEffect(() => {
    setSelectedSubjectCode(null);
  }, [selectedBoardCode, setSelectedSubjectCode]);

  useEffect(() => {
    setSelectedPaperCode(null);
  }, [selectedSubjectCode, setSelectedPaperCode]);

  const classFrameworks = createListCollection({
    items: classes.map((c) => ({
      label: c.props.name,
      value: String(c.props.code),
    })),
  });
  const subjectFrameworks = createListCollection({
    items: subjects.map((s) => ({
      label: s.props.name,
      value: s.props.code,
    })),
  });
  const boardFrameworks = createListCollection({
    items: boards.map((b) => ({
      label: b.props.shortName,
      value: b.props.code,
    })),
  });
  const paperFrameworks = createListCollection({
    items: paperTypes.map((p) => ({
      label: p.name,
      value: p.code,
    })),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Select.Root
        collection={classFrameworks}
        size="md"
        deselectable
        value={selectedClassCode != null ? [String(selectedClassCode)] : []}
        onValueChange={(details) => {
          const selectedValue = details.value[0];
          onClassCodeChange(selectedValue ? Number(selectedValue) : null);
        }}
      >
        <Select.HiddenSelect />
        <Select.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>
          Class
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText
              placeholder="Select Class"
              fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
            />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {classFrameworks.items.map((framework) => (
                <Select.Item
                  item={framework}
                  key={framework.value}
                  fontSize={["md", "md", "lg", "lg", "lg"]}
                >
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Select.Root
        collection={boardFrameworks}
        size="md"
        deselectable
        value={selectedBoardCode ? [selectedBoardCode] : []}
        onValueChange={(details) => {
          const selectedValue = details.value[0];
          setSelectedBoardCode(selectedValue || null);
        }}
        disabled={selectedClassCode == null}
      >
        <Select.HiddenSelect />
        <Select.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>
          Board
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText
              placeholder="Select Board"
              fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
            />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {boardFrameworks.items.map((framework) => (
                <Select.Item
                  item={framework}
                  key={framework.value}
                  fontSize={["md", "md", "lg", "lg", "lg"]}
                >
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Select.Root
        collection={subjectFrameworks}
        size="md"
        deselectable
        value={selectedSubjectCode ? [selectedSubjectCode] : []}
        onValueChange={(details) => {
          const selectedValue = details.value[0];
          setSelectedSubjectCode(selectedValue || null);
        }}
        disabled={selectedBoardCode == null}
      >
        <Select.HiddenSelect />
        <Select.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>
          Subject
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText
              placeholder="Select Subject"
              fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
            />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {subjectFrameworks.items.map((framework) => (
                <Select.Item
                  item={framework}
                  key={framework.value}
                  fontSize={["md", "md", "lg", "lg", "lg"]}
                >
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Select.Root
        size="md"
        deselectable
        collection={paperFrameworks}
        value={selectedPaperCode ? [selectedPaperCode] : []}
        onValueChange={(details) => {
          const selectedValue = details.value[0] as PaperCode | undefined;
          setSelectedPaperCode(selectedValue || null);
        }}
        disabled={selectedSubjectCode == null}
      >
        <Select.HiddenSelect />
        <Select.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>
          Paper
        </Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText
              placeholder="Select Paper"
              fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
            />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {paperFrameworks.items.map((framework) => (
                <Select.Item
                  item={framework}
                  key={framework.value}
                  fontSize={["md", "md", "lg", "lg", "lg"]}
                >
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      {role === UserRole.FACULTY && (
        <Grid
          gap={"4"}
          templateColumns={[
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
            "repeat(5, 1fr)",
          ]}
        >
          <GridItem colSpan={[2, 2, 2]}>
            <Input
              value={topicName}
              placeholder="Enter Topic Name"
              css={{ "--focus-color": "#3bc8f6d6" }}
              fontSize={["l", "xl", "xl", "xl", "xl"]}
              onChange={(e) => setTopicName(e.target.value)}
            />
          </GridItem>
          <GridItem
            gap={[3, 3, 0]}
            display={"flex"}
            colSpan={[1, 1, 2]}
            alignItems={"center"}
            fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
            justifyContent={["flex-end", "flex-end", "center"]}
          >
            <Flex>
              <Box
                display={["none", "none", "block"]}
                onClick={() => {
                  dialog.open("a", {
                    title: "Add Description",
                    description: "Write a short description...",
                  }).then((value) => {
                    setAddDescription(value);
                  });
                }}
              >
                <Text cursor={"pointer"} textDecoration={"underline"}>
                  Add Description
                </Text>
              </Box>
            </Flex>
            <Box
              display={["block", "block", "none"]}
              fontSize={["25px", "25px", "40px", "40px", "40px"]}
              onClick={() => {
                dialog.open("a", {
                  title: "Add Description",
                  description: "Write a short description...",

                });
              }}
            >
              <MdOutlineDescription cursor={"pointer"} />
            </Box>
            <dialog.Viewport />
            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setAssignmentPdf(file);
                }
              }}
            >
            </input>
            <Flex>
              <Box
                display={["block", "block", "none"]}
                fontSize={["25px", "25px", "40px", "40px", "40px"]}
              >
                <MdOutlineFileUpload
                  cursor={"pointer"}
                  onClick={() => fileInputRef.current?.click()}
                />
              </Box>
            </Flex>
          </GridItem>
          <GridItem
            colSpan={1}
            alignItems={"center"}
            justifyContent={"flex-end"}
            display={["none", "none", "flex"]}
            fontSize={["30px", "30px", "40px", "40px", "40px"]}
          >
            <MdOutlineFileUpload
              cursor={"pointer"}
              onClick={() => fileInputRef.current?.click()} />
          </GridItem>
        </Grid>
      )}
    </>
  );
};
