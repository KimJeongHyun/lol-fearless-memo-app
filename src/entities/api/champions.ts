import axios, { AxiosResponse } from "axios";

export interface ChampionInfo {
  name: string;
  key: number;
  image: {
    full: string;
  };
}

type ChampionResponse = Record<string, ChampionInfo>;

export const getChampions = () => {
  return axios.get<AxiosResponse<ChampionResponse>>(
    "https://ddragon.leagueoflegends.com/cdn/14.21.1/data/ko_KR/champion.json"
  );
};
