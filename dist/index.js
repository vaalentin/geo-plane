"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPlaneGeometry;
/**
 * @function getPlaneGeometry
 * @param {float} [w = 1]
 * @param {float} [h = 1]
 * @param {uint} [dx = 1]
 * @param {uint} [dy = 1]
 * @returns {[name:string]:any}
 */
function getPlaneGeometry() {
  var w = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
  var h = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
  var dx = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
  var dy = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

  dx = Math.floor(dx);
  dy = Math.floor(dy);

  var dx1 = dx + 1;
  var dy1 = dy + 1;

  var hw = w / 2;
  var hh = h / 2;

  var sx = w / dx;
  var sy = h / dy;

  var verts = new Float32Array(dx1 * dy1 * 3);
  var uvs = new Float32Array(dx1 * dy1 * 2);

  var vertsOffset = 0;
  var uvsOffset = 0;

  for (var iy = 0; iy < dy1; ++iy) {
    var y = iy * sy - hh;

    for (var ix = 0; ix < dx1; ++ix) {
      var x = ix * sx - hw;

      verts[vertsOffset] = x;
      verts[vertsOffset + 1] = y;
      verts[vertsOffset + 2] = 0;

      uvs[uvsOffset] = ix / dx;
      uvs[uvsOffset + 1] = 1 - iy / dy;

      vertsOffset += 3;
      uvsOffset += 2;
    }
  }

  var faces = verts.length / 3 > 65535 ? new Uint32Array(dx * dy * 6) : new Uint16Array(dx * dy * 6);

  var facesOffset = 0;

  for (var iy = 0; iy < dy; ++iy) {
    for (var ix = 0; ix < dx; ++ix) {
      var a = ix + dx1 * iy;
      var b = ix + dx1 * (iy + 1);
      var c = ix + 1 + dx1 * (iy + 1);
      var d = ix + 1 + dx1 * iy;

      faces[facesOffset] = a;
      faces[facesOffset + 1] = b;
      faces[facesOffset + 2] = d;

      faces[facesOffset + 3] = b;
      faces[facesOffset + 4] = c;
      faces[facesOffset + 5] = d;

      facesOffset += 6;
    }
  }

  return { verts: verts, uvs: uvs, faces: faces };
}
