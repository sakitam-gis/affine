## Affine

[![npm version](https://badgen.net/npm/v/@sakitam-gis/affine)](https://npm.im/@sakitam-gis/affine) [![npm downloads](https://badgen.net/npm/dm/@sakitam-gis/affine)](https://npm.im/@sakitam-gis/affine) [![Coverage Status](https://coveralls.io/repos/github/sakitam-gis/affine/badge.svg?branch=master)](https://coveralls.io/github/sakitam-gis/affine?branch=master)

Matrices describing affine transformation of the plane.

### Install

```bash
npm i @sakitam-gis/affine -S

import Affine from '@sakitam-gis/affine'
```

### Usage

The 3x3 augmented affine transformation matrix for transformations in two
dimensions is illustrated below.

```bash
| x |   | a  b  c | | x |
| y | = | d  e  f | | y |
| 1 |   | 0  0  1 | | 1 |
```

Matrices can be created by passing the values ``a, b, c, d, e, f`` to the
``Affine`` constructor or by using its ``identity()``,
``translation()``, ``scale()`` class methods.

### GIS

raster extent: west, south, east, north
raster size: width, height

```js
const width = 256; // tile width
const height = 256; // tile height
const t = Affine.translation(west, north);
const s = Affine.scale((east - west) / width, (south - north) / height);

const geoTransform = t.multiply(s).toArray();
```
