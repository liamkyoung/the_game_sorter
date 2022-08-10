import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
const SelSort = (props) => {
  const [juegos, setJuegos] = useState([]);

  var game = props.games;

  const selectionSort = (g) => {
    for (let i = 1; i < g.length; i++) {
      let min = i;
      for (let j = i + 1; j < g.length; j++) {
        if (100 - g[j].rating < 100 - g[min].rating) {
          min = j;
        }
      }
      var temp = g[i];
      g[i] = g[min];
      g[min] = temp;
    }
    var games = [];
    for (let i = 1; i < 6; i++) {
      games.push(g[i]);
    }

    setJuegos(games);
  };

  var t0 = performance.now();
  useEffect(() => {
    selectionSort(game);
  }, [game]);
  var t1 = performance.now();
  var t = t1 - t0;

  return (
    <Container>
      Highest rated similar games:
      <ol type="1">
        {juegos.map((juegos, i) => {
          return <li key={i}>{juegos.name}</li>;
        })}
      </ol>
      <Time>Time elapsed: {t} ms</Time>
    </Container>
  );
};

export default SelSort;

const Time = styled.div`
  color: #e0e0e0;
`;

const Container = styled.div`
  align-items: center;
  padding: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
`;
