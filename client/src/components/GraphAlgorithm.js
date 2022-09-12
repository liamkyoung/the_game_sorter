import React from 'react'
import { useState } from 'react'

function GraphAlgorithm({ graph, type, src, dest }) {
  const [time, setTime] = useState(null)
  let visited = new Set()
  return (
    <div>
      {type ? (
        <button
          onClick={() => {
            visited = new Set()
            runTraversal(type, graph, src, dest, visited).then((res) =>
              setTime(res)
            )
          }}>
          {type}
        </button>
      ) : null}

      {time !== null ? <h1>Time: {time.toString()} ms</h1> : <></>}
    </div>
  )
}

async function depthFirstSearch(adjacencyList, src, dest, visited) {
  if (src === dest) return true
  if (visited.has(src)) return false

  visited.add(src)

  const graph = adjacencyList
  graph[src].forEach((neighbor) => {
    if (depthFirstSearch(graph, neighbor, dest, visited)) return true
  })

  return false
}

async function breadthFirstSearch(adjacencyList, src, dest, visited) {
  if (src === dest) return true

  const graph = adjacencyList
  let queue = [src]

  while (queue.length > 0) {
    let curr = queue.shift()
    if (curr === dest) return true
    for (let neighbor of graph[curr]) {
      if (visited.has(neighbor)) continue
      queue.push(neighbor)
      visited.add(neighbor)
    }
  }
  return false
}

async function runTraversal(type, graph, src, dest, visit) {
  const t1 = Date.now()
  for (let i = 0; i < 10000; i++) {
    if (type === 'DFS') {
      await depthFirstSearch(graph, src, dest, visit)
    } else {
      await breadthFirstSearch(graph, src, dest, visit)
    }
  }
  const t2 = Date.now()
  const timePassed = t2 - t1
  return timePassed
}

export default GraphAlgorithm
