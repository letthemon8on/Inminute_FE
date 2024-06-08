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

  return (
    <FolderContext.Provider value={{ folders, notes, addFolder }}>
      {children}
    </FolderContext.Provider>
  );
};
