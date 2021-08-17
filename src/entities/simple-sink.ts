import { NetworkEntity } from "./network-entity";
import { Transmissible } from "./transmissible";

/**
 * SimpleSink is a stupid NetworkEntity that just consumes whatever has been put in it.
 * This device has latency. So it takes before the contents are emptied.
 */
export class SimpleSink extends NetworkEntity {
  // Data that will be consumed when `latency` amount of ticks pass since `contents` was updated.
  contents?: Transmissible;

  // Number of ticks that need to pass since `contents` is updated for the data to be destroyed.
  latency: number;

  // Last time `contents` has been updated.
  updateTick?: number;

  constructor(latency: number) {
    super();

    this.latency = latency;
  }

  update(tick: number) {
    // No contents - no consumption.
    if (!this.contents || this.updateTick === undefined) {
      return;
    }

    // Check if proper amount of time has passed and consume `contents`.
    if (tick >= (this.updateTick + this.latency)) {
      this.contents = undefined;
      this.updateTick = undefined;
      console.debug('[SIMPLE_SINK] consumed a packet');
    }
  }

  store(data: Transmissible, tick: number): boolean {
    if (this.contents) {
      return false;
    }

    this.contents = data;
    this.updateTick = tick;

    return true;
  }

  getSinks(): NetworkEntity[] {
    return [];
  }

  getContent(): string {
    return this.contents?.toString() ?? 'empty';
  }
}
