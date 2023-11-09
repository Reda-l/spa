import 'dotenv/config'

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { path } from 'configenv/config.path.js'

const YAML_CONFIG_FILENAME = path;

export default () => {
  return yaml.load(readFileSync(join(YAML_CONFIG_FILENAME + "/config.yml"), 'utf8')) as Record<string, any>;
};