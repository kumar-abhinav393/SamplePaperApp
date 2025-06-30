import { Filter } from "@/components/Filter/Filter"
import { LeftSidebar } from "@/components/Sidebar/LeftSidebar";
import { RightSidebar } from "@/components/Sidebar/RightSidebar";
import { Box, Button, Flex, SimpleGrid, Stack, useBreakpointValue } from "@chakra-ui/react"

export const FilterAssignments = () => {
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false })
  return (
    <Box id="filter-assignment"
      mx={"auto"}
      maxW={"1200px"}
      w={["100vw", "100vw", "100vw", "100vw", "95vw"]}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      {isTablet && (
        <Box mb={4} display={"flex"} justifyContent={"center"}>
          <LeftSidebar isHorizontal={true} />
        </Box>
      )}

      {isTablet && (
        <Box display="flex" justifyContent="center" w="100%" p={"10"} >
          <Box h="1px" bg="#444746" w="99%" borderRadius="1px" />
        </Box>
      )}
      
      <SimpleGrid
        w={"100%"}
        columns={{ base: 1, md: isTablet ? 1 : 5, lg: 5 }}
        alignItems={"stretch"}
        gridTemplateColumns={{
          base: "1fr",
          md: isTablet ? "1fr" : "180px 24px 1fr 24px 180px",
          lg: "220px 24px 2.5fr 24px 220px"
        }}
      >
        <Box
          display={{ base: "none", md: isTablet ? "none" : "flex", lg: "flex" }}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
          as={"aside"}
        >
          <LeftSidebar />
        </Box>
        <Box
          display={{ base: "none", md: isTablet ? "none" : "flex", lg: "flex" }}
          alignItems={"stretch"}
          justifyContent={"center"}
        >
          <Box w={"1px"} bg={"#444746"} h={"100%"} />
        </Box>
        <Box
          as={"form"}
          w={"100%"}
          maxW={["100%", "100%", "100%"]}
          mx={"auto"}
          borderRadius={"lg"}
          p={[4, 6, 8]}
        >
          <Stack gap={4}>
            <Filter />
            <Flex
              w={"100%"}
              mt={4}
              justifyContent={"space-between"}
            >
              <Button
                color={"white"}
                bg={"#3b82f6d6"}
                fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
              >
                Clear All
              </Button>
              <Button
                disabled
                color={"white"}
                bg={"#3b82f6d6"}
                fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
              >
                Filter Paper
              </Button>
            </Flex>
          </Stack>
        </Box>
        <Box
          display={{ base: "none", md: isTablet ? "none" : "flex", lg: "flex" }}
          alignItems={"stretch"}
          justifyContent={"center"}
        >
          <Box w={"1px"} bg={"#444746"} h={"100%"} />
        </Box>
        <Box
          display={{ base: "none", md: isTablet ? "none" : "flex", lg: "flex" }}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
          as={"aside"}
        >
          <RightSidebar isHorizontal={false} />
        </Box>
      </SimpleGrid>
      {isTablet && (
        <Box display="flex" justifyContent="center" w="100%" p={"10"} >
          <Box h="1px" bg="#444746" w="99%" borderRadius="1px" />
        </Box>
      )}

      {isTablet && (
        <Box mt={4} display="flex" justifyContent="center" w="100%">
          <RightSidebar isHorizontal={true} />
        </Box>
      )}
    </Box>
  )
}