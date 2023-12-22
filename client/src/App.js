import "./App.css";
import { Route, Routes } from "react-router-dom";
import Registration from "./view/registration";
import Login from "./view/login";
import { UserContextProvider } from "./userContext";
import IndexPage from "./view/indexPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
