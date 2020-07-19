import each from 'lodash/each'
import tinycolor from 'tinycolor2'


export const simpleCheckForValidColor = (data) => {
  const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v']
  let checked = 0
  let passed = 0
  each(keysToCheck, (letter) => {
    if (data[letter]) {
      checked += 1
      if (!isNaN(data[letter])) {
        passed += 1
      }
      if (letter === 's' || letter === 'l') {
        const percentPatt = /^\d+%$/
        if (percentPatt.test(data[letter])) {
          passed += 1
        }
      }
    }
  })
  return (checked === passed) ? data : false
};


export const toState = (data, oldHue) => {
  const color =  tinycolor(data);

  const hsl = color.toHsl();
  const hsv = color.toHsv();
  const rgb = color.toRgb();
  const hex = color.toHex();
  if (hsl.s === 0) {
    hsl.h = oldHue || 0
    hsv.h = oldHue || 0
  }
  const transparent = hex === '000000' && rgb.a === 0;

  console.log("hex', ',", hex)

  // console.log('!!hsl', hsl);

  return {
    hsl,
    hex: transparent ? 'transparent' : `#${ hex }`,
    rgb,
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
  }
}



export const isValidHex = (hex) => {
  // disable hex4 and hex8
  const lh = (String(hex).charAt(0) === '#') ? 1 : 0
  return hex.length !== (4 + lh) && hex.length < (7 + lh) && tinycolor(hex).isValid()
}


