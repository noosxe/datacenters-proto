export abstract class Transmissible {
  initialTick: number;
  expiration: number;

  /**
   * Create a Transmissible
   * @param tick The initial when this Transmissible was created.
   * @param expiration Number of ticks that this Transmissible will expire in.
   */
  constructor(tick: number, expiration: number) {
    this.initialTick = tick;
    this.expiration = expiration;
  }
}
