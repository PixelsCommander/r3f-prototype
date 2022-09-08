import create from 'zustand'
import {ItemState} from "../types";

export const initialState = {
  bettingState: [
    [ItemState.On, ItemState.Off, ItemState.On, ItemState.Off],
    [ItemState.On, ItemState.Multiplied, ItemState.On, ItemState.Off],
    [ItemState.Off, ItemState.On, ItemState.On, ItemState.On],
    [ItemState.Off, ItemState.Off, ItemState.On, ItemState.Off],,
  ],
  show3d: false,
  showLight: false,
  showAnimations: false,
  showSprites: false,
};

export type State = typeof initialState;

export interface GameState {
  state: State,
  toggle3d: () => any,
  setBettingState: (x, y, itemState: ItemState) => any,
  toggleAnimations: () => any;
  toggleLight: () => any;
  toggleSprites: () => any;
}

export const useGameStore = create<GameState>((set) => ({
  state: initialState,
  setBettingState: (x, y, itemState: ItemState) => set((state: GameState) => {
    state.state.bettingState[x][y] = itemState;
    return {...state};
  }),
  toggle3d: () => set((state: GameState) => ({ ...state,
    state: {
      ...state.state,
        show3d: !state.state.show3d,
    }
 })),
  toggleAnimations: () => set((state: GameState) => ({ ...state,
    state: {
      ...state.state,
      showAnimations: !state.state.showAnimations,
    }
  })),
  toggleLight: () => set((state: GameState) => ({ ...state, state: {
      ...state.state,
      showLight: !state.state.showLight,
    } })),
  toggleSprites: () => set((state: GameState) => ({ ...state, state: {
      ...state.state,
      showSprites: !state.state.showSprites,
    } })),
}))
