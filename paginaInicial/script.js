// Aguarda o carregamento completo do conteúdo da página para executar o script
document.addEventListener('DOMContentLoaded', function() {
    
    // Efeito de digitação
    const typingTextElement = document.getElementById('typing-text');
    const textToType = "Olá, eu sou Thiago Coelho"; 
    let charIndex = 0;

    if (typingTextElement) {
        function type() {
            if (charIndex < textToType.length) {
                typingTextElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 150);
            }
        }
        type();
    }

    // Animação scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Carrosel
    const carousel = document.querySelector('.certificados-grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (carousel && prevBtn && nextBtn) {
        let cardWidth = 0;
        let scrollPosition = 0;
        const carouselWrapper = document.querySelector('.certificados-wrapper');

        // Function to calculate the width of a card + gap
        function calculateCardWidth() {
            const firstCard = carousel.querySelector('.certificado-card');
            if (firstCard) {
                const gap = parseFloat(window.getComputedStyle(carousel).gap);
                cardWidth = firstCard.offsetWidth + gap;
            }
        }

        // Calculate width on load and resize
        calculateCardWidth();
        window.addEventListener('resize', () => {
            calculateCardWidth();
            updateButtonState(); // Recalculate button state on resize
        });

        // Event listener for the next button
        nextBtn.addEventListener('click', () => {
            const carouselWidth = carousel.scrollWidth;
            const visibleWidth = carouselWrapper.offsetWidth;
            
            if (scrollPosition < (carouselWidth - visibleWidth)) {
                scrollPosition += cardWidth;
            }
            
            if (scrollPosition > (carouselWidth - visibleWidth)) {
                scrollPosition = carouselWidth - visibleWidth;
            }

            carousel.style.transform = `translateX(-${scrollPosition}px)`;
            updateButtonState();
        });

        prevBtn.addEventListener('click', () => {
            if (scrollPosition > 0) {
                scrollPosition -= cardWidth;
            }
            
            // Clamp the value to not go below 0
            if (scrollPosition < 0) {
                scrollPosition = 0;
            }

            carousel.style.transform = `translateX(-${scrollPosition}px)`;
            updateButtonState();
        });

        function updateButtonState() {
            const carouselWidth = carousel.scrollWidth;
            const visibleWidth = carouselWrapper.offsetWidth;

            prevBtn.disabled = scrollPosition <= 0;
            nextBtn.disabled = scrollPosition >= (carouselWidth - visibleWidth - 1);
        }

        // Initial button state check
        updateButtonState();
    }

    // Modal de imagem
    const modal = document.getElementById('image-modal');
    if (modal) {
        const modalImg = document.getElementById('modal-image');
        const certificateImages = document.querySelectorAll('.certificado-card img');
        const closeModalBtn = document.querySelector('.close-modal');

        certificateImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "flex"; // Usa flex para alinhar o conteúdo
                modalImg.src = this.src;
                modalImg.alt = this.alt;
            });
        });

        // Função para fechar o modal
        function closeImageModal() {
            modal.style.display = "none";
        }

        // Fecha o modal ao clicar no botão 'X'
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeImageModal);
        }

        // Fecha o modal ao clicar fora da imagem (no fundo do modal)
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeImageModal();
            }
        });
    }

    // Botão "Voltar ao Topo"
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        // Mostra ou oculta o botão com base na posição da rolagem
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Mostra o botão após 300px de scroll
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Adiciona o evento de clique para rolagem suave
        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link de pular para o topo
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Define a animação de rolagem como suave
            });
        });
    }

    // Acessibilidade
    const accessibilityButton = document.getElementById('accessibility-button');
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const closeAccessibilityButton = document.getElementById('close-accessibility');

    if (accessibilityButton && accessibilityPanel && closeAccessibilityButton) {
        accessibilityButton.addEventListener('click', () => {
            const isPanelVisible = accessibilityPanel.style.display === 'block';
            accessibilityPanel.style.display = isPanelVisible ? 'none' : 'block';
        });

        closeAccessibilityButton.addEventListener('click', () => {
            accessibilityPanel.style.display = 'none';
        });

        const htmlEl = document.documentElement;
        const bodyEl = document.body;
        
        let currentFontSize = parseFloat(window.getComputedStyle(htmlEl).fontSize);

        // Controle de tamanho da fonte
        document.getElementById('increase-font').addEventListener('click', () => {
            if (currentFontSize < 24) { // Set a maximum size
                currentFontSize += 1;
                htmlEl.style.fontSize = `${currentFontSize}px`;
            }
        });

        document.getElementById('decrease-font').addEventListener('click', () => {
            if (currentFontSize > 10) { // Set a minimum size
                currentFontSize -= 1;
                htmlEl.style.fontSize = `${currentFontSize}px`;
            }
        });

        // Controle de estilo fonte
        document.getElementById('font-default').addEventListener('click', () => {
            bodyEl.classList.remove('font-sans-serif', 'font-serif');
        });

        document.getElementById('font-sans-serif').addEventListener('click', () => {
            bodyEl.classList.remove('font-serif');
            bodyEl.classList.add('font-sans-serif');
        });

        document.getElementById('font-serif').addEventListener('click', () => {
            bodyEl.classList.remove('font-sans-serif');
            bodyEl.classList.add('font-serif');
        });

        // Controle de cor
        document.getElementById('color-default').addEventListener('click', () => {
            htmlEl.classList.remove('grayscale', 'faded', 'intense');
        });

        document.getElementById('color-grayscale').addEventListener('click', () => {
            htmlEl.classList.remove('faded', 'intense');
            htmlEl.classList.add('grayscale');
        });

        document.getElementById('color-faded').addEventListener('click', () => {
            htmlEl.classList.remove('grayscale', 'intense');
            htmlEl.classList.add('faded');
        });

        document.getElementById('color-intense').addEventListener('click', () => {
            htmlEl.classList.remove('grayscale', 'faded');
            htmlEl.classList.add('intense');
        });
    }
});
