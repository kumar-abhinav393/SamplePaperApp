import { TimeFilter } from "@/helpers/enum";
import { createListCollection, Flex, Portal, Select } from "@chakra-ui/react";

type props = {
  value: TimeFilter;
  onChange: (v: TimeFilter) => void 
}

export const TimeFilterSelect = ({ value, onChange }: props) => {
  const filterFrameworks = createListCollection({
    items: [
      { label: "All", value: TimeFilter.All },
      { label: "This Month", value: TimeFilter.ThisMonth },
      { label: "Last Month", value: TimeFilter.LastMonth },
      { label: "Upcoming", value: TimeFilter.Upcoming },
    ],
  });
  return (
    <Flex display={{ base: "block", lg: "none" }} w={"50%"}>
      <Select.Root
        collection={filterFrameworks}
        size={["xs", "xs", "md"]}
        deselectable
        value={value ? [value] : []}
        onValueChange={(details) => {
          const selectedValue = details.value[0];
          onChange(selectedValue as TimeFilter ?? TimeFilter.All);
        }}
      >
        <Select.HiddenSelect />
        <Select.Control border={"1px solid #444746"} borderRadius={4}>
          <Select.Trigger _focus={{ borderColor: "#3bc8f6d6" }}>
            <Select.ValueText
              placeholder="Select Filter"
              fontSize={["sm", "sm", "xl"]}
            />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {filterFrameworks.items.map((framework) => (
                <Select.Item
                  item={framework}
                  key={framework.value}
                  fontSize={["sm", "sm", "xl"]}
                >
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Flex>
  );
};
