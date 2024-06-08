import "./App.css";
import "./styles/fonts/font.css";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./pages/List";
import About from "./pages/About";
import New from "./pages/New";
import Note from "./pages/Note";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import { FolderProvider } from "./context/FolderContext";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <FolderProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/list" element={<List />} />
              <Route path="/new" element={<New />} />
              <Route path="/note/:id" element={<Note />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </BrowserRouter>
        </FolderProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
