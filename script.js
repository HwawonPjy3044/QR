document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const qrcodeContainer = document.getElementById('qrcode');
    const qrHint = document.getElementById('qr-hint');
    const qrWrapper = document.querySelector('.qr-container');

    // Create a new QRCode instance but don't render yet
    const qrcode = new QRCode(qrcodeContainer, {
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    function generateQR() {
        const url = urlInput.value.trim();
        
        if (!url) {
            // Shake animation for error
            urlInput.style.transform = 'translateX(-10px)';
            setTimeout(() => urlInput.style.transform = 'translateX(10px)', 50);
            setTimeout(() => urlInput.style.transform = 'translateX(-10px)', 100);
            setTimeout(() => urlInput.style.transform = 'translateX(10px)', 150);
            setTimeout(() => urlInput.style.transform = 'translateX(0)', 200);
            
            urlInput.style.borderColor = '#ef4444';
            setTimeout(() => {
                urlInput.style.borderColor = '';
            }, 1000);
            return;
        }

        // Clear previous and generate new
        qrcode.clear();
        qrcode.makeCode(url);

        // Update UI
        qrcodeContainer.style.display = 'block';
        qrHint.classList.add('hidden');
        qrWrapper.classList.add('active');
        
        // Optional: Animate the QR code appearance
        qrcodeContainer.style.opacity = '0';
        qrcodeContainer.style.transform = 'scale(0.8)';
        setTimeout(() => {
            qrcodeContainer.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            qrcodeContainer.style.opacity = '1';
            qrcodeContainer.style.transform = 'scale(1)';
        }, 50);
    }

    generateBtn.addEventListener('click', generateQR);

    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateQR();
        }
    });
});
