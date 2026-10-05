import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generates warm, aesthetic, romantic sample image SVGs saved as kb_hero.jpg, kb1.jpg...kb8.jpg
const samples = [
  {
    name: 'kb_hero.jpg',
    title: 'KB',
    subtitle: 'My Favorite Person',
    bg1: '#7A1C30',
    bg2: '#5C4033',
    accent: '#E5C158',
    icon: '✨'
  },
  {
    name: 'kb1.jpg',
    title: 'That Beautiful Smile',
    subtitle: 'A moment worth remembering ❤️',
    bg1: '#F4C2C2',
    bg2: '#7A1C30',
    accent: '#FFF',
    icon: '💖'
  },
  {
    name: 'kb2.jpg',
    title: 'Ordinary Moments Made Special',
    subtitle: 'Our favorite coffee spot ☕',
    bg1: '#5C4033',
    bg2: '#3D281C',
    accent: '#E5C158',
    icon: '🌸'
  },
  {
    name: 'kb3.jpg',
    title: 'Late Night Laughs',
    subtitle: 'Under the starlit sky 💫',
    bg1: '#2C1820',
    bg2: '#7A1C30',
    accent: '#FFD700',
    icon: '✨'
  },
  {
    name: 'kb4.jpg',
    title: 'Simply You',
    subtitle: 'Pure magic & grace ✨',
    bg1: '#E8A598',
    bg2: '#8C2D42',
    accent: '#FFF',
    icon: '🌹'
  },
  {
    name: 'kb5.jpg',
    title: 'Golden Hour Memories',
    subtitle: 'Sunlight in your eyes ☀️',
    bg1: '#D4AF37',
    bg2: '#7A1C30',
    accent: '#FFF',
    icon: '☀️'
  },
  {
    name: 'kb6.jpg',
    title: 'Forever Favorite',
    subtitle: 'One of my favorite memories ❤️',
    bg1: '#7A1C30',
    bg2: '#4A3525',
    accent: '#E5C158',
    icon: '💌'
  },
  {
    name: 'kb7.jpg',
    title: 'A Little Adventure',
    subtitle: 'Exploring the world together 🌿',
    bg1: '#6E473B',
    bg2: '#A05C55',
    accent: '#FFF',
    icon: '🌿'
  },
  {
    name: 'kb8.jpg',
    title: 'Warm & Cozy Days',
    subtitle: 'Holding hands & smiling 🥰',
    bg1: '#F8E8EE',
    bg2: '#7A1C30',
    accent: '#5C4033',
    icon: '☕'
  }
];

function createSvgImage(data) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${data.bg1}" />
      <stop offset="100%" stop-color="${data.bg2}" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${data.accent}" stop-opacity="0.4" />
      <stop offset="100%" stop-color="${data.accent}" stop-opacity="0" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="1000" fill="url(#bg)" />
  <rect width="800" height="1000" fill="url(#glow)" />
  
  <!-- Decorative Frame -->
  <rect x="40" y="40" width="720" height="920" rx="24" fill="none" stroke="${data.accent}" stroke-opacity="0.5" stroke-width="3" stroke-dasharray="12 8"/>
  <rect x="55" y="55" width="690" height="890" rx="16" fill="none" stroke="${data.accent}" stroke-opacity="0.3" stroke-width="1"/>

  <!-- Corner Flourishes -->
  <circle cx="70" cy="70" r="10" fill="${data.accent}" opacity="0.6"/>
  <circle cx="730" cy="70" r="10" fill="${data.accent}" opacity="0.6"/>
  <circle cx="70" cy="930" r="10" fill="${data.accent}" opacity="0.6"/>
  <circle cx="730" cy="930" r="10" fill="${data.accent}" opacity="0.6"/>

  <!-- Aesthetic Portrait Silhouette Artwork -->
  <g transform="translate(400, 420)" filter="url(#shadow)">
    <!-- Outer aura -->
    <circle cx="0" cy="-40" r="160" fill="${data.accent}" opacity="0.25"/>
    <circle cx="0" cy="-40" r="130" fill="#FFF" opacity="0.15"/>
    
    <!-- Heart & Icon -->
    <path d="M 0 -110 C -40 -170 -120 -120 -120 -50 C -120 20 0 100 0 100 C 0 100 120 20 120 -50 C 120 -120 40 -170 0 -110 Z" fill="${data.accent}" opacity="0.85"/>
    <text x="0" y="-30" font-family="'Segoe UI Emoji', sans-serif" font-size="70" text-anchor="middle" fill="#FFF">${data.icon}</text>
  </g>

  <!-- Sparkles -->
  <text x="160" y="240" font-size="30" fill="${data.accent}" opacity="0.8">✨</text>
  <text x="640" y="280" font-size="24" fill="${data.accent}" opacity="0.7">💖</text>
  <text x="140" y="760" font-size="28" fill="${data.accent}" opacity="0.8">🌸</text>
  <text x="650" y="720" font-size="32" fill="${data.accent}" opacity="0.7">✨</text>

  <!-- Text Content -->
  <text x="400" y="680" font-family="'Georgia', 'Playfair Display', serif" font-size="44" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
    ${data.title}
  </text>
  <text x="400" y="735" font-family="'Georgia', serif" font-size="24" font-style="italic" fill="${data.accent}" text-anchor="middle">
    ${data.subtitle}
  </text>
  
  <rect x="250" y="780" width="300" height="2" fill="${data.accent}" opacity="0.5"/>
  <text x="400" y="840" font-family="'Courier New', monospace" font-size="18" fill="#FFFFFF" opacity="0.8" text-anchor="middle">
    [ Replace with KB's photo in images/${data.name} ]
  </text>
</svg>`;
}

for (const item of samples) {
  const filePath = path.join(imagesDir, item.name);
  fs.writeFileSync(filePath, createSvgImage(item));
  console.log(`Created ${item.name}`);
}
console.log('All sample images created successfully!');
