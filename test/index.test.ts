import { test, expect, describe, beforeAll } from 'vitest';
import Affine from '../src/index';

beforeAll(async () => {
  console.log(`[Affine]: start testing...`);
});

describe('translation', async () => {
  test('toArray', async () => {
    const t = Affine.translation(2, -5);
    expect(t).toBeInstanceOf(Affine);
    expect(t.toArray()).toEqual([
      1, 0, 2,
      0, 1, -5,
      0, 0, 1
    ]);
  });
});

describe('scale', async () => {
  test('single', async () => {
    const t = Affine.scale(5);
    expect(t).toBeInstanceOf(Affine);
    expect(t.toArray()).toEqual([
      5, 0, 0,
      0, 5, 0,
      0, 0, 1,
    ]);
  });

  test('two', async () => {
    const t = Affine.scale(-1, 2);
    expect(t).toBeInstanceOf(Affine);
    expect(t.toArray()).toEqual([
      -1, 0, 0,
      0, 2, 0,
      0, 0, 1
    ]);
  });
});

describe('multiply', async () => {
  test('translation * scale', async () => {
    const t = Affine.translation(-180, 90);
    const s = Affine.scale(360 / 256, -180 / 256);
    expect(t).toBeInstanceOf(Affine);
    expect(s).toBeInstanceOf(Affine);
    expect(t.multiply(s)).toEqual(new Affine(
      1.40625, 0, -180,
      0, -0.703125, 90,
      0, 0, 1,
    ));
  });
  test('multiply by identity', async () => {
    const t = new Affine(1, 2, 3, 4, 5, 6);
    expect(t).toBeInstanceOf(Affine);
    expect(t.multiply(Affine.identity()).toArray()).toEqual([
      1, 2, 3,
      4, 5, 6,
      0, 0, 1
    ]);
  });
});

describe('gdal', async () => {
  test('fromGdal', async () => {
    const t = Affine.fromGdal(3, 1, 2, 6, 4, 5);
    expect(t).toBeInstanceOf(Affine);
    expect(t.toArray()).toEqual(new Affine(
      1, 2, 3,
      4, 5, 6,
      0, 0, 1
    ).toArray());
  });

  test('toGdal', async () => {
    const t = new Affine(1, 2, 3, 4, 5, 6);
    expect(t).toBeInstanceOf(Affine);
    expect(t.toGdal()).toEqual([
      3, 1, 2,
      6, 4, 5,
    ]);
  });
});
