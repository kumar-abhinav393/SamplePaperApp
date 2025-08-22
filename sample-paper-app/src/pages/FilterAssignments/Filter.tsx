import type { BoardProps, ClassProps, SubjectProps } from "@/types/types";
import { Select, Portal, createListCollection } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FilterProps {
  resetTrigger: number;
  boards: BoardProps[];
  classes: ClassProps[];
  subjects: SubjectProps[];
  selectedClassCode: number | null;
  onClassCodeChange: (value: number | null) => void;
}

export const Filter = ({
  classes,
  subjects,
  boards,
  resetTrigger,
  selectedClassCode,
  onClassCodeChange,
}: FilterProps) => {
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  const [selectedBoardCode, setSelectedBoardCode] = useState<string | null>(null);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string | null>(null);

  useEffect(() => {
    setSelectedBoardCode(null);
  }, [selectedClassCode]);

  useEffect(() => {
    setSelectedSubjectCode(null);
  }, [selectedBoardCode]);

  useEffect(() => {
    setSelectedPaper(null);
  }, [selectedSubjectCode]);

  useEffect(() => {
    setSelectedBoardCode(null)
    setSelectedSubjectCode(null)
    setSelectedPaper(null)
  }, [resetTrigger])

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
    items: [{ label: "Assignments", value: "assignments" }],
  });
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
        collection={paperFrameworks}
        size="md"
        deselectable
        value={selectedPaper ? [selectedPaper] : []}
        onValueChange={(details) => {
          const selectedValue = details.value[0];
          setSelectedPaper(selectedValue || null);
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
    </>
  );
};
