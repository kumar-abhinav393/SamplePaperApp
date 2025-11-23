import { createFacultyProfileDocument } from "@/helpers/createFacultyProfileDocument";
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

<<<<<<< HEAD
  const [assignedClass, setAssignedClass] = useState<string[]>([]);
  const [assignedBoard, setAssignedBoard] = useState<string[]>([]);
  const [assignedSubject, setAssignedSubject] = useState<string[]>([]);
=======
  const [assignedClass, setAssignedClass] = useState("");
  const [assignedBoard, setAssignedBoard] = useState("");
  const [assignedSubject, setAssignedSubject] = useState("");
>>>>>>> 1432c82773dc08086c1357ddd42048ef9778b23c

  const handleSubmit = async () => {
    try {
      await createFacultyProfileDocument({
        displayName: user.displayName,
        email: user.email,
        assignedClass,
        assignedBoard,
        assignedSubject
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

                  <Field.Root>
                    <Field.Label>ASSIGNED CLASS</Field.Label>
                    <InputGroup>
                      <Input
                        variant={"outline"}
                        value={assignedClass}
                        placeholder="10 or 12"
                        css={{ "--focus-color": "#3bc8f6d6" }}
<<<<<<< HEAD
                        onChange={(e) => {setAssignedClass(e.target.value.split(",").map(c => c.trim()))}}
=======
                        onChange={(e) => setAssignedClass(e.target.value)}
>>>>>>> 1432c82773dc08086c1357ddd42048ef9778b23c
                      />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>ASSIGNED SUBJECT</Field.Label>
                    <InputGroup>
                      <Input
                        variant={"outline"}
                        value={assignedSubject}
                        placeholder="Physics/English/Maths/SST"
                        css={{ "--focus-color": "#3bc8f6d6" }}
<<<<<<< HEAD
                        onChange={(e) => {
                          const value = e.target.value.toLocaleUpperCase();
                          setAssignedSubject(value.split(",").map(c => c.trim()))}}
=======
                        onChange={(e) => setAssignedSubject(e.target.value.toLocaleUpperCase())}
>>>>>>> 1432c82773dc08086c1357ddd42048ef9778b23c
                      />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>ASSIGNED BOARD</Field.Label>
                    <InputGroup>
                      <Input
                        variant={"outline"}
                        value={assignedBoard}
                        placeholder="CBSE/ICSE"
                        css={{ "--focus-color": "#3bc8f6d6" }}
<<<<<<< HEAD
                        onChange={(e) => {
                          const value = e.target.value.toLocaleUpperCase();
                          setAssignedBoard(value.split(",").map(c => c.trim()))}}
=======
                        onChange={(e) => setAssignedBoard(e.target.value.toLocaleUpperCase())}
>>>>>>> 1432c82773dc08086c1357ddd42048ef9778b23c
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
              border={"1px solid black"}
              fontSize={["xl", "xl", "1xl", "1xl", "1xl"]}
              w={["310px", "350px", "450px", "450px", "450px"]}
              disabled={!assignedBoard || !assignedClass || !assignedSubject}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
