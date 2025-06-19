import { Provider } from "./components/ui/provider"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import { RouterPaths } from "./global/enum"
import { Authentication } from "./pages/Authentication/Authentication"
import { Login } from "./pages/Login/Login"
import { Signup } from "./pages/Signup/Signup"
import { FilterAssignments } from "./pages/FilterAssignments/FilterAssignments"
import { MyAssignments } from "./pages/MyAssignments/MyAssignments"
import { Flex, Grid } from "@chakra-ui/react"
import { Header } from "./components/Header/Header"

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Flex justifyContent={"center"} alignItems={"center"} w={"100vw"} m={"auto"}>
          <Grid height={"100dvh"} gridTemplateRows={"auto 1fr"} 
            w={["100vw", "100vw", "100vw", "100vw", "90vw"]}
            >
            <Header/>
            <Routes>
              <Route
                path = {RouterPaths.Root}
                element = {<Authentication/>}
              />
              <Route 
                path = {RouterPaths.Signup}
                element = {<Signup/>} 
              />
              <Route
                path = {RouterPaths.Login}
                element = {<Login/>}
              />
              <Route
                path = {RouterPaths.FilterAssignments}
                element = {<FilterAssignments/>} 
              />
              <Route 
                path={RouterPaths.MyAssignments}
                element = {<MyAssignments/>}
              />
              <Route
                path={"*"}
                element = {<Navigate to={RouterPaths.Root}/>}
              />
            </Routes>
          </Grid>
        </Flex>
      </BrowserRouter>
    </Provider>
  )
}

export default App
