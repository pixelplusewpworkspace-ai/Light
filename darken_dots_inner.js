const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replace Button 1
content = content.replace(
    /bg-\[\#cba35c\]\s+skeuo-card\s+color-btn\s+transition-transform\s+hover:scale-110\s+active:scale-95\s+border-4\s+border-white/g, 
    'bg-[#cba35c] color-btn transition-transform hover:scale-110 active:scale-95 shadow-[0_10px_25px_rgba(203,163,92,0.3)] border border-white/10'
);

// Replace Button 2
content = content.replace(
    /bg-\[\#ff3366\]\s+skeuo-card\s+color-btn\s+transition-transform\s+hover:scale-110\s+active:scale-95\s+border-4\s+border-white/g, 
    'bg-[#ff3366] color-btn transition-transform hover:scale-110 active:scale-95 shadow-[0_10px_25px_rgba(255,51,102,0.3)] border border-white/10'
);

// Replace Button 3
content = content.replace(
    /bg-\[\#33ccff\]\s+skeuo-card\s+color-btn\s+transition-transform\s+hover:scale-110\s+active:scale-95\s+border-4\s+border-white/g, 
    'bg-[#33ccff] color-btn transition-transform hover:scale-110 active:scale-95 shadow-[0_10px_25px_rgba(51,204,255,0.3)] border border-white/10'
);

// Replace Button 4
content = content.replace(
    /bg-\[\#8a2be2\]\s+skeuo-card\s+color-btn\s+transition-transform\s+hover:scale-110\s+active:scale-95\s+border-4\s+border-white/g, 
    'bg-[#8a2be2] color-btn transition-transform hover:scale-110 active:scale-95 shadow-[0_10px_25px_rgba(138,43,226,0.3)] border border-white/10'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Success: Replaced button layout');
