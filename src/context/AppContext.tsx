import React, { createContext, useState, ReactNode, useContext } from "react";
import {
  IFolder,
  INote,
  initialFolders,
  initialNotes,
} from "../data/dummyData";

interface AppContextType {
  folders: IFolder[];
  notes: INote[];
  addFolder: (name: string) => void;
  updateFolder: (id: number, name: string) => void;
  deleteFolder: (id: number) => void;
  addNote: (folderId: number, title: string) => INote;
  updateNoteTitle: (id: number, newTitle: string) => void;
  updateNoteOneLine: (id: number, newOneLine: string) => void;
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
  const [folders, setFolders] = useState<IFolder[]>(initialFolders);
  const [notes, setNotes] = useState<INote[]>(initialNotes);

  const addFolder = (name: string) => {
    const newFolder = {
      id: folders.length + 1,
      name,
    };
    setFolders([...folders, newFolder]);
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

  return (
    <AppContext.Provider
      value={{
        folders,
        notes,
        addFolder,
        updateFolder,
        deleteFolder,
        addNote,
        updateNoteTitle,
        updateNoteOneLine,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
