import { Provider } from "./components/ui/provider"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import { RouterPaths } from "./global/enum"
import { Authentication } from "./pages/Authentication/Authentication"
import { Login } from "./pages/Login/Login"
import { Signup } from "./pages/Signup/Signup"
import { FilterAssignments } from "./pages/FilterAssignments/FilterAssignments"
import { MyAssignments } from "./pages/MyAssignments/MyAssignments"

function App() {
  return (
    <Provider>
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>
  )
}

export default App
