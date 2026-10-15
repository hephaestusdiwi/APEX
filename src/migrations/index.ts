import * as migration_20261014_051019_initial from './20261014_051019_initial';
import * as migration_20261015_071612_seo_fields from './20261015_071612_seo_fields';
import * as migration_20261015_164121_og_size from './20261015_164121_og_size';

export const migrations = [
  {
    up: migration_20261014_051019_initial.up,
    down: migration_20261014_051019_initial.down,
    name: '20261014_051019_initial',
  },
  {
    up: migration_20261015_071612_seo_fields.up,
    down: migration_20261015_071612_seo_fields.down,
    name: '20261015_071612_seo_fields',
  },
  {
    up: migration_20261015_164121_og_size.up,
    down: migration_20261015_164121_og_size.down,
    name: '20261015_164121_og_size'
  },
];
