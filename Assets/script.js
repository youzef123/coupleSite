     // Flower Animation
     document.addEventListener('DOMContentLoaded', function() {
        const flowerContainer = document.getElementById('flower-container');
        const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#FFC8DD', '#FFAFCC'];
        
        // Create multiple flowers
        for (let i = 0; i < 12; i++) {
            createFlower(
                Math.random() * 100, // x position percentage
                Math.random() * 100, // y position percentage
                Math.random() * 50 + 50, // Size
                colors[Math.floor(Math.random() * colors.length)], // Random color
                Math.random() * 20 - 10 // Random rotation
            );
        }
        
        // Function to create a flower
        function createFlower(xPos, yPos, size, color, rotation) {
            const flower = document.createElement('div');
            flower.classList.add('flower');
            flower.style.position = 'absolute';
            flower.style.left = `${xPos}%`;
            flower.style.top = `${yPos}%`;
            flower.style.transform = `rotate(${rotation}deg)`;
            
            // Create petals
            const petalCount = 8;
            for (let i = 0; i < petalCount; i++) {
                const petal = document.createElement('div');
                petal.classList.add('petal');
                petal.style.width = `${size}px`;
                petal.style.height = `${size * 1.5}px`;
                petal.style.borderRadius = `${size / 2}px ${size / 2}px 0 0`;
                petal.style.background = color;
                petal.style.transform = `rotate(${(i * (360 / petalCount))}deg)`;
                petal.style.transformOrigin = `bottom center`;
                petal.style.position = 'absolute';
                petal.style.bottom = '0';
                petal.style.left = `${-size / 2}px`;
                petal.style.filter = 'blur(3px)';
                
                // Add animation
                petal.style.animation = `petal-sway ${3 + Math.random() * 3}s ease-in-out infinite`;
                petal.style.animationDelay = `${Math.random() * 2}s`;
                
                flower.appendChild(petal);
            }
            
            // Create flower center
            const center = document.createElement('div');
            center.style.width = `${size / 2}px`;
            center.style.height = `${size / 2}px`;
            center.style.borderRadius = '50%';
            center.style.background = '#FFD700';
            center.style.position = 'absolute';
            center.style.top = '50%';
            center.style.left = '50%';
            center.style.transform = 'translate(-50%, -50%)';
            center.style.zIndex = '1';
            flower.appendChild(center);
            
            flowerContainer.appendChild(flower);
            
            // Add floating animation to the entire flower
            flower.style.animation = `float ${10 + Math.random() * 10}s ease-in-out infinite`;
            flower.style.animationDelay = `${Math.random() * 5}s`;
        }
        
        // Add keyframes for animations
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes petal-sway {
                0%, 100% { transform-origin: bottom center; transform: rotate(calc(var(--i) * ${360 / 8}deg)); }
                50% { transform-origin: bottom center; transform: rotate(calc(var(--i) * ${360 / 8}deg + 10deg)); }
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
                50% { transform: translateY(-20px) rotate(calc(var(--r, 0deg) + 5deg)); }
            }
        `;
        document.head.appendChild(style);
        
        // Animate background gradient
        const animateBackground = () => {
            const hue = (Date.now() / 100) % 360;
            flowerContainer.style.background = `linear-gradient(135deg, 
                hsl(${hue}, 100%, 75%), 
                hsl(${(hue + 60) % 360}, 100%, 75%))`;
            requestAnimationFrame(animateBackground);
        };
        
        animateBackground();
    });

    // Gallery filtering
    document.addEventListener('DOMContentLoaded', function() {
        const categories = document.querySelectorAll('.category');
        const items = document.querySelectorAll('.gallery-item');
        
        categories.forEach(category => {
            category.addEventListener('click', function() {
                // Remove active class from all categories
                categories.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked category
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter gallery items
                items.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });

    // Lightbox functionality
    document.addEventListener('DOMContentLoaded', function() {
        const lightbox = document.getElementById('lightbox');
        const lightboxContent = document.querySelector('.lightbox-content');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const lightboxClose = document.querySelector('.lightbox-close');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Get media (image or video)
                const media = this.querySelector('img') || this.querySelector('video');
                const mediaType = media.tagName.toLowerCase();
                const overlay = this.querySelector('.item-overlay');
                const title = overlay.querySelector('h3').textContent;
                const description = overlay.querySelector('p').textContent;
                
                // Clear previous content
                lightboxContent.innerHTML = '';
                
                // Create new media element for lightbox
                if (mediaType === 'img') {
                    const img = document.createElement('img');
                    img.src = media.src;
                    img.alt = media.alt;
                    lightboxContent.appendChild(img);
                } else if (mediaType === 'video') {
                    const video = document.createElement('video');
                    video.src = media.src;
                    video.controls = true;
                    video.autoplay = true;
                    lightboxContent.appendChild(video);
                }
                
                // Set caption
                lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
                
                // Show lightbox
                lightbox.classList.add('active');
            });
        });
        
        // Close lightbox
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
            // Pause video if playing
            const video = lightboxContent.querySelector('video');
            if (video) video.pause();
        });
        
        // Close lightbox on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                // Pause video if playing
                const video = lightboxContent.querySelector('video');
                if (video) video.pause();
            }
        });
    });