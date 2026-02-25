import { useState } from "react";
import DatePicker from "react-datepicker";
import { MdFilterListAlt } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import { useColorModeValue } from "../ui/color-mode";
import { ColorMode, TimeFilter } from "@/helpers/enum";
import type { FacultyProfileProps } from "@/types/types";
import "@/global/styles/customReactDatePickerStyles.css";
import { Button, createListCollection, Flex, Select } from "@chakra-ui/react";

interface FacultyFilterSelectProps {
  faculties?: { id: string; props: FacultyProfileProps }[];
}

export const FacultyFilterSelect = ({
  faculties,
}: FacultyFilterSelectProps) => {

  const isDisabled = false;
  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const textColor = useColorModeValue(ColorMode.black, ColorMode.white);

  const FacultyFrameworks = createListCollection({
    items:
      faculties?.map((faculty) => ({
        label: faculty.props.displayName,
        value: faculty.id,
      })) ?? [],
  });

  const FilterFrameworks = createListCollection({
    items: [
      { label: "Recent", value: TimeFilter.Recent },
      { label: "This Month", value: TimeFilter.ThisMonth },
      { label: "Last Month", value: TimeFilter.LastMonth },
      { label: "All", value: TimeFilter.All },
    ],
  });

  return (
    <Flex gap={2} display={"flex"} w={"60%"} h={"95%"} alignItems={"center"}>
      <Flex gap={2} w={"120%"} h={"95%"}>
        <Select.Root
          deselectable
          size={["xs", "xs", "md"]}
          collection={FacultyFrameworks}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Filter Faculty" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {FacultyFrameworks.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>

        <Select.Root
          deselectable
          size={["xs", "xs", "md"]}
          collection={FilterFrameworks}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Filter Time" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {FilterFrameworks.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </Flex>

      <Flex gap={2} w={"110%"} h={"100%"} justifyContent={"center"}>
        <Flex h={"107%"}>
          <DatePicker
          selected={fromDate}
          disabled={isDisabled}
          placeholderText="Date from"
          calendarClassName="react-datepicker"
          wrapperClassName="react-datepicker-wrapper"
          onChange={(value: Date | null) => setFromDate(value)}
          className={isDisabled ? "datepicker-disabled" : "datepicker-active"}
        />
        </Flex>

        <Flex h={"107%"}>
          <DatePicker
          selected={toDate}
          disabled={isDisabled}
          placeholderText="Date To"
          calendarClassName="react-datepicker"
          wrapperClassName="react-datepicker-wrapper"
          onChange={(value: Date | null) => setToDate(value)}
          className={isDisabled ? "datepicker-disabled" : "datepicker-active"}
        />
        </Flex>
      </Flex>

      <Button
        h={"100%"}
        color={textColor}
        bg={"#3bc8f6d6"}
        border={"1px solid black"}
        w={["25px", "25px", "35px", "40px", "40px"]}
      >
        <MdFilterListAlt />
      </Button>
    </Flex>
  );
};
