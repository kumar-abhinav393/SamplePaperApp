import { Select, Portal, createListCollection } from "@chakra-ui/react"

export const Filter = () => {
    const classFrameworks = createListCollection({
        items: [
            { label: "Class 10", value: "class10" },
            { label: "Class 12", value: "class12" },
        ],
    })
    const subjectFrameworks = createListCollection({
        items: [
            { label: "Maths", value: "maths" },
            { label: "Physics", value: "physics" },
            { label: "English", value: "english" },
            { label: "SST", value: "sst" },
        ],
    })
    const boardFrameworks = createListCollection({
        items: [
            { label: "CBSE", value: "cbse" },
        ],
    })
    const paperFrameworks = createListCollection({
        items: [
            { label: "Assignments", value: "assignments" },
        ],
    })
    return (
        <>
            <Select.Root
                collection={classFrameworks}
                size="md"
                deselectable>
                <Select.HiddenSelect />
                <Select.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>Class</Select.Label>
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
                collection={subjectFrameworks}
                size="md"
                deselectable>
                <Select.HiddenSelect />
                <Select.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>Subject</Select.Label>
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
                collection={boardFrameworks}
                size="md"
                deselectable>
                <Select.HiddenSelect />
                <Select.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>Board</Select.Label>
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
                collection={paperFrameworks}
                size="md"
                deselectable>
                <Select.HiddenSelect />
                <Select.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>Paper</Select.Label>
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
    )
}