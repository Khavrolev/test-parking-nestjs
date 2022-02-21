export enum SpotType {
  small = 's',
  medium = 'm',
  large = 'l',
}

export const SPOT_SIZE = {
  [SpotType.small]: 1,
  [SpotType.medium]: 2,
  [SpotType.large]: 4,
};
