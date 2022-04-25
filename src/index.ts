class Affine {
  private readonly a: number;
  private readonly b: number;
  private readonly c: number;
  private readonly d: number;
  private readonly e: number;
  private readonly f: number;
  private readonly g: number;
  private readonly h: number;
  private readonly i: number;

  public static fromGdal(c: number, a: number, b: number, f: number, d: number, e: number) {
    return new Affine(a, b, c, d, e, f, 0.0, 0.0, 1.0);
  }

  public static identity() {
    return new Affine(
      1, 0, 0,
      0, 1, 0
    );
  }

  public static translation (xoff: number, yoff: number) {
    return new Affine(
      1.0, 0.0, xoff,
      0.0, 1.0, yoff,
      0.0, 0.0, 1.0,
      );
  }

  public static scale (...scaling: number[]) {
    let sx = 1;
    let sy = 1;
    if (scaling.length === 1) {
      sx = sy = scaling[0];
    } else {
      sx = scaling[0];
      sy = scaling[1];
    }
    return new Affine(
      sx, 0.0, 0.0,
      0.0, sy, 0.0,
      0.0, 0.0, 1.0,
    );
  }

  constructor(a: number, b: number, c: number, d: number, e: number, f: number, g = 0.0, h = 0.0, i = 1.0) {
    // a, b, c, d, e, f : number
    // Coefficients of an augmented affine transformation matrix
    // | x' |   | a  b  c | | x |
    // | y' | = | d  e  f | | y |
    // | 1  |   | 0  0  1 | | 1 |
    // `a`, `b`, and `c` are the elements of the first row of the
    // matrix. `d`, `e`, and `f` are the elements of the second row.

    // a, b, c, d, e, f, g, h, i : number
    // The coefficients of the 3x3 augumented affine transformation
    // matrix
    // | x' |   | a  b  c | | x |
    // | y' | = | d  e  f | | y |
    // | 1  |   | g  h  i | | 1 |
    // `g`, `h`, and `i` are always 0, 0, and 1.

    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    this.g = g;
    this.h = h;
    this.i = i;
  }

  multiply(a: Affine) {
    const [sa, sb, sc, sd, se, sf, _1, _2, _3] = this.toArray();
    const [oa, ob, oc, od, oe, of, _4, _5, _6] = a.toArray();
    return new Affine(
      // sa * oa + sb * od, sa * ob + sb * oe, sa * oc + sb * of + sc,
      // sd * oa + se * od, sd * ob + se * oe, sd * oc + se * of + sf,
      sa * oc + sb * of + sc,
      sa * oa + sb * od,
      sa * ob + sb * oe,

      sd * oc + se * of + sf,
      sd * oa + se * od,
      sd * ob + se * oe,
      0.0, 0.0, 1.0,
    )
  }

  toArray() {
    return [
      this.a, this.b, this.c,
      this.d, this.e, this.f,
      this.g, this.h, this.i,
    ];
  }
}

export default Affine;
