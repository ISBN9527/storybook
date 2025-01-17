import path from 'path';
import type { PresetProperty } from '@storybook/core-common';
import type { StorybookConfig } from './types';

export const addons: PresetProperty<'addons', StorybookConfig> = [
  path.dirname(require.resolve(path.join('@storybook/preset-vue-webpack', 'package.json'))),
  path.dirname(require.resolve(path.join('@storybook/vue', 'package.json'))),
];

export const core: PresetProperty<'core', StorybookConfig> = async (config, options) => {
  const framework = await options.presets.apply<StorybookConfig['framework']>('framework');

  return {
    ...config,
    builder: {
      name: path.dirname(
        require.resolve(path.join('@storybook/builder-webpack5', 'package.json'))
      ) as '@storybook/builder-webpack5',
      options: typeof framework === 'string' ? {} : framework.options.builder || {},
    },
  };
};

export const typescript = async (
  config: StorybookConfig['typescript']
): Promise<StorybookConfig['typescript']> => {
  return {
    ...config,
    skipBabel: true,
  };
};
