import { Login } from "./pages/Login/Login";
import { RouterPaths } from "./global/enum";
import { Signup } from "./pages/Signup/Signup";
import { Header } from "./components/Header/Header";
import { Provider } from "./components/ui/provider";
import { Box, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { useAuthContext } from "./hooks/useAuthContext";
import { useGoogleAnalytics } from "./hooks/useGoogleAnalytics";
import { Navigation } from "./components/Navigation/Navigation";
import { MyAssignments } from "./pages/MyAssignments/MyAssignments";
import { Authentication } from "./pages/Authentication/Authentication";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FilterAssignments } from "./pages/FilterAssignments/FilterAssignments";
import { BackgroundTheme } from "./components/BackgroundTheme/BackgroundTheme";
import { useColorModeValue } from "./components/ui/color-mode";

function AnalyticsTracker() {
  useGoogleAnalytics();
  return null;
}

function App() {
  const { user, authIsReady } = useAuthContext();
  const textColor = useColorModeValue("black", "white");

  return (
    <Provider>
      <BackgroundTheme />
      <BrowserRouter>
        <AnalyticsTracker />
        {!authIsReady && (
          <Flex w={"100vw"} h={"100dvh"} align={"center"} justify={"center"}>
            <Spinner
              size={"md"}
              color={"#3bc8f6d6"}
              colorPalette={"#3bc8f6d6"}
            />
          </Flex>
        )}
        {authIsReady && (
          <>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100vw"}
              m={"auto"}
            >
              <Grid
                minHeight={"100dvh"}
                gridTemplateRows={user ? "auto auto 1fr" : "auto 1fr"}
                w={["100vw", "100vw", "100vw", "100vw", "90vw"]}
              >
                <Header />
                {user && <Navigation />}
                <Routes>
                  <Route
                    path={RouterPaths.Root}
                    element={
                      user ? (
                        <Navigate to={RouterPaths.FilterAssignments} />
                      ) : (
                        <Authentication />
                      )
                    }
                  />
                  <Route
                    path={RouterPaths.Signup}
                    element={
                      user ? (
                        <Navigate to={RouterPaths.FilterAssignments} />
                      ) : (
                        <Signup />
                      )
                    }
                  />
                  <Route
                    path={RouterPaths.Login}
                    element={
                      user ? (
                        <Navigate to={RouterPaths.FilterAssignments} />
                      ) : (
                        <Login />
                      )
                    }
                  />
                  <Route
                    path={RouterPaths.FilterAssignments}
                    element={
                      user ? (
                        <FilterAssignments />
                      ) : (
                        <Navigate to={RouterPaths.Root} />
                      )
                    }
                  />
                  <Route
                    path={RouterPaths.MyAssignments}
                    element={
                      user ? (
                        <MyAssignments />
                      ) : (
                        <Navigate to={RouterPaths.Root} />
                      )
                    }
                  />
                  <Route
                    path={"*"}
                    element={
                      user ? (
                        <Navigate to={RouterPaths.FilterAssignments} />
                      ) : (
                        <Navigate to={RouterPaths.Root} />
                      )
                    }
                  />
                </Routes>
              </Grid>
            </Flex>
            <Flex py={4} alignItems={"end"} justifyContent={"center"}>
              <Box mt={"150vh"}>
                <Text fontSize={"sm"} color={textColor}>
                  &copy; {new Date().getFullYear()} Gyaan. All rights reserved.
                </Text>
              </Box>
            </Flex>
          </>
        )}
      </BrowserRouter>
    </Provider>
  );
}

export default App;