import reactLogo from "./assets/react.svg";
import styled, { ThemeProvider } from "styled-components";
import SideMenu from "./components/SideMenu.jsx";
import Navbar from "./components/Navbar.jsx";
import { darkTheme, lightTheme } from "./utils/Theme.jsx";

const AppContainer = styled.div`
  display: flex;
`;
const MainWrapper = styled.div``;
const MainContainer = styled.div`
  flex: 7;
`;

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <AppContainer>
        <SideMenu />
        <MainContainer>
          <Navbar />
          <MainWrapper> video cards </MainWrapper>
        </MainContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
