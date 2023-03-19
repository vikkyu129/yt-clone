import reactLogo from "./assets/react.svg";
import styled, { ThemeProvider } from "styled-components";
import SideMenu from "./components/SideMenu.jsx";
import Navbar from "./components/Navbar.jsx";
import { darkTheme, lightTheme } from "./utils/Theme.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Video from "./pages/Video.jsx";

const AppContainer = styled.div`
  display: flex;
  font-family: Calibri, serif;
  font-size: large;
`;
const MainWrapper = styled.div`
  padding: 1.5rem 6rem;
`;
const MainContainer = styled.div`
  flex: 7;
`;

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <AppContainer>
        <BrowserRouter>
          <SideMenu />
          <MainContainer>
            <Navbar />
            <MainWrapper>
              <Routes>
                <Route>
                  <Route index element={<Home />} />
                  <Route path="video" element={<Video />}>
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </MainWrapper>
          </MainContainer>
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
