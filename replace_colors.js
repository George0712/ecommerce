const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (file.endsWith('.html') || file.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Reemplazar emerald por sand
            content = content.replace(/emerald-/g, 'sand-');
            content = content.replace(/text-emerald/g, 'text-sand');
            content = content.replace(/bg-emerald/g, 'bg-sand');
            content = content.replace(/ring-emerald/g, 'ring-sand');
            content = content.replace(/border-emerald/g, 'border-sand');
            content = content.replace(/decoration-emerald/g, 'decoration-sand');
            
            // Reemplazar zinc por charcoal
            content = content.replace(/zinc-/g, 'charcoal-');
            content = content.replace(/text-zinc/g, 'text-charcoal');
            content = content.replace(/bg-zinc/g, 'bg-charcoal');
            content = content.replace(/ring-zinc/g, 'ring-charcoal');
            content = content.replace(/border-zinc/g, 'border-charcoal');
            
            // Reemplazar rose por peach
            content = content.replace(/rose-/g, 'peach-');
            
            // Cambiar los colores harcodeados del CTA por temas pastel
            content = content.replace(/from-\[#FF0000\]/g, 'from-peach-500');
            content = content.replace(/to-\[#ff2056\]/g, 'to-peach-400');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDir(path.join(__dirname, 'src', 'app'));
