import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import SearchBar from "./Search"
import Selection from "./SortSelect"
import GraphAlgorithm from "./GraphAlgorithm"
import Dropdown from "./Dropdown"
import Switch from "./Switch"
import GUI from "../GUI.css"

const Interface = (props) => {
  const [source, setSource] = useState("")
  const [dest, setDest] = useState("")

  useEffect(() => {
    console.log("source: ", source)
    console.log("dest: ", dest)
  }, [source, dest])
  return (
    <Container>
      <Title>The Game Sorter</Title>
      <SearchBar getSearchedGame={props.getSearchedGame} game={props.game} />
      {props.game && props.adjacencyList && props.games.length >= 2 ? (
        <div className='flex graph-algorithm white'>
          {/* SOURCE: Dropdown Menu with all Games */}
          {/* DESTINATION : Dropdown Menu with all Games */}
          <div>
            <Dropdown
              text='Source'
              games={props.games?.filter((item) => item.name !== dest)}
              node={setSource}
            />
            <Dropdown
              text='Dest'
              games={props.games?.filter((item) => item.name !== source)}
              node={setDest}
            />
          </div>

          <div>
            <GraphAlgorithmContainer>
              <GraphAlgorithm
                type={"DFS"}
                graph={props.adjacencyList}
                src={source}
                dest={dest}
              />
            </GraphAlgorithmContainer>

            <GraphAlgorithmContainer>
              <GraphAlgorithm
                type={"BFS"}
                graph={props.adjacencyList}
                src={source}
                dest={dest}
              />
            </GraphAlgorithmContainer>
          </div>
        </div>
      ) : null}
    </Container>
  )
}

const GraphAlgorithmContainer = styled.div`
  color: #394e70;
`

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
`

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
`

export default Interface
