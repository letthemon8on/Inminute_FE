import "./App.css";
import "./styles/fonts/font.css";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import theme from "./styles/theme";
import Home from "./pages/Home";
import About from "./pages/About";
import List from "./pages/List";
import Note from "./pages/Note";
import Notfound from "./pages/Notfound";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/list" element={<List />} />
              <Route path="/note/:id" element={<Note />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
