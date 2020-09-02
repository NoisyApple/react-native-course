export function getContrastColor(hexCode) {
  let hex = hexCode.replace('#', '');
  let rgb = [];
  let finalForeground;

  if (hex.length === 3) {
    rgb.push(parseInt(hex[0] + hex[0], 16));
    rgb.push(parseInt(hex[1] + hex[1], 16));
    rgb.push(parseInt(hex[2] + hex[2], 16));
  } else {
    rgb.push(parseInt(hex.substr(0, 2), 16));
    rgb.push(parseInt(hex.substr(2, 2), 16));
    rgb.push(parseInt(hex.substr(4, 2), 16));
  }

  for (let color = 0; color < rgb.length; color++) {
    let c = rgb[color];
    c /= 255;

    if (c <= 0.03928) {
      c /= 12.92;
    } else {
      c = ((c + 0.055) / 1.055) ** 2.4;
    }

    rgb[color] = c;
  }

  let [r, g, b] = rgb;

  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  if ((L + 0.05) / (0.0 + 0.05) > (1.0 + 0.05) / (L + 0.05)) {
    finalForeground = '#000';
  } else {
    finalForeground = '#fff';
  }

  return finalForeground;
}

export default { getContrastColor };
