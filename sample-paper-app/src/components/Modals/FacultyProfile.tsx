import { createFacultyProfileDocument } from "@/helpers/createFacultyProfileDocument";
import { Boards, Subjects } from "@/helpers/enum";
import {
  Flex,
  Button,
  Fieldset,
  Field,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface FacultyProfileProps {
  user: { displayName: string; email: string };
  onClose: () => void;
}

export const FacultyProfile = ({ user, onClose }: FacultyProfileProps) => {
  const [assignedClass, setAssignedClass] = useState<string[]>([]);
  const [assignedBoard, setAssignedBoard] = useState<string[]>([]);
  const [assignedSubject, setAssignedSubject] = useState<string[]>([]);

  // Check for errors only if field has values
  const classError =
    assignedClass.length > 0 &&
    assignedClass.some((c) => c !== "" && c !== "10" && c !== "12");

  const subjectError =
    assignedSubject.length > 0 &&
    assignedSubject.some(
      (c) =>
        c !== "" &&
        c !== Subjects.PHYSICS &&
        c !== Subjects.ENGLISH &&
        c !== Subjects.MATHS &&
        c !== Subjects.SST
    );

  const boardError =
    assignedBoard.length > 0 &&
    assignedBoard.some((c) => c !== "" && c !== Boards.CBSE && c !== Boards.ICSE);

  // Check if fields have valid non-empty values
  const hasValidClass =
    assignedClass.length > 0 &&
    assignedClass.every((c) => c === "10" || c === "12");

  const hasValidSubject =
    assignedSubject.length > 0 &&
    assignedSubject.every(
      (c) =>
        c === Subjects.PHYSICS ||
        c === Subjects.ENGLISH ||
        c === Subjects.MATHS ||
        c === Subjects.SST
    );

  const hasValidBoard =
    assignedBoard.length > 0 &&
    assignedBoard.every(
      (c) =>
        c === Boards.CBSE ||
        c === Boards.ICSE);

  // Form is valid only when all fields have valid values
  const isFormValid = hasValidClass && hasValidSubject && hasValidBoard;

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
        id="login"
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

                  <Field.Root invalid={classError}>
                    <Field.Label>ASSIGNED CLASS</Field.Label>
                    <InputGroup>
                      <Input
                        inputMode="numeric"
                        variant={"outline"}
                        value={assignedClass}
                        placeholder="10 or 12"
                        css={{ "--focus-color": "#3bc8f6d6" }}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/[^0-9,\s]/g, "");
                          const classes = numericValue
                            .split(",")
                            .map((c) => c.trim());
                          setAssignedClass(classes);
                        }}
                      />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root invalid={subjectError}>
                    <Field.Label>ASSIGNED SUBJECT</Field.Label>
                    <InputGroup>
                      <Input
                        variant={"outline"}
                        value={assignedSubject}
                        placeholder="Physics/English/Maths/SST"
                        css={{ "--focus-color": "#3bc8f6d6" }}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase();
                          const stringValue = value.replace(/[^A-Z,\s]/g, "");
                          const subjects = stringValue
                            .split(",")
                            .map((c) => c.trim());
                          setAssignedSubject(subjects);
                        }}
                      />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root invalid={boardError}>
                    <Field.Label>ASSIGNED BOARD</Field.Label>
                    <InputGroup>
                      <Input
                        variant={"outline"}
                        value={assignedBoard}
                        placeholder="CBSE/ICSE"
                        css={{ "--focus-color": "#3bc8f6d6" }}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase();
                          const stringValue = value.replace(/[^A-Z,\s]/g, "");
                          const boards = stringValue
                            .split(",")
                            .map((c) => c.trim());
                          setAssignedBoard(boards);
                        }}
                      />
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
