import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import axios from "../api/axiosConfig";
import { formatDate, formatDay, formatTime } from "../util/date";

export interface IFolder {
  id: number;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export interface INote {
  id: number;
  name: string;
  folderId: number;
  createdAt: string;
  date: string;
  time: string;
  day: string;
  oneLineSummary: string | null;
  script: string | null;
  // script: IScriptItem[];
  // summary: ISummaryItem[];
  // todo: IToDoItem[];
  participantNames: { name: string | null }[];
}

// export interface IScriptItem {
//   id: number;
//   speaker: string;
//   content: string;
// }

// export interface ISummaryItem {
//   id: number;
//   speaker: string;
//   content: string;
// }

// export interface IToDoItem {
//   id: number;
//   speaker: string;
//   content: string;
// }

interface AppContextType {
  folders: IFolder[];
  notes: INote[];
  addFolder: (name: string) => void;
  fetchFolder: () => void;
  updateFolder: (id: number, name: string) => void;
  deleteFolder: (id: number) => void;
  addNote: (folderId: number, name: string) => Promise<INote | undefined>;
  fetchNote: () => void;
  fetchFolderNote: (folderId: number) => Promise<INote[]>;
  deleteNote: (id: number) => Promise<void>;
  fetchNoteDetail: (noteId: number) => Promise<INote | null>;
  updateNoteTitle: (id: number, newTitle: string) => Promise<INote | null>;
  updateNoteOneLine: (id: number, newOneLine: string) => void;
  // updateScriptItem: (noteId: number, id: number, content: string) => void;
  // deleteScriptItem: (noteId: number, id: number) => void;
  // updateSummaryBySpkItem: (noteId: number, id: number, content: string) => void;
  // deleteSummaryBySpkItem: (noteId: number, id: number) => void;
  // updateToDoBySpkItem: (noteId: number, id: number, content: string) => void;
  // deleteToDoBySpkItem: (noteId: number, id: number) => void;
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
        id: response.data.result.id,
        name,
        createdAt: response.data.result.createdAt,
      };
      setFolders([...folders, newFolder]);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const fetchFolder = async () => {
    try {
      const response = await axios.get("/folders/all");
      console.log("API Response:", response.data.result); // 응답 데이터 로그 출력
      setFolders(response.data.result.folders || []);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, []);

  const updateFolder = async (id: number, name: string) => {
    try {
      const response = await axios.patch(`/folders/${id}`, { name });
      const updatedFolder = response.data.result;
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.id === id
            ? {
                ...folder,
                name,
                updatedAt: updatedFolder.updatedAt,
              }
            : folder
        )
      );
    } catch (error) {
      console.error("Error updating folder:", error);
    }
  };

  const deleteFolder = async (id: number) => {
    try {
      const response = await axios.delete(`/folders/${id}`);
      const deletedFolder = response.data.isSuccess;
      console.log(deletedFolder); // 성공 로그 출력
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== id)
      );
      setNotes((prevNotes) => prevNotes.filter((note) => note.folderId !== id));
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const addNote = async (
    folderId: number,
    name: string
  ): Promise<INote | undefined> => {
    try {
      const response = await axios.post("/notes", { folderId, name });
      const createdAt = response.data.result.createdAt;
      console.log(response.data); // 응답 데이터 로그 출력
      const newNote = {
        id: response.data.result.id,
        name,
        folderId,
        createdAt,
        date: formatDate(createdAt),
        time: formatTime(createdAt),
        day: formatDay(createdAt),
        oneLineSummary: "",
        script: "",
        // summary: [],
        // todo: [],
        participantNames: [],
      };
      setNotes([...notes, newNote]);
      return newNote;
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // 전체 노트 get
  const fetchNote = async () => {
    try {
      const response = await axios.get("/notes/all");
      setNotes(response.data.result.notes || []);
    } catch (error) {
      console.error("Error fetching all notes:", error);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  // 폴더별 노트 get
  const fetchFolderNote = async (folderId: number): Promise<INote[]> => {
    try {
      const response = await axios.get("/notes", { params: { folderId } });
      console.log("Note Response:", response.data);
      setNotes(response.data.result.notes);
      return response.data.result.notes || [];
    } catch (error) {
      console.error("Error fetching folder notes:", error);
      return [];
    }
  };

  // 노트 delete
  const deleteNote = async (id: number) => {
    try {
      const response = await axios.delete(`/notes/${id}`);
      if (response.data.isSuccess) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      } else {
        console.error("Failed to delete note:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // 노트 detail get
  const fetchNoteDetail = async (noteId: number): Promise<INote | null> => {
    try {
      const response = await axios.get(`notes-detail/${noteId}`);
      console.log(response.data.result);
      if (response.data.isSuccess) {
        const result = response.data.result;
        const formattedNote: INote = {
          id: result.id,
          name: result.name,
          folderId: result.folderId,
          createdAt: result.createdAt,
          date: formatDate(result.createdAt),
          day: formatDay(result.createdAt),
          time: formatTime(result.createdAt),
          oneLineSummary: result.summary,
          script: result.script,
          participantNames: result.participantNames.map(
            (p: { name: string }) => ({ name: p.name })
          ),
        };
        return formattedNote;
      } else {
        console.error("Failed to fetch note details:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching note details:", error);
      return null;
    }
  };

  const updateNoteTitle = async (
    id: number,
    newTitle: string
  ): Promise<INote | null> => {
    try {
      const response = await axios.patch(`notes/${id}`, { name: newTitle });
      if (response.data.isSuccess) {
        const updatedNote = await fetchNoteDetail(id);
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === id ? { ...note, name: newTitle } : note
          )
        );
        return updatedNote;
      } else {
        console.error("Failed to update note title:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error updating note title:", error);
      return null;
    }
  };

  const updateNoteOneLine = (id: number, newOneLine: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, oneLineSummary: newOneLine } : note
      )
    );
  };

  // const updateScriptItem = (noteId: number, id: number, content: string) => {
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === noteId
  //         ? {
  //             ...note,
  //             script: note.script.map((item) =>
  //               item.id === id ? { ...item, content } : item
  //             ),
  //           }
  //         : note
  //     )
  //   );
  // };

  // const deleteScriptItem = (noteId: number, id: number) => {
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === noteId
  //         ? {
  //             ...note,
  //             script: note.script.filter((item) => item.id !== id),
  //           }
  //         : note
  //     )
  //   );
  // };

  // const updateSummaryBySpkItem = (
  //   noteId: number,
  //   id: number,
  //   content: string
  // ) => {
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === noteId
  //         ? {
  //             ...note,
  //             summary: note.summary.map((item) =>
  //               item.id === id ? { ...item, content } : item
  //             ),
  //           }
  //         : note
  //     )
  //   );
  // };

  // const deleteSummaryBySpkItem = (noteId: number, id: number) => {
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === noteId
  //         ? {
  //             ...note,
  //             summary: note.summary.filter((item) => item.id !== id),
  //           }
  //         : note
  //     )
  //   );
  // };

  // const updateToDoBySpkItem = (
  //   noteId: number,
  //   itemId: number,
  //   content: string
  // ) => {
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === noteId
  //         ? {
  //             ...note,
  //             todo: note.todo.map((item) =>
  //               item.id === itemId ? { ...item, content } : item
  //             ),
  //           }
  //         : note
  //     )
  //   );
  // };

  // const deleteToDoBySpkItem = (noteId: number, itemId: number) => {
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === noteId
  //         ? {
  //             ...note,
  //             todo: note.todo.filter((item) => item.id !== itemId),
  //           }
  //         : note
  //     )
  //   );
  // };

  return (
    <AppContext.Provider
      value={{
        folders,
        notes,
        addFolder,
        fetchFolder,
        updateFolder,
        deleteFolder,
        addNote,
        fetchNote,
        fetchFolderNote,
        deleteNote,
        fetchNoteDetail,
        updateNoteTitle,
        updateNoteOneLine,
        // updateScriptItem,
        // deleteScriptItem,
        // updateSummaryBySpkItem,
        // deleteSummaryBySpkItem,
        // updateToDoBySpkItem,
        // deleteToDoBySpkItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
