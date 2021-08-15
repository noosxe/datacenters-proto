import { NetworkEntity } from "./network-entity";
import { Packet } from "./packet";
import { PacketType } from "./packet-type";

// Amount of ticks that all packets generated by this PacketGenerator will expire after.
const PACKET_EXPIRATION_TICKS = 500;

/**
 * PacketGenerator is a NetworkEntity that generates packets with given latency.
 * It needs a sink to send the packets to.
 */
export class PacketGenerator extends NetworkEntity {
  // The entity where generated packets will be sent.
  sink?: NetworkEntity;

  // Number of ticks the generator will skip before creating the next packet.
  latency: number;

  // Last time the generator successfully created a packet.
  lastTick?: number;

  constructor(latency: number, sink?: NetworkEntity) {
    super();

    this.latency = latency;
    this.sink = sink;
  }

  update(tick: number) {
    // Can't generate if there is no sink.
    if (!this.sink) {
      return;
    }

    // If this is the first time this generates a packet or the time has come then try to generate.
    if (this.lastTick === undefined || tick >= (this.lastTick + this.latency)) {
      const packet = new Packet(PacketType.HEAD, tick, PACKET_EXPIRATION_TICKS);
      console.log('[PACKET_GENERATOR] generated a packet');

      // Try to pass the new packet to the sink.
      if (this.sink.store(packet, tick)) {
        this.lastTick = tick;
        console.log('[PACKET_GENERATOR] sent the packet');
      } else {
        console.log('[PACKET_GENERATOR] failed to send the packet');
      }
    }
  }

  store() {
    // PacketGenerators can't receive anything.
    return false;
  }
}
