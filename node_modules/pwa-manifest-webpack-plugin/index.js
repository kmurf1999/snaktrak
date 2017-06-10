var path = require('path');
var mime = require('mime');
var Jimp = require('jimp');

function PwaManifestWebpackPlugin(options) {
  this.options = Object.assign({
    filename: 'manifest.json',
    orientation: 'portrait',
    display: 'standalone',
    icons: [],
  }, options || {});

  const defaultIconSizes = [36, 48, 72, 96, 144, 192];
  if (typeof this.options.icon === 'string') {
    this.options.icon = {
      src: this.options.icon,
      sizes: defaultIconSizes
    };
  }
}

PwaManifestWebpackPlugin.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin('emit', function(compilation, callback) {
    if (self.options.icon) {
      self.genIcons(compiler, compilation, function() {
        self.createManifest(compilation);
        callback();
      });
    } else {
        self.createManifest(compilation);
        callback();
    }
  });
}

PwaManifestWebpackPlugin.prototype.createManifest= function(compilation) {
  var filename = this.options.filename;
  var contents = Object.assign({}, this.options);
  delete contents.filename;
  delete contents.icon;

  compilation.assets[filename] = {
    source: function() {
      return JSON.stringify(contents, null, 2);
    },
    size: function() {
      return JSON.stringify(contents).length;
    }
  }
}

PwaManifestWebpackPlugin.prototype.genIcons = function(compiler, compilation, callback) {
  var self = this;
  var sizes = this.options.icon.sizes.slice();
  var src = this.options.icon.src;
  var type = mime.lookup(src);
  var ext = mime.extension(type);
  var outputPath = compiler.options.output.path;

  if (src && Array.isArray(sizes) && !!sizes.length) {
    this.options.icons = [];

    Jimp.read(src).then(function(image) {
      sizes.forEach(function(size, index) {
        var filename = 'icon_' + size + 'x' + size + '.' + ext;
        self.options.icons.push({
          src: filename,
          sizes: size + 'x' + size,
          type: type,
        });

        image.resize(size, size)
          .getBuffer(type, function(err, buffer) {
            compilation.assets[filename] = {
              source: function() {
                return buffer;
              },
              size: function() {
                return buffer.length;
              }
            }

            if (index === sizes.length - 1) {
              callback();
            }
          });
      });
    });
  } else {
    callback();
  }
}

module.exports = PwaManifestWebpackPlugin;
