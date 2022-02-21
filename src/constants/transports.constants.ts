export enum TransportType {
  motocycle = 'm',
  car = 'c',
  bus = 'b',
}

export const TRANSPORT_SIZE = {
  [TransportType.motocycle]: 1,
  [TransportType.car]: 2,
  [TransportType.bus]: 4,
};
