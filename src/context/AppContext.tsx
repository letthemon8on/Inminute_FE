import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
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
  // 추후 반영
  // script: IScriptItem[];
  // summary: ISummaryItem[];
  // todo: IToDoItem[];
  participantNames: { name: string | null }[];
}

// 추후 반영

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
  fetchNoteDetail: (noteId: number) => Promise<INote | null>;
  updateNoteTitle: (id: number, newTitle: string) => Promise<INote | null>;
  updateNoteOneLine: (id: number, newOneLine: string) => Promise<INote | null>;
  deleteNote: (id: number) => Promise<void>;
  addZoom: (params: { noteId: number }) => Promise<void>;
  // 추후 반영
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

  // 폴더 생성 (CREATE)
  const addFolder = async (name: string) => {
    try {
      const response = await axios.post("/folders", { name });
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

  // 폴더 가져오기 (READ)
  const fetchFolder = async () => {
    try {
      const response = await axios.get("/folders/all");
      setFolders(response.data.result.folders || []);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, []);

  // 폴더 수정 (UPDATE)
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

  // 폴더 삭제 (DELETE)
  const deleteFolder = useCallback(async (id: number) => {
    try {
      const response = await axios.delete(`/folders/${id}`);
      if (response.data.isSuccess) {
        setFolders((prevFolders) =>
          prevFolders.filter((folder) => folder.id !== id)
        );
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.folderId !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  }, []);

  // 노트 생성 (CREATE)
  const addNote = async (
    folderId: number,
    name: string
  ): Promise<INote | undefined> => {
    try {
      const response = await axios.post("/notes", { folderId, name });
      const createdAt = response.data.result.createdAt;
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

  // 전체 노트 가져오기 (READ)
  const fetchNote = useCallback(async () => {
    try {
      const response = await axios.get("/notes/all");
      setNotes(response.data.result.notes || []);
    } catch (error) {
      console.error("Error fetching all notes:", error);
    }
  }, []);

  // 폴더별 노트 가져오기 (READ)
  const fetchFolderNote = useCallback(
    async (folderId: number): Promise<INote[]> => {
      try {
        const response = await axios.get("/notes", { params: { folderId } });
        setNotes(response.data.result.notes);
        return response.data.result.notes || [];
      } catch (error) {
        console.error("Error fetching folder notes:", error);
        return [];
      }
    },
    []
  );

  // 노트 제목 수정 (UPDATE)
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

  // 노트 한 줄 요약 수정 (UPDATE)
  const updateNoteOneLine = async (
    id: number,
    newOneLine: string
  ): Promise<INote | null> => {
    try {
      const response = await axios.patch(`notes/${id}`, {
        summary: newOneLine,
      });
      if (response.data.isSuccess) {
        const updatedNote = await fetchNoteDetail(id);
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === id ? { ...note, oneLineSummary: newOneLine } : note
          )
        );
        return updatedNote;
      } else {
        console.error(
          "Failed to update note one line summary:",
          response.data.message
        );
        return null;
      }
    } catch (error) {
      console.error("Error updating note one line summary:", error);
      return null;
    }
  };

  // 노트 detail 가져오기 (READ)
  const fetchNoteDetail = async (noteId: number): Promise<INote | null> => {
    try {
      const response = await axios.get(`notes-detail/${noteId}`);
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

  // 노트 삭제 (DELETE)
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

  // zoom 미팅 생성
  const addZoom = async (params: { noteId: number }) => {
    try {
      await axios.post("/zoom/create-meeting", params);
    } catch (error) {
      console.error("Failed to create Zoom meeting:", error);
    }
  };

  // 추후 반영

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
        fetchNoteDetail,
        updateNoteTitle,
        updateNoteOneLine,
        deleteNote,
        addZoom,
        // 추후 반영
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
