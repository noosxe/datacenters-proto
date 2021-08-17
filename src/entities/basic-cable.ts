import { Cable } from "./cable";

/**
 * Slowest cable ever.
 */
export class BasicCable extends Cable {
  constructor() {
    // 1 tick need to pass before the contents can be passed along.
    super(1);
  }
}
