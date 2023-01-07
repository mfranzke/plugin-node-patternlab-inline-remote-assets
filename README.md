# Inline remote assets plugin for Pattern Lab Node

| :point_up:    | This is a fork from [plugin-node-patternlab-inline-remote-assets](https://github.com/mfranzke/plugin-node-patternlab-inline-remote-assets/) that is mainly meant to provide the functionality to inline _remote_ assets. |
|---------------|:------------------------|

[![npm](https://img.shields.io/npm/v/plugin-node-patternlab-inline-remote-assets.svg?maxAge=86400)](https://www.npmjs.com/package/plugin-node-patternlab-inline-remote-assets) 
[![npm](https://img.shields.io/npm/dt/plugin-node-patternlab-inline-remote-assets.svg?maxAge=86400)](https://www.npmjs.com/package/plugin-node-patternlab-inline-remote-assets) 
[![Buy Michael Worm a beer!](https://img.shields.io/badge/Buy%20Michael%20Worm%20a%20beer!-%F0%9F%8D%BA-yellow.svg)](https://www.paypal.me/Miw0)

> The remote inline assets plugin for [Pattern Lab Node](https://github.com/pattern-lab/patternlab-node) can be used to inline assets into your templates.

## Installation

Add the Inline Assets Plugin to your project using [npm](http://npmjs.com/):

    npm install --save plugin-node-patternlab-inline-remote-assets
 
After that tell Pattern Lab to install the plugin:

    gulp patternlab:installplugin --plugin=plugin-node-patternlab-inline-remote-assets
    
which will install and enable the plugin. You're now ready to use it.

## Usage

Use 3 curly brackets to tell handlebars to stop escaping, then call the inline plugin and pass a path to your asset.

    {{{inline-remote-asset 'https://img.shields.io/npm/v/plugin-node-patternlab-inline-remote-assets.svg'}}}
    
The remote asset will then be inlined into your template before compiling.

***

## Thanks

The inline remote assets plugin for [Pattern Lab Node](https://github.com/pattern-lab/patternlab-node) was created and is maintained by [Maximilian Franzke](https://github.com/mfranzke/). As mentioned above this is a fork from [plugin-node-patternlab-inline-remote-assets](https://github.com/mfranzke/plugin-node-patternlab-inline-remote-assets/) that is mainly meant to provide the functionality to inline _remote_ assets.