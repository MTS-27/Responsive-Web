window.addEventListener('DOMContentLoaded', () => {

    /* --- Matrix Rain Animation --- */
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    // Set canvas size to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // Characters for the rain
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {
        // Semi-transparent black background for the "trail" effect
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0'; // Neon green text
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop to top randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Animation loop
    setInterval(drawMatrix, 50);

    // Handle Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    /* --- Typing Effect --- */
    const textToType = "> Initializing user profile... \n> Loading skills... \n> Access granted. \n\nI am a Full Stack Developer specializing in Cybersecurity. I build secure, resilient systems that stand the test of time and malice. My code is my shield.";
    const typingElement = document.getElementById('typing-text');
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < textToType.length) {
            const char = textToType.charAt(typeIndex);

            // Handle line breaks
            if (char === '\n') {
                typingElement.innerHTML += '<br>';
            } else {
                typingElement.innerHTML += char;
            }

            typeIndex++;
            setTimeout(typeWriter, Math.random() * 50 + 30); // Random typing speed
        }
    }

    // Start typing when the section is in view? Or just on load for now.
    // Let's use Intersection Observer for a cool effect.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (typeIndex === 0) { // Only type if not started
                    typeWriter();
                }
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.terminal-window'));

    /* --- Mobile Menu Toggle (Basic) --- */
    // Ideally we'd add this later if requested, but good to have prepared.
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    /* --- Contact Form Handling --- */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'ENCRYPTING & TRANSMITTING...';
            submitBtn.disabled = true;

            const formData = new FormData(this);
            // Replace with your actual email or use a service that supports this
            // Using FormSubmit.co for demo: https://formsubmit.co/your_email@example.com
            // IMPORTANT: The User needs to change this email to their own.
            const recipientEmail = "tahasethi@yahoo.com";

            fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    submitBtn.innerText = 'TRANSMISSION COMPLETE';
                    submitBtn.style.borderColor = 'var(--primary-color)';
                    submitBtn.style.background = 'rgba(0, 255, 65, 0.2)';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = 'transparent';
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    submitBtn.innerText = 'SIGNAL LOST. RETRY.';
                    submitBtn.style.borderColor = 'red';
                    setTimeout(() => {
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.style.borderColor = 'var(--primary-color)';
                    }, 3000);
                });
        });
    }
});
