// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. Event Handling
    
    // Button click
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked!";
        clickOutput.style.color = "#27ae60";
        this.textContent = "Clicked!";
        setTimeout(() => {
            this.textContent = "Click Me Again!";
        }, 1000);
    });
    
    // Hover effects
    const hoverBox = document.querySelector('.hover-box');
    
    // Keypress detection
    const keypressDisplay = document.getElementById('keypress-display');
    const keypressInput = document.getElementById('keypress-input');
    
    document.addEventListener('keydown', function(e) {
        keypressDisplay.textContent = `Key pressed: ${e.key} (Code: ${e.code})`;
        keypressDisplay.classList.add('keypress-animation');
        setTimeout(() => {
            keypressDisplay.classList.remove('keypress-animation');
        }, 300);
    });
    
    // Secret action (double click or long press)
    const secretBox = document.querySelector('.secret-box');
    let longPressTimer;
    
    secretBox.addEventListener('dblclick', revealSecret);
    
    secretBox.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(revealSecret, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });
    
    function revealSecret() {
        secretBox.textContent = "Congratulations! You found the secret! 🎉";
        secretBox.classList.add('secret-revealed', 'secret-animation');
        setTimeout(() => {
            secretBox.classList.remove('secret-animation');
        }, 500);
        
        // Remove event listeners after secret is revealed
        secretBox.removeEventListener('dblclick', revealSecret);
        clearTimeout(longPressTimer);
    }
    
    // 2. Interactive Elements
    
    // Button that changes text and color
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color ${colorIndex + 1}`;
    });
    
    // Image gallery
    const galleryImages = document.querySelectorAll('.gallery img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    }, 3000);
    
    // Tab system
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update contents
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 3. Form Validation
    
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.querySelector('.strength-bar::after');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = '';
            return true;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        let strength = 0;
        let messages = [];
        
        if (password.length === 0) {
            updatePasswordStrength(0, '');
            passwordError.textContent = '';
            return false;
        }
        
        if (password.length < 8) {
            messages.push('Password must be at least 8 characters');
        } else {
            strength += 1;
        }
        
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update strength bar
        const strengthPercent = strength * 25;
        const strengthColors = ['#e74c3c', '#f39c12', '#3498db', '#2ecc71'];
        
        document.querySelector('.strength-bar').style.setProperty('--strength-width', `${strengthPercent}%`);
        document.querySelector('.strength-bar').style.setProperty('--strength-color', strengthColors[strength]);
        
        // Update strength text
        const strengthDescriptions = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
        strengthText.textContent = strengthDescriptions[strength];
        strengthText.style.color = strengthColors[strength] || '#7f8c8d';
        
        // Update error message
        passwordError.textContent = messages.join(' ');
        
        return messages.length === 0;
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            document.querySelector('.strength-bar').style.setProperty('--strength-width', '0%');
            strengthText.textContent = 'Password strength';
            strengthText.style.color = '#7f8c8d';
        } else {
            alert('Please fix the errors in the form before submitting.');
        }
    });
    
    // CSS variable for password strength bar
    document.documentElement.style.setProperty('--strength-width', '0%');
    document.documentElement.style.setProperty('--strength-color', '#e74c3c');
});