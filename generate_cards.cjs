const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const html = `
    <html>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
        <style>
            body { margin: 0; background: #000; }
            .card { 
                width: 600px; height: 800px; 
                background: linear-gradient(145deg, #161b2b, #0d111c); 
                border: 2px solid rgba(255,255,255,0.05); 
                border-radius: 40px; 
                color: #fff; 
                font-family: 'Space Grotesk', sans-serif; 
                display: flex; flex-direction: column; justify-content: center; align-items: center; 
                text-align: center; padding: 60px; box-sizing: border-box; 
            }
            .icon { font-size: 100px; margin-bottom: 50px; }
            .title { 
                font-size: 52px; font-weight: 700; line-height: 1.2; letter-spacing: -1px; 
                background: linear-gradient(90deg, #fff, #a1a1aa); 
                -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
            }
            .year { margin-top: 50px; font-size: 24px; color: #71717a; letter-spacing: 4px; font-weight: 500; }
        </style>
    </head>
    <body>
        <div class='card' id='c1'> <div class='icon'>🏆</div> <div class='title'>2nd Prize<br/>Wibeflowthon<br/>Hackathon</div> <div class='year'>2024</div> </div>
        <div class='card' id='c2'> <div class='icon'>🥈</div> <div class='title'>SDG 2nd Place<br/>HackFest<br/>Hackathon</div> <div class='year'>2026</div> </div>
        <div class='card' id='c3'> <div class='icon'>🥉</div> <div class='title'>3rd Prize<br/>Project Expo<br/>AI Model</div> <div class='year'>2023</div> </div>
        <div class='card' id='c4'> <div class='icon'>💻</div> <div class='title'>Full-Stack<br/>Web Developer<br/>Engineer</div> <div class='year'>PORTFOLIO</div> </div>
        <div class='card' id='c5'> <div class='icon'>🚀</div> <div class='title'>Creative<br/>Tech<br/>Developer</div> <div class='year'>PORTFOLIO</div> </div>
        <div class='card' id='c6'> <div class='icon'>🌟</div> <div class='title'>Open Source<br/>Enthusiast<br/>Contributor</div> <div class='year'>PORTFOLIO</div> </div>
    </body>
    </html>
    `;
    
    if (!fs.existsSync('public/awards')) fs.mkdirSync('public/awards');
    
    console.log("Launching Puppeteer...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    console.log("Rendering HTML...");
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    for (let i = 1; i <= 6; i++) {
        const el = await page.$('#c' + i);
        await el.screenshot({ path: 'public/awards/card' + i + '.png' });
        console.log('Generated card' + i + '.png');
    }
    
    await browser.close();
    console.log("All cards generated successfully!");
})();
