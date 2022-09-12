import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: ITodo[];
}

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export const toDoState = atom<IToDoState>({
  key: "todos",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
