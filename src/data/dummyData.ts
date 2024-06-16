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
}

export const initialFolders: IFolder[] = [
  {
    id: 1,
    name: "학교",
  },
  {
    id: 2,
    name: "직장",
  },
];

export const initialNotes: INote[] = [
  {
    id: 1,
    date: "240405",
    time: "09:00",
    day: "Fri",
    title: "프로젝트 이름",
    folderId: 1,
  },
  {
    id: 2,
    date: "240507",
    time: "09:00",
    day: "Fri",
    title: "flow 회의",
    folderId: 1,
  },
  {
    id: 3,
    date: "240603",
    time: "09:00",
    day: "Fri",
    title: "업무 역할 분배",
    folderId: 2,
  },
];
