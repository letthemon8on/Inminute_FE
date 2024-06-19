import React, { createContext, useState, ReactNode, useContext } from "react";
import axios from "../api/axiosConfig";

export interface IFolder {
  id: number;
  name: string;
}

export interface INote {
  id: number;
  date: string;
  time: string;
  day: string;
  title: string;
  folderId: number;
  oneLineSummary: string;
  script: IScriptItem[];
  summary: ISummaryItem[];
  todo: IToDoItem[];
}

export interface IScriptItem {
  id: number;
  speaker: string;
  content: string;
}

export interface ISummaryItem {
  id: number;
  speaker: string;
  content: string;
}

export interface IToDoItem {
  id: number;
  speaker: string;
  content: string;
}

interface AppContextType {
  folders: IFolder[];
  notes: INote[];
  addFolder: (name: string) => void;
  updateFolder: (id: number, name: string) => void;
  deleteFolder: (id: number) => void;
  addNote: (folderId: number, title: string) => INote;
  deleteNote: (folderId: number) => void;
  updateNoteTitle: (id: number, newTitle: string) => void;
  updateNoteOneLine: (id: number, newOneLine: string) => void;
  updateScriptItem: (noteId: number, id: number, content: string) => void;
  deleteScriptItem: (noteId: number, id: number) => void;
  updateSummaryBySpkItem: (noteId: number, id: number, content: string) => void;
  deleteSummaryBySpkItem: (noteId: number, id: number) => void;
  updateToDoBySpkItem: (noteId: number, id: number, content: string) => void;
  deleteToDoBySpkItem: (noteId: number, id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [notes, setNotes] = useState<INote[]>([]);

  const addFolder = async (name: string) => {
    try {
      const response = await axios.post("/folders", { name });
      console.log(response.data); // 응답 데이터 로그 출력
      const newFolder = {
        id: response.data.id,
        name,
      };
      setFolders([...folders, newFolder]);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const updateFolder = (id: number, name: string) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === id ? { ...folder, name } : folder
      )
    );
  };

  const deleteFolder = (id: number) => {
    setFolders((prevFolders) =>
      prevFolders.filter((folder) => folder.id !== id)
    );
    setNotes((prevNotes) => prevNotes.filter((note) => note.folderId !== id));
  };

  const formatDate = (date: Date) => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDay = (date: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  const addNote = (folderId: number, title: string): INote => {
    const now = new Date();
    const newNote: INote = {
      id: notes.length + 1,
      date: formatDate(now),
      time: formatTime(now),
      day: formatDay(now),
      title,
      folderId,
      oneLineSummary: "",
      script: [],
      summary: [],
      todo: [],
    };
    setNotes([...notes, newNote]);

    return newNote;
  };

  const deleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNoteTitle = (id: number, newTitle: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, title: newTitle } : note
      )
    );
  };

  const updateNoteOneLine = (id: number, newOneLine: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, oneLineSummary: newOneLine } : note
      )
    );
  };

  const updateScriptItem = (noteId: number, id: number, content: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              script: note.script.map((item) =>
                item.id === id ? { ...item, content } : item
              ),
            }
          : note
      )
    );
  };

  const deleteScriptItem = (noteId: number, id: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              script: note.script.filter((item) => item.id !== id),
            }
          : note
      )
    );
  };

  const updateSummaryBySpkItem = (
    noteId: number,
    id: number,
    content: string
  ) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              summary: note.summary.map((item) =>
                item.id === id ? { ...item, content } : item
              ),
            }
          : note
      )
    );
  };

  const deleteSummaryBySpkItem = (noteId: number, id: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              summary: note.summary.filter((item) => item.id !== id),
            }
          : note
      )
    );
  };

  const updateToDoBySpkItem = (
    noteId: number,
    itemId: number,
    content: string
  ) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              todo: note.todo.map((item) =>
                item.id === itemId ? { ...item, content } : item
              ),
            }
          : note
      )
    );
  };

  const deleteToDoBySpkItem = (noteId: number, itemId: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              todo: note.todo.filter((item) => item.id !== itemId),
            }
          : note
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        folders,
        notes,
        addFolder,
        updateFolder,
        deleteFolder,
        addNote,
        deleteNote,
        updateNoteTitle,
        updateNoteOneLine,
        updateScriptItem,
        deleteScriptItem,
        updateSummaryBySpkItem,
        deleteSummaryBySpkItem,
        updateToDoBySpkItem,
        deleteToDoBySpkItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
