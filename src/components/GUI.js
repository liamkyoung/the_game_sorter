import React from "react";
import styled from "@emotion/styled";
import SearchBar from "./Search";
import Selection from "./SortSelect";

const Interface = (props) => {
  return (
    <Container>
      <Title>The Game Sorter</Title>
      <SearchBar getSearchedGame={props.getSearchedGame} game={props.game} />

      <Selection games={props.games} />
    </Container>
  );
};
export default Interface;

const Container = styled.div`
  align-items: center;
  height: 80vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  width: 30%;
  -ms-transform: translateY(-50%);
  transform: translateY(10%);
  position: absolute;
`;

const Title = styled.div`
  color: #394e70;
  font-family: Poppins;
  text-align: center;
  font-size: 2.5em;
  font-weight: bold;
  letter-spacing: -0.05em;
  height: fit-content;
  position: relative;
  top: 6em;
`;
