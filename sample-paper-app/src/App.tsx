import { Login } from "./pages/Login/Login"
import { RouterPaths } from "./global/enum"
import { Signup } from "./pages/Signup/Signup"
import { Header } from "./components/Header/Header"
import { Provider } from "./components/ui/provider"
import { Flex, Grid, Spinner } from "@chakra-ui/react"
import { useAuthContext } from "./hooks/useAuthContext"
import { Navigation } from "./components/Navigation/Navigation"
import { MyAssignments } from "./pages/MyAssignments/MyAssignments"
import { Authentication } from "./pages/Authentication/Authentication"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { FilterAssignments } from "./pages/FilterAssignments/FilterAssignments"
import { BackgroundTheme } from "./components/BackgroundTheme/BackgroundTheme"

function App() {

  const { user, authIsReady } = useAuthContext();

  return (
    <Provider>
      <BackgroundTheme />
      <BrowserRouter>
        {!authIsReady && (
          <Flex w={"100vw"} h={"100dvh"} align={"center"} justify={"center"}>
            <Spinner size={"md"} color={"#3bc8f6d6"} colorPalette={"#3bc8f6d6"} />
          </Flex>
        )}
        {authIsReady && (
          <Flex justifyContent={"center"} alignItems={"center"} w={"100vw"} m={"auto"}>
            <Grid height={"100dvh"} gridTemplateRows={user ? "auto auto 1fr" : "auto 1fr"} w={["100vw", "100vw", "100vw", "100vw", "90vw"]}
            >
              <Header />
              {user && <Navigation />}
              <Routes>
                <Route
                  path={RouterPaths.Root}
                  element={user ? <Navigate to={RouterPaths.FilterAssignments} /> : <Authentication />}
                />
                <Route
                  path={RouterPaths.Signup}
                  element={user ? <Navigate to={RouterPaths.FilterAssignments} /> : <Signup />}
                />
                <Route
                  path={RouterPaths.Login}
                  element={user ? <Navigate to={RouterPaths.FilterAssignments} /> : <Login />}
                />
                <Route
                  path={RouterPaths.FilterAssignments}
                  element={user ? <FilterAssignments /> : <Navigate to={RouterPaths.Root} />}
                />
                <Route
                  path={RouterPaths.MyAssignments}
                  element={user ? <MyAssignments /> : <Navigate to={RouterPaths.Root} />}
                />
                <Route
                  path={"*"}
                  element={user ? <Navigate to={RouterPaths.FilterAssignments} /> : <Navigate to={RouterPaths.Root} />}
                />
              </Routes>
            </Grid>
          </Flex>
        )}
      </BrowserRouter>
    </Provider>
  )
}

export default App
