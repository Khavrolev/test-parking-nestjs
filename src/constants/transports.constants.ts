export enum TransportType {
  m = 'm',
  c = 'c',
  b = 'b',
}

export const TRANSPORT_SIZE = {
  [TransportType.m]: 1,
  [TransportType.c]: 2,
  [TransportType.b]: 4,
};
