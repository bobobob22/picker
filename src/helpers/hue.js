export const calculateChange = (e, direction, hsl, container ) => {

  const containerWidth = container.clientWidth;
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  const left = x - (container.getBoundingClientRect().left + window.pageXOffset);

    let h;
    if (left < 0) {
      h = 0
    } else if (left > containerWidth) {
      h = 359
    } else {
      const percent = (left * 100) / containerWidth
      h = ((360 * percent) / 100)
    }
    //
    // console.log('hsl', hsl)
    // console.log('h', h)
  console.log("HHH', h", h)

    if (hsl.h !== h) {

      const hexColor = hslToHex((hsl.h).toFixed(), (hsl.s).toFixed(), (hsl.l).toFixed())
      const rgbColor = hsl2rgb((hsl.h).toFixed(), (hsl.s).toFixed(), (hsl.l).toFixed())


      // console.log('hexColor', hexColor)

      return {
        h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: 'hsl',
      }
    }
  return null
}


function hsl2rgb(h,s,l)
{
  let a=s*Math.min(l,1-l);
  let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
  return [f(0),f(8),f(4)];
}


function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
