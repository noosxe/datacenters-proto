import { Floor } from "./floor";

export class Room {
  floor: Floor[][];

  constructor(width: number, length: number) {
    this.floor = [];

    for (let i = 0; i < width; i++) {
      const row = [];

      for (let j = 0; j < length; j++) {
        row.push(new Floor());
      }

      this.floor.push(row);
    }
  }
}
