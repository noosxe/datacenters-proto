import { Entity } from "./entity";
import { Transmissible } from "./transmissible";

export abstract class NetworkEntity extends Entity {
  abstract update(tick: number): void;
  abstract store(data: Transmissible, tick: number): boolean;
}
