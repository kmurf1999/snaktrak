# pwa-manifest-webpack-plugin

generating `manifest.json` for pwa app

# use

```javascript
npm i pwa-manifest-webpack-plugin --save-dev
```

```
const PwaManifestWebpackPlugin = require('pwa-manifest-webpack-plugin');

plugins: [
  new PwaManifestWebpackPlugin({
    name: 'Todos',
    description: 'a todo demo of pwa',
    icon: {
      src: path.resolve('src/images/icon.jpg'),
      sizes: [36, 48]
    }
  })
]
```

output `manifest.json`:

```
{
  "orientation": "portrait",
  "display": "standalone",
  "icons": [
    {
      "src": "icon_48x48.jpeg",
      "sizes": "48x48",
      "type": "image/jpeg"
    },
    {
      "src": "icon_36x36.jpeg",
      "sizes": "36x36",
      "type": "image/jpeg"
    }
  ],
  "name": "Todos",
  "description": "a todo demo of pwa"
}
```
