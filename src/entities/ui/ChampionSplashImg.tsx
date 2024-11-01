import styled from "styled-components";
import Flex from "../../shared/ui/Flex";

const ChampionSplash = ({
  name,
  image,
  onClick,
  disabled = false,
}: {
  name: string;
  image: string;
  onClick: VoidFunction;
  disabled?: boolean;
}) => {
  return (
    <Container onClick={onClick}>
      <Disabled data-disabled={disabled} />
      <Flex direction="column" gap={4}>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/champion/${image}`}
          alt={name}
          width={64}
          height={64}
        />
        <Name>{name}</Name>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

const Disabled = styled.div`
  position: absolute;
  width: 100%;
  height: 64px;

  &[data-disabled="true"] {
    background: rgba(236, 236, 236, 0.7);
  }
`;

const Name = styled.div`
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

export default ChampionSplash;
