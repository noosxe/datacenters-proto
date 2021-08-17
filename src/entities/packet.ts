import { Transmissible } from "./transmissible";
import { PacketType } from "./packet-type";

export class Packet extends Transmissible {
  type: PacketType;

  /**
   * Create a Packet
   * @param tick The initial when this Packet was created.
   * @param expiration Number of ticks that this Packet will expire in.
   */
  constructor(type: PacketType, tick: number, expiration: number) {
    super(tick, expiration);
    this.type = type;
  }

  toString(): string {
    return `Packet of type ${this.type}`
  }
}
