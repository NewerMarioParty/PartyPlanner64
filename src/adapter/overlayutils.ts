interface IShuffleSeedData {
  order: number[];
  bias: number[];
}

/** Fixed data for the shuffle algorithm used by the board overlays. */
export function getShuffleSeedData(n: number): IShuffleSeedData {
  switch (n) {
    case 8:
      return {
        order: [1, 2, 3, 0, 4, 5, 6, 7],
        bias: [0, 0, 0, 1, 1, 1, 1, 2],
      };

    case 7:
      return {
        order: [3, 5, 6, 0, 1, 2, 4],
        bias: [0, 0, 0, 1, 1, 1, 3],
      };

    case 6:
      return {
        order: [0, 1, 2, 3, 4, 5],
        bias: [0, 0, 0, 1, 1, 1],
      };

    case 5:
      return {
        order: [0, 1, 2, 3, 4],
        bias: [0, 0, 0, 1, 1],
      };

    case 4:
      return {
        order: [0, 1, 2, 3],
        bias: [0, 0, 0, 1],
      };

    case 3:
      return {
        order: [0, 1, 2],
        bias: [0, 0, 1],
      };

    case 2:
      return {
        order: [0, 1],
        bias: [0, 0],
      };

    case 0:
      return {
        order: [0],
        bias: [0],
      };
  }

  // Should never reach here, but whatever.
  return {
    order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    bias: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 6, 6, 6],
  };
}
