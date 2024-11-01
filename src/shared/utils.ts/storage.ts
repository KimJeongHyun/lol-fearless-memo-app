import { ChampionInfo } from "@/entities/api/champions";

const SELECTED_CHAMPIONS_KEY = "selectedChampions";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ChampionsStorage {
  export const get = () => {
    return localStorage.getItem(SELECTED_CHAMPIONS_KEY);
  };

  export const set = (champions: ChampionInfo[]) => {
    localStorage.setItem(SELECTED_CHAMPIONS_KEY, JSON.stringify(champions));
  };

  export const clear = () => {
    localStorage.removeItem(SELECTED_CHAMPIONS_KEY);
  };
}
