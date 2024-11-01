import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  direction?: CSSProperties["flexDirection"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  gap?: CSSProperties["gap"];
}

const Flex = ({
  children,
  direction = "row",
  justify = "center",
  align = "center",
  gap = 0,
  ...props
}: Props) => {
  return (
    <Container
      $direction={direction}
      $justify={justify}
      $align={align}
      $gap={gap}
      {...props}
    >
      {children}
    </Container>
  );
};

export default Flex;

const Container = styled.div<{
  $direction: CSSProperties["flexDirection"];
  $justify: CSSProperties["justifyContent"];
  $align: CSSProperties["alignItems"];
  $gap: CSSProperties["gap"];
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  justify-content: ${({ $justify }) => $justify};
  align-items: ${({ $align }) => $align};
  gap: ${({ $gap }) => `${$gap}px`};
`;
