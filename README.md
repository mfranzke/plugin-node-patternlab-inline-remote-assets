# Inline remote assets plugin for Pattern Lab Node

| :point_up: | This is a fork from [plugin-node-patternlab-inline-assets](https://github.com/michaelworm/plugin-node-patternlab-inline-assets) that is mainly meant to provide the functionality to inline _remote_ assets. |
| ---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

[![npm](https://img.shields.io/npm/v/plugin-node-patternlab-inline-remote-assets.svg?maxAge=86400)](https://www.npmjs.com/package/plugin-node-patternlab-inline-remote-assets)
[![npm](https://img.shields.io/npm/dt/plugin-node-patternlab-inline-remote-assets.svg?maxAge=86400)](https://www.npmjs.com/package/plugin-node-patternlab-inline-remote-assets)
[![Buy Michael Worm a beer!](https://img.shields.io/badge/Buy%20Michael%20Worm%20a%20beer!-%F0%9F%8D%BA-yellow.svg)](https://www.paypal.me/Miw0)

> The remote inline assets plugin for [Pattern Lab Node](https://github.com/pattern-lab/patternlab-node) can be used to inline assets into your templates.

## Installation

Add the inline assets plugin to your project using [npm](http://npmjs.com/):

    npm install --save plugin-node-patternlab-inline-remote-assets

After that tell Pattern Lab to install the plugin:

    gulp patternlab:installplugin --plugin=plugin-node-patternlab-inline-remote-assets

which will install and enable the plugin. You're now ready to use it.

## Configuration

Post-installation, you will see the following in your `patternlab-config.json`:

```json
"plugins": {
  "plugin-node-patternlab-inline-remote-assets": {
    "enabled": true,
    "initialized": false,
    "options": {}
  }
}
```

Elsewhere please add the `plugin-node-patternlab-inline-remote-assets` entry manually to the `plugins` entry.

### Image formats to transform

Regarding the image formats that are determined by `content-type` header which would get inserted as a base64 encoded URL within transformed within an `<img>` HTML tag you could overwrite the internal list that we're providing with this plugin by the `assetsToTransformToImg` option like e.g. (with the defaults included within this example):

```json
"plugins": {
  "plugin-node-patternlab-inline-remote-assets": {
    "enabled": true,
    "initialized": false,
    "options": {
      "assetsToTransformToImg": [
        "image/apng",
        "image/avif",
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/svg+xml;charset=utf-8",
        "image/webp",
        "image/bmp",
        "image/x-icon",
        "image/tiff"
      ]
    }
  }
}
```

## Usage

Use three curly brackets to tell handlebars to stop escaping, then call the inline plugin and pass a path to your image.

    {{{inline-remote-asset 'https://img.shields.io/npm/v/plugin-node-patternlab-inline-remote-assets.svg'}}}

The remote image will then be inlined into your template before compiling.

### Differentiating in between images and other assets

All images contents would get base64 encoded and inserted as `<img width=… height=… alt="">` tags. Other filetypes are getting outputted sanitized by [dompurify](https://www.npmjs.com/package/dompurify) directly.

***

## Thanks

The inline remote assets plugin for [Pattern Lab Node](https://github.com/pattern-lab/patternlab-node) was created and is maintained by [Maximilian Franzke](https://github.com/mfranzke/). As mentioned above this is a fork from [plugin-node-patternlab-inline-assets](https://github.com/michaelworm/plugin-node-patternlab-inline-assets) that is mainly meant to provide the functionality to inline _remote_ assets.
```
