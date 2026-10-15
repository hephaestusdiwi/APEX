import * as migration_20261014_051019_initial from './20261014_051019_initial';

export const migrations = [
  {
    up: migration_20261014_051019_initial.up,
    down: migration_20261014_051019_initial.down,
    name: '20261014_051019_initial'
  },
];
