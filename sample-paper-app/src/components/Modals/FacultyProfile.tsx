import { createFacultyProfileDocument } from "@/helpers/createFacultyProfileDocument";
import { getBoardFramework, getClassFramework, getSubjectFramework } from "@/helpers/createFrameworkCollections";
import type { BoardProps, ClassProps, SubjectProps } from "@/types/types";
import {
  Flex,
  Button,
  Fieldset,
  Field,
  Input,
  InputGroup,
  Text,
  Select,
  Portal,
} from "@chakra-ui/react";
import { useState } from "react";

interface FacultyProfileProps {
  user: { displayName: string; email: string };
  onClose: () => void;
  classes: ClassProps[];
  boards: BoardProps[];
  subjects: SubjectProps[];
}

export const FacultyProfile = ({ user, onClose, classes, boards, subjects }: FacultyProfileProps) => {
  const [assignedClass, setAssignedClass] = useState<string[]>([]);
  const [assignedBoard, setAssignedBoard] = useState<string[]>([]);
  const [assignedSubject, setAssignedSubject] = useState<string[]>([]);

  const boardFramework = getBoardFramework(boards);
  const classFramework = getClassFramework(classes);
  const subjectFramework = getSubjectFramework(subjects);

  const isFormValid = assignedClass.length > 0 && assignedBoard.length > 0 && assignedSubject.length > 0;

  const handleSubmit = async () => {
    try {
      await createFacultyProfileDocument({
        displayName: user.displayName,
        email: user.email,
        assignedClass,
        assignedBoard,
        assignedSubject,
      });
      onClose();
    } catch (error) {
      console.error("Error creating faculty profile: ", error);
    }
  };
  return (
    <>
      <Flex
        id="faculty-profile"
        mx={"auto"}
        alignItems={"center"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Flex w={"100%"} alignItems={"center"} flexDirection={"column"}>
          <Text
            fontWeight={"bold"}
            fontSize={["2xl", "2xl", "3xl", "3xl", "3xl"]}
          >
            Faculty Profile
          </Text>
          <Flex
            mt={4}
            gap={2}
            alignItems={"column"}
            flexDirection={"column"}
            w={["310px", "350px", "400px", "450px"]}
            fontSize={["l", "l", "xl", "1xl", "1xl"]}
          >
            <form>
              <Fieldset.Root>
                <Fieldset.Content>
                  <Field.Root>
                    <Field.Label>NAME</Field.Label>
                    <Input
                      type="name"
                      readOnly
                      variant={"outline"}
                      value={user.displayName}
                      css={{ "--focus-color": "#3bc8f6d6" }}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>EMAIL</Field.Label>
                    <InputGroup>
                      <Input
                        readOnly
                        value={user.email}
                        variant={"outline"}
                        css={{ "--focus-color": "#3bc8f6d6" }}
                      />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>ASSIGNED CLASS(ES)</Field.Label>
                    <InputGroup>
                      <Select.Root
                        multiple
                        collection={getClassFramework(classes)}
                        value={assignedClass}
                        onValueChange={(details) => {
                          setAssignedClass(details.value);
                        }}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText
                              placeholder="Select Class"
                              fontSize={"l"}
                            />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner>
                            <Select.Content>
                              {classFramework.items.map((framework) => (
                                <Select.Item
                                  item={framework}
                                  key={framework.value}
                                  fontSize={"l"}
                                >
                                  {framework.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </InputGroup>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>ASSIGNED BOARD(S)</Field.Label>
                    <InputGroup>
                      <Select.Root
                        multiple
                        collection={getBoardFramework(boards)}
                        value={assignedBoard}
                        onValueChange={(details) => {
                          setAssignedBoard(details.value);
                        }}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText
                              placeholder="Select Board"
                              fontSize={"l"}
                            />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner>
                            <Select.Content>
                              {boardFramework.items.map((framework) => (
                                <Select.Item
                                  item={framework}
                                  key={framework.value}
                                  fontSize={"l"}
                                >
                                  {framework.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </InputGroup>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>ASSIGNED SUBJECT(S)</Field.Label>
                    <InputGroup>
                      <Select.Root
                        multiple
                        collection={getSubjectFramework(subjects)}
                        value={assignedSubject}
                        onValueChange={(details) => {
                          setAssignedSubject(details.value);
                        }}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText
                              placeholder="Select Subject"
                              fontSize={"l"}
                            />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner>
                            <Select.Content>
                              {subjectFramework.items.map((framework) => (
                                <Select.Item
                                  item={framework}
                                  key={framework.value}
                                  fontSize={"l"}
                                >
                                  {framework.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </InputGroup>
                  </Field.Root>
                </Fieldset.Content>
              </Fieldset.Root>
            </form>
          </Flex>

          <Flex mt={3} w={"100%"} justifyContent={"space-between"}>
            <Button
              bg={"#3bc8f6d6"}
              onClick={handleSubmit}
              disabled={!isFormValid}
              border={"1px solid black"}
              fontSize={["xl", "xl", "1xl", "1xl", "1xl"]}
              w={["310px", "350px", "450px", "450px", "450px"]}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
