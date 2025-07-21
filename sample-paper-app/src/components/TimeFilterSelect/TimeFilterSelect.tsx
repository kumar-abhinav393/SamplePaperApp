import { createListCollection, Flex, Portal, Select } from "@chakra-ui/react";

export const TimeFilterSelect = () => {
  const filterFrameworks = createListCollection({
    items: [
      { label: "This Month", value: "thismonth" },
      { label: "Last Month", value: "lastmonth" },
      { label: "Upcoming", value: "upcoming" },
      { label: "All", value: "all" },
    ],
  });
  return (
    <Flex display={{ base: "block", lg: "none" }} w={"50%"}>
      <Select.Root
        collection={filterFrameworks}
        size={["xs", "xs", "md"]}
        deselectable
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
