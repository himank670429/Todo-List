export function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r,g,b];
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
  
export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function darken(color1, amount){
    const [r1, g1, b1] = color1;
    return [
        Math.round(r1*(1-amount)), 
        Math.round(g1*(1-amount)),
        Math.round(b1*(1-amount))
    ]
}
  
