import * as migration_20261014_051019_initial from './20261014_051019_initial';
import * as migration_20261015_071612_seo_fields from './20261015_071612_seo_fields';
import * as migration_20261015_164121_og_size from './20261015_164121_og_size';
import * as migration_20261016_064414_logo_header from './20261016_064414_logo_header';
import * as migration_20261016_072034_photoswipe_toggle from './20261016_072034_photoswipe_toggle';

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
    name: '20261015_164121_og_size',
  },
  {
    up: migration_20261016_064414_logo_header.up,
    down: migration_20261016_064414_logo_header.down,
    name: '20261016_064414_logo_header',
  },
  {
    up: migration_20261016_072034_photoswipe_toggle.up,
    down: migration_20261016_072034_photoswipe_toggle.down,
    name: '20261016_072034_photoswipe_toggle'
  },
];
