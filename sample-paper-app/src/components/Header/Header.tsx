import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react"
import { ColorModeButton } from "../ui/color-mode"
import { Logout } from "./Logout";
import { useAuthContext } from "@/hooks/useAuthContext";


export const Header = () => {

  const { user } = useAuthContext();

  return (
    <Box id="header"
      mx={"auto"}
      maxW={"1200px"}
      w={["100vw", "100vw", "100vw", "95vw", "90vw"]}
    >
      <Grid
        bg={"#141218"}
        borderX={"1px solid #444746"}
        templateColumns={"repeat(24, 1fr)"}
        borderBottom={"1px solid #444746"}
        h={["45px", "45px", "60px", "60px", "70px"]}
      >
        <GridItem
          p={1}
          display={"flex"}
          alignItems={"center"}
          colStart={[1, 1, 2, 2, 2]}
          colEnd={[20, 20, 14 ,12 ,12]}
          borderRight={"1px solid #444746"}
        >
          <Flex
            alignItems={"center"}
            h={["37px", "37px", "50px", "50px", "60px"]}
          >
            <Text 
              fontSize={["xl", "2xl", "2xl", "3xl", "3xl"]}
            >
              GYAAN LOGO & NAME
            </Text>
          </Flex>
        </GridItem>
        <GridItem
          p={1}
          gap={[0, 0, 0, 3, 3]}
          colStart={[20, 23, 23, 23, 23]}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          colEnd={[25, 25, 24, 24, 24]}
        >
          <ColorModeButton />
          {user && (
            <Logout />
          )}
        </GridItem>
      </Grid>
      <Grid
        bg={"#141218"}
        roundedBottom={"lg"}
        borderX={"1px solid #444746"}
        templateColumns={"repeat(24, 1fr)"}
        borderBottom={"1px solid #444746"}
        h={["45px", "45px", "60px", "60px", "70px"]}
      >
        <GridItem
          colEnd={13}
          display={"flex"}
          paddingLeft={1}
          overflow={"hidden"}
          flexDirection={"column"}
          colStart={[1, 1, 2, 2, 2]}
          borderRight={"1px solid #444746"}
          fontSize={["15px", "15px", "18px", "18px", "20px"]}
        >
          <Text 
            mt={[0, 0, 0, 1, 1]}
            fontWeight={"bold"}
          >
            Gyaan Haridwar
          </Text>
          <Text>Sample Paper App</Text>
        </GridItem>
      </Grid>
    </Box>
  )
}