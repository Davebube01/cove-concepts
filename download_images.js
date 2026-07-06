const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  // Process
  { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop", path: "public/images/process/discovery.jpg" },
  { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop", path: "public/images/process/strategy.jpg" },
  { url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop", path: "public/images/process/creation.jpg" },
  { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", path: "public/images/process/execution.jpg" },
  { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", path: "public/images/process/optimization.jpg" },
  { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop", path: "public/images/process/scaling.jpg" },
  // Services
  { url: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=300&auto=format&fit=crop", path: "public/images/services/creative.jpg" },
  { url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=300&auto=format&fit=crop", path: "public/images/services/uiux.jpg" },
  { url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=300&auto=format&fit=crop", path: "public/images/services/branding.jpg" },
  { url: "https://images.unsplash.com/photo-1574717024453-354056fad2e2?q=80&w=300&auto=format&fit=crop", path: "public/images/services/video.jpg" },
  { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=300&auto=format&fit=crop", path: "public/images/services/motion.jpg" },
  { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=300&auto=format&fit=crop", path: "public/images/services/marketing.jpg" },
  // Testimonials
  { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop", path: "public/images/testimonials/1.jpg" },
  { url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop", path: "public/images/testimonials/2.jpg" },
  { url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop", path: "public/images/testimonials/3.jpg" },
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function main() {
  for (const img of images) {
    console.log(`Downloading ${img.path}...`);
    try {
      await download(img.url, path.join(__dirname, img.path));
      console.log(`Successfully downloaded ${img.path}`);
    } catch (err) {
      console.error(`Failed to download ${img.url}:`, err);
    }
  }
  console.log("Done!");
}

main();
