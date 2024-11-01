import { useEffect, useState } from "react";
import styled from "styled-components";
import { getChampions } from "./entities/api/champions";

import { ChampionInfo } from "./entities/api/champions";

import { pick } from "lodash-es";
import ChampionSplash from "./entities/ui/ChampionSplashImg";

import Flex from "@/shared/ui/Flex";
import { ChampionsStorage } from "./shared/utils.ts/storage";
import { krSort } from "./shared/utils.ts";

function App() {
  const [search, setSearch] = useState("");
  const [champions, setChampions] = useState<ChampionInfo[]>();
  const [selectedChampions, setSelectedChampions] = useState<ChampionInfo[]>(
    []
  );

  const searchedChampions = krSort<ChampionInfo>(
    champions?.filter(
      (v) =>
        v.name.includes(search) &&
        !selectedChampions.find((s) => s.name === v.name)
    ),
    "name"
  );

  const sortedSelectedChampions = krSort<ChampionInfo>(selectedChampions);

  useEffect(() => {
    getChampions().then((res) => {
      const championInfos = Object.values(res.data.data).map((v) =>
        pick(v, ["key", "name", "image"])
      );
      setChampions(championInfos);
    });
  }, []);

  const handleChampion = (championInfo: ChampionInfo) => {
    if (
      selectedChampions.some((champion) => champion.name === championInfo.name)
    ) {
      return;
    }

    setSelectedChampions([...selectedChampions, championInfo]);
  };

  const handleRemoveChampion = (name: string) => {
    setSelectedChampions((prev) =>
      prev.filter((champion) => champion.name !== name)
    );
  };

  return (
    <AppContainer>
      <Flex justify="space-between" gap={12} style={{ padding: 12 }}>
        <SectionBox>
          <Flex direction="column" gap={12} justify="unset">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
            <ChampionsContainer>
              <ChampionsGrid>
                {searchedChampions?.map(
                  ({ key, name, image, image: { full } }) => (
                    <ChampionSplash
                      key={key}
                      name={name}
                      image={full}
                      disabled={selectedChampions.some(
                        (champion) => champion.name === name
                      )}
                      onClick={() => handleChampion({ key, name, image })}
                    />
                  )
                )}
              </ChampionsGrid>
            </ChampionsContainer>
          </Flex>
        </SectionBox>
        <SectionBox>
          <Flex direction="column" gap={12} justify="unset">
            <Flex justify="space-evenly" style={{ width: "100%" }}>
              <div>픽했던 챔피언</div>
              <Flex gap={4}>
                <button
                  onClick={() => {
                    setSelectedChampions([]);
                  }}
                >
                  초기화
                </button>
                <button
                  onClick={() => {
                    ChampionsStorage.set(selectedChampions);
                  }}
                >
                  저장하기
                </button>
                <button
                  onClick={() => {
                    const savedChampions = ChampionsStorage.get();

                    setSelectedChampions(JSON.parse(savedChampions));
                  }}
                >
                  불러오기
                </button>
                <button
                  onClick={() => {
                    setSelectedChampions([]);

                    ChampionsStorage.clear();
                  }}
                >
                  저장된 챔피언 초기화
                </button>
              </Flex>
            </Flex>
            <ChampionsContainer>
              <Flex direction="column" gap={8} style={{ width: 150 }}>
                {sortedSelectedChampions.map(({ name }) => (
                  <div>{name}</div>
                ))}
              </Flex>
              <ChampionsGrid>
                {sortedSelectedChampions?.map(
                  ({ key, name, image: { full } }) => (
                    <ChampionSplash
                      key={key}
                      name={name}
                      image={full}
                      disabled={selectedChampions.some(
                        (champion) => champion.name === name
                      )}
                      onClick={() => handleRemoveChampion(name)}
                    />
                  )
                )}
              </ChampionsGrid>
            </ChampionsContainer>
          </Flex>
        </SectionBox>
      </Flex>
    </AppContainer>
  );
}

const AppContainer = styled.main`
  background: rgba(0, 0, 0, 0.1);
  height: 100vh;
`;

const SectionBox = styled.section`
  flex: 1;

  &:not(:last-child) {
    border-right: 1px solid gray;
  }
`;

const ChampionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;

  width: fit-content;
  height: 580px;
  overflow: auto;
`;

const ChampionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 64px);
  gap: 4px;
  padding: 12px;
`;

const Input = styled.input`
  width: 300px;
  height: 33px;
`;

export default App;
