import React, { createContext, useState, ReactNode, useContext } from "react";
import {
  IFolder,
  INote,
  initialFolders,
  initialNotes,
} from "./../data/dummyData";

interface FolderContextType {
  folders: IFolder[];
  notes: INote[];
  addFolder: (name: string) => void;
  addNote: (title: string, folderId: number) => INote;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const useFolderContext = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolderContext must be used within a FolderProvider");
  }
  return context;
};

export const FolderProvider: React.FC<{ children: ReactNode }> = ({
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

  const addNote = (title: string, folderId: number): INote => {
    const now = new Date();
    const newNote: INote = {
      id: notes.length + 1,
      date: formatDate(now),
      time: formatTime(now),
      day: formatDay(now),
      title,
      folderId,
    };
    setNotes([...notes, newNote]);

    return newNote;
  };

  return (
    <FolderContext.Provider value={{ folders, notes, addFolder, addNote }}>
      {children}
    </FolderContext.Provider>
  );
};
