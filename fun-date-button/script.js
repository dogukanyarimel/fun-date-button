const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const heartsContainer = document.getElementById('hearts');

// Sayfa yüklendiğinde animasyonlar
window.addEventListener('load', function() {
    createStars();
    createParticles();
    animateTitle();
});

// Yıldızlar oluştur
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// Parçacıklar oluştur
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Başlık karakterlerini animasyonlu yap
function animateTitle() {
    const titleChars = document.querySelectorAll('.title-char');
    titleChars.forEach((char, index) => {
        char.style.setProperty('--i', index);
    });
}

// Hayır butonu kaçma özelliği - daha akıllı
let escapeCount = 0;
noBtn.addEventListener('mouseenter', function() {
    escapeCount++;
    const maxX = window.innerWidth - noBtn.offsetWidth - 50;
    const maxY = window.innerHeight - noBtn.offsetHeight - 50;
    
    // Her kaçışta daha hızlı ve daha uzak
    const speed = Math.min(escapeCount * 0.1, 0.5);
    const randomX = Math.max(50, Math.min(maxX, Math.random() * maxX));
    const randomY = Math.max(50, Math.min(maxY, Math.random() * maxY));
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = `all ${speed}s ease-out`;
    
    // Buton titreme efekti
    noBtn.style.animation = 'shake 0.5s';
});

// Titreme animasyonu
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

yesBtn.addEventListener('click', function() {
    const messages = [
        '⚡ Ka-chow! Harika! ⚡',
        '🚗 Yola çıkalım! 🚗',
        '💖 Mükemmel seçim! 💖',
        '⚡ Hız yapalım! ⚡',
        '🌟 Harika bir gün olacak! 🌟'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    message.textContent = randomMessage;
    message.style.color = '#FFD700';
    message.style.textShadow = '0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.8)';
    message.style.animation = 'bounceMessage 0.6s ease';
    
    // Konfeti efekti
    createConfetti();
    
    // Kalp efekti
    createHearts();
    
    // Yıldız efekti
    createStarsEffect();
    
    // Butonu devre dışı bırak
    yesBtn.disabled = true;
    yesBtn.style.opacity = '0.8';
    yesBtn.style.cursor = 'default';
});

// Mesaj bounce animasyonu
const bounceMessageStyle = document.createElement('style');
bounceMessageStyle.textContent += `
    @keyframes bounceMessage {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(bounceMessageStyle);

function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FFD700', '#FF1744', '#FFC107'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 15 + 8;
            
            confetti.style.position = 'fixed';
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.backgroundColor = color;
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'square') {
                confetti.style.borderRadius = '2px';
            } else {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.borderLeft = size/2 + 'px solid transparent';
                confetti.style.borderRight = size/2 + 'px solid transparent';
                confetti.style.borderBottom = size + 'px solid ' + color;
                confetti.style.backgroundColor = 'transparent';
            }
            
            const duration = Math.random() * 2 + 2;
            const delay = Math.random() * 0.5;
            confetti.style.animation = `fall ${duration}s ${delay}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }, i * 30);
    }
}

// Kalp efekti
function createHearts() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.fontSize = (Math.random() * 20 + 25) + 'px';
            heart.style.animationDelay = Math.random() * 0.5 + 's';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3500);
        }, i * 100);
    }
}

// Yıldız efekti
function createStarsEffect() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.textContent = '⭐';
            star.style.position = 'fixed';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.fontSize = (Math.random() * 15 + 20) + 'px';
            star.style.pointerEvents = 'none';
            star.style.zIndex = '9998';
            star.style.animation = 'starPop 1s ease-out forwards';
            star.style.filter = 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))';
            
            document.body.appendChild(star);
            
            setTimeout(() => {
                star.remove();
            }, 1000);
        }, i * 50);
    }
}

// Yıldız pop animasyonu
const starPopStyle = document.createElement('style');
starPopStyle.textContent += `
    @keyframes starPop {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(1) rotate(360deg);
        }
    }
`;
document.head.appendChild(starPopStyle);

// CSS animasyonu için dinamik stil ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

