const fs = require('fs');
const path = require('path');

const cssCachePath = 'C:\\Users\\Santhosh\\.gemini\\antigravity\\brain\\975a7690-1a53-4537-b8c6-e04ac01ac116\\.system_generated\\steps\\50\\content.md';
const jsCachePath = 'C:\\Users\\Santhosh\\.gemini\\antigravity\\brain\\975a7690-1a53-4537-b8c6-e04ac01ac116\\.system_generated\\steps\\52\\content.md';

const publicDistDir = path.join(__dirname, 'public', 'dist');

// Ensure output directories exist
if (!fs.existsSync(publicDistDir)) {
    fs.mkdirSync(publicDistDir, { recursive: true });
}

function cleanAndProcessFile(cachePath, outputPath, isJS) {
    console.log(`Reading cache file: ${cachePath}`);
    if (!fs.existsSync(cachePath)) {
        console.error(`Error: Cache file not found at ${cachePath}`);
        return false;
    }

    let fileContent = fs.readFileSync(cachePath, 'utf8');
    
    // Robustly strip markdown header using regex
    fileContent = fileContent.replace(/^[\s\S]*?---\s*/, '');
    
    // Trim leading whitespace
    fileContent = fileContent.trimStart();

    if (isJS) {
        console.log('Processing JavaScript replacements...');
        
        // --- JAVASCRIPT REPLACEMENTS ---
        const replacements = [
            // Title Text
            { search: '"SCROLL TO EXPLORE"', replace: '"ABOUT ME"' },
            
            // 3D scene narrative block 1 (Replace with degree/experience)
            { search: '"I don\'t build websites."', replace: '"B.E ECE @ PSNA College (2022-2026)"' },
            { search: '"I build experiences."', replace: '"CGPA: 7.91"' },
            { search: '"Not to impress,"', replace: '"Aspiring Full-Stack Developer"' },
            { search: '"but to make you feel something."', replace: '"passionate about building robust,"' },
            { search: '"Between control and chaos,"', replace: '"scalable web applications"' },
            { search: '"that\'s where I work."', replace: '"and digital experiences."' },
            
            // Replace CRAFT
            { search: '"C R A F T"', replace: '"S K I L L S"' },
            { search: '"CRAFT"', replace: '"SKILLS"' },
            
            // Replace Floating Brands with Skills
            { search: '"Kfc"', replace: '"JS"' },
            { search: '"Police"', replace: '"React"' },
            { search: '"Aperol"', replace: '"Node"' },
            { search: '"Antico Vinaio"', replace: '"HTML"' },
            { search: '"Doimo"', replace: '"CSS"' },
            { search: '"Isabl"', replace: '"C++"' },
            { search: '"Blizzard Tecnica"', replace: '"Python"' },
            { search: '"Pinarello"', replace: '"Git"' },
            
            // 3D scene narrative block 2 (Replace with projects/achievements)
            { search: '"Agencies rely on me"', replace: '"Featured Works:"' },
            { search: '"when the project matters most"', replace: '"- StudyMate (AI Companion)"' },
            { search: '"for the clients"', replace: '"- FoodFlow (Delivery App)"' },
            { search: '"that can\'t afford ordinary."', replace: '"- CloudSync (AWS Manager)"' },
            
            // Outro narrative
            { search: '"Step into it."', replace: '"Achievements:"' },
            { search: '"3x WOTD - CSSDA"', replace: '"2nd Prize Wibeflowthon Hackthon"' },
            { search: '"8x HM - Awwwards"', replace: '"SDG 2nd Place HackFest Hackthon"' },
            { search: '"Awwwards Jury Member"', replace: '"3rd Prize Project Expo"' },
            { search: '"ready when it matters."', replace: '"ready when you are."' }
        ];

        let count = 0;
        replacements.forEach(({ search, replace }) => {
            if (fileContent.includes(search)) {
                fileContent = fileContent.replaceAll(search, replace);
                console.log(`  Successfully replaced: [${search}] -> [${replace}]`);
                count++;
            } else {
                console.log(`  Warning: Could not find match to replace: [${search}]`);
            }
        });
        
        console.log(`Replacements complete. Replaced ${count} of ${replacements.length} items.`);
    } else {
        console.log('Processing CSS replacements (if any)...');
    }

    console.log(`Writing output to: ${outputPath}`);
    fs.writeFileSync(outputPath, fileContent, 'utf8');
    console.log(`File successfully written! Size: ${fileContent.length} characters.`);
    return true;
}

const cssResult = cleanAndProcessFile(cssCachePath, path.join(publicDistDir, 'bundle.css'), false);
const jsResult = cleanAndProcessFile(jsCachePath, path.join(publicDistDir, 'bundle.js'), true);

if (cssResult && jsResult) {
    console.log('Asset extraction and transformation completed successfully!');
} else {
    console.error('Asset extraction failed.');
}
