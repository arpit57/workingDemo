import "./App.scss";
import { useState } from "react";
import Landing from "./pages/Landing";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import { ThemeProvider } from "@mui/material/styles";
import useMuiTheme from "./customHooks/useMuiTheme";
import { UserContext } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";

function App() {
  const muiTheme = useMuiTheme();
  const [user, setUser] = useState(localStorage.getItem("texUser"));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={muiTheme}>
        <div className="App">
          {!user ? (
            <LoginPage />
          ) : (
            <Container fluid style={{ padding: 0 }}>
              <NavbarComponent />
            </Container>
          )}
        </div>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
