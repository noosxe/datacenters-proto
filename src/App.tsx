import React from 'react';
import './App.css';

import { PacketGenerator } from './entities/packet-generator';
import { SimpleSink } from './entities/simple-sink';
import { BasicCable } from './entities/basic-cable';
import { NetworkEntity } from './entities/network-entity';
import { Canvas } from './canvas';

const sink = new SimpleSink(5);
const cable = new BasicCable();
cable.sink = sink;
const generator = new PacketGenerator(10, cable);
const root = generator;

const maxTick = 50;
let tick = 0;

function processTree(root: NetworkEntity, newTick: number) {
  const visitSet: Set<NetworkEntity> = new Set();
  const processingQueue: NetworkEntity[] = [];

  function parseTree(node: NetworkEntity) {
    if (visitSet.has(node)) {
      return;
    }

    visitSet.add(node);
    processingQueue.unshift(node);

    const sinks = node.getSinks();

    for (const sink of sinks) {
      parseTree(sink);
    }
  }

  parseTree(root);
  // console.log('queue', processingQueue);

  for (const node of processingQueue) {
    node.update(newTick);
  }
}

function logTree(root: NetworkEntity) {
  const visitSet: Set<NetworkEntity> = new Set();
  const processingQueue: NetworkEntity[] = [];

  function parseTree(node: NetworkEntity) {
    if (visitSet.has(node)) {
      return;
    }

    visitSet.add(node);
    processingQueue.push(node);

    const sinks = node.getSinks();

    for (const sink of sinks) {
      parseTree(sink);
    }
  }

  parseTree(root);

  const result = processingQueue.reduce((acc: string[], current) => {
    acc.push(current.getContent());
    return acc;
  }, []);

  console.log('Tree', result);
}

logTree(root);

function upd() {
  if (tick > maxTick) {
    return;
  }

  processTree(root, tick);
  logTree(root);

  tick++;
  requestAnimationFrame(upd);
}

requestAnimationFrame(upd);

//-----------------------------------------------------------------------------------------------------

function App() {
  return (
    <div className="App">
      <Canvas />
    </div>
  );
}

export default App;
