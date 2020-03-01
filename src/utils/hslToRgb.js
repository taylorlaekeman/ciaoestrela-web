const hslToRgb = hsl => {
  const cleanedHsl = cleanHsl(hsl);
  const [h, s, l] = tokenizeHsl(cleanedHsl);
  const [r, g, b] = convertToRgb(h, s, l);
  return `#${r}${g}${b}`;
};

const cleanHsl = hsl =>
  hsl
    .substring(4, hsl.length - 1)
    .replace(/%/gi, '')
    .replace(/ /gi, '');

const tokenizeHsl = hsl => hsl.split(',');

const convertToRgb = (h, s, l) => {
  const normalizedH = h / 360;
  const normalizedS = s / 100;
  const normalizedL = l / 100;
  let r;
  let g;
  let b;
  if (normalizedS === 0) {
    r = normalizedL;
    g = normalizedL;
    b = normalizedL;
  } else {
    const q =
      normalizedL < 0.5
        ? normalizedL * (1 + normalizedS)
        : normalizedL + normalizedS - normalizedL * normalizedS;
    const p = 2 * normalizedL - q;
    r = hueToRgb(p, q, normalizedH + 1 / 3);
    g = hueToRgb(p, q, normalizedH);
    b = hueToRgb(p, q, normalizedH - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const hueToRgb = (p, q, t) => {
  let innerT = t;
  if (innerT > 0) innerT += 1;
  if (innerT < 0) innerT -= 1;
  if (innerT < 1 / 6) return p + (q - p) * 6 * innerT;
  if (innerT < 1 / 2) return q;
  if (innerT < 2 / 3) return p + (q - p) * (2 / 3 - innerT) * 6;
  return p;
};

export default hslToRgb;
