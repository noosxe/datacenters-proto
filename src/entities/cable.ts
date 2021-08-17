import { NetworkEntity } from "./network-entity";
import { Transmissible } from "./transmissible";

/**
 * Cable is a basic transmission entity.
 * It's one way only.
 */
export class Cable extends NetworkEntity {
  // Data
  contents?: Transmissible;

  // The tick when contents were last updated
  storeTick?: number;

  sink?: NetworkEntity;

  // Number of ticks need to pass before the cable will try to pass the contents along.
  latency: number;

  constructor(latency: number) {
    super();

    this.latency = latency;
  }

  update(tick: number) {
    // Can't pass contents along if there is nothing to pass.
    if (!this.contents || this.storeTick === undefined) {
      return;
    }

    // Can't pass contents along if there is no sink to receive.
    if (!this.sink) {
      return;
    }

    // If contents are old enough then we can pass it along.
    if (tick >= (this.storeTick + this.latency)) {
      if (this.sink.store(this.contents, tick)) {
        this.contents = undefined;
        this.storeTick = undefined;
        console.debug('[CABLE] passed the packet');
      }
    }
  }

  store(data: Transmissible, tick: number): boolean {
    if (this.contents) {
      return false;
    }

    this.contents = data;
    this.storeTick = tick;

    return true;
  }

  getSinks(): NetworkEntity[] {
    return this.sink ? [this.sink] : [];
  }

  getContent(): string {
    return this.contents?.toString() ?? 'empty';
  }
}
