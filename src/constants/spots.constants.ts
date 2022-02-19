export const SPOTS_AMOUNT = {
  s: 3,
  m: 5,
  l: 3,
};

export enum SpotType {
  s = 's',
  m = 'm',
  l = 'l',
}

export const SPOT_SIZE = { [SpotType.s]: 1, [SpotType.m]: 2, [SpotType.l]: 4 };
