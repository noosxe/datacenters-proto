import React from 'react';
import './App.css';

import { PacketGenerator } from './entities/packet-generator';
import { SimpleSink } from './entities/simple-sink';
import { BasicCable } from './entities/basic-cable';

const sink = new SimpleSink(10);
const cable = new BasicCable();
cable.sink = sink;
const generator = new PacketGenerator(5, cable);

const maxTick = 20;
let tick = 0;

function upd() {
  sink.update(tick);
  cable.update(tick);
  generator.update(tick);

  if (tick > maxTick) {
    return;
  }

  tick++;
  requestAnimationFrame(upd);
}

requestAnimationFrame(upd);

//-----------------------------------------------------------------------------------------------------

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
