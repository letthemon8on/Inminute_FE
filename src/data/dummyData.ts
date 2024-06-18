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
  speaker: string;
  content: string;
}

export interface ISummaryItem {
  speaker: string;
  content: string;
}

export interface IToDoItem {
  speaker: string;
  content: string;
}

export const initialFolders: IFolder[] = [
  { id: 1, name: "학교" },
  { id: 2, name: "직장" },
];

export const initialNotes: INote[] = [
  {
    id: 1,
    date: "240405",
    time: "09:00",
    day: "Fri",
    title: "프로젝트 이름",
    folderId: 1,
    oneLineSummary: "프로젝트 이름을 인미닛으로 정하였다",
    script: [
      {
        speaker: "심수연",
        content: "오늘 회의 안건은 프로젝트의 이름 정하기입니다",
      },
      { speaker: "박상욱", content: "저는 인미닛이 좋다고 생각합니다" },
    ],
    summary: [{ speaker: "심수연", content: "인미닛이 좋다고 생각한다" }],
    todo: [{ speaker: "심수연", content: "Inminute 로고를 디자인한다" }],
  },
  {
    id: 2,
    date: "240507",
    time: "09:00",
    day: "Fri",
    title: "flow 회의",
    folderId: 1,
    oneLineSummary: "flow 회의를 진행하였다",
    script: [
      { speaker: "심수연", content: "오늘 회의 안건은 flow 논의입니다" },
      { speaker: "박상욱", content: "flow를 이렇게 구성하면 좋을 것 같습니다" },
    ],
    summary: [{ speaker: "박상욱", content: "flow 구성을 논의하였다" }],
    todo: [{ speaker: "심수연", content: "flow를 최종 확정짓는다" }],
  },
  {
    id: 3,
    date: "240603",
    time: "09:00",
    day: "Fri",
    title: "업무 역할 분배",
    folderId: 2,
    oneLineSummary: "각자 업무 역할을 분배하였다",
    script: [
      { speaker: "심수연", content: "오늘 회의 안건은 업무 역할 분배입니다" },
      { speaker: "박상욱", content: "저는 백엔드 개발을 담당하겠습니다" },
    ],
    summary: [{ speaker: "박상욱", content: "백엔드 개발을 담당하게 되었다" }],
    todo: [{ speaker: "박상욱", content: "백엔드 개발 일정을 작성한다" }],
  },
];
