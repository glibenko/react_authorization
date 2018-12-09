const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
    },
  ],
  '@babel/preset-react',
  // '@babel/preset-env',
  // 'babel-preset-flow',
  '@babel/preset-flow',
];

const plugins = [
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-optional-chaining',
];

module.exports = { presets, plugins };
