import React, { useState } from 'react'
import styled from '@emotion/styled'
import Algorithm from './Algorithm'
import GraphAlgorithm from './GraphAlgorithm'

const Selection = (props) => {
  const [choice, setChoice] = useState('select')

  if (choice === 'select') {
    return (
      <Container>
        <FirstSort
          onClick={(e) => {
            e.preventDefault()
            setChoice('first')
          }}>
          Selection Sort
        </FirstSort>
        <SecondSort
          onClick={(e) => {
            e.preventDefault()
            setChoice('second')
          }}>
          Shell Sort
        </SecondSort>
        <GraphAlgorithm />
      </Container>
    )
  } else {
    return (
      <Container2>
        <Exit
          onClick={(e) => {
            e.preventDefault()
            setChoice('select')
          }}>
          X
        </Exit>
        <Algorithm process={choice} games={props.games} />
      </Container2>
    )
  }
}
export default Selection

const Container = styled.div`
  background: #46618b;
  display: flex;
  margin-left: auto;
  width: 150px;
  margin-right: auto;
  height: 90px;
  border-radius: 10px;
  align-items: center;

  flex-direction: column;
  justify-content: space-around;
  -ms-transform: translateY(-60%);
  transform: translateY(300%);
`
const Container2 = styled.div`
  background: #46618b;
  display: flex;
  margin-left: auto;
  color: white;
  margin-right: auto;
  width: 300px;
  border-radius: 10px;
  align-items: center;

  flex-direction: column;
  justify-content: space-around;
  -ms-transform: translateY(-60%);
  transform: translateY(110%);
`
const FirstSort = styled.button`
  background: #394e70;
  border: transparent;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  -ms-transform: translateY(-60%);
  transform: translateY(0%);
`
const SecondSort = styled.button`
  background: #394e70;
  border: transparent;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  -ms-transform: translateY(-60%);
  transform: translateY(0%);
  cursor: pointer;
`
const Exit = styled.button`
  background: #ce2121;
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 50%;
  border: transparent;
  cursor: pointer;
  color: white;
`
