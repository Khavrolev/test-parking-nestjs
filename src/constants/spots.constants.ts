export enum SpotType {
  s = 's',
  m = 'm',
  l = 'l',
}

export const SPOTS_AMOUNT = {
  s: 10,
  m: 20,
  l: 6,
};

export const SPOT_SIZE = { [SpotType.s]: 1, [SpotType.m]: 2, [SpotType.l]: 4 };
