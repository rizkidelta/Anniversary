document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('dateInput');
    const unlockBtn = document.getElementById('unlockBtn');
    const errorMessage = document.getElementById('errorMessage');
    const correctPassword = '150724';
    
    // Add event listeners
    unlockBtn.addEventListener('click', checkPassword);
    dateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // Input formatting and validation
    dateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (value.length > 6) {
            value = value.slice(0, 6);
        }
        e.target.value = value;
        
        // Hide error message when user starts typing
        if (errorMessage.classList.contains('show')) {
            errorMessage.classList.remove('show');
        }
    });
    
    function checkPassword() {
        const enteredPassword = dateInput.value.trim();
        
        if (enteredPassword === '') {
            showError();
            shakeInput();
            return;
        }
        
        if (enteredPassword === correctPassword) {
            // Correct password - show success animation and redirect
            showSuccess();
        } else {
            // Wrong password - show error
            showError();
            shakeInput();
            clearInput();
        }
    }
    
    function showError() {
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
    }
    
    function showSuccess() {
        // Add success class to button
        unlockBtn.style.background = 'linear-gradient(135deg, #00b894 0%, #00a085 100%)';
        unlockBtn.innerHTML = '<span class="button-text">Unlocking...</span>';
        
        // Disable input and button
        dateInput.disabled = true;
        unlockBtn.disabled = true;
        
        // Add success animation to container
        const container = document.querySelector('.container');
        container.style.transform = 'scale(1.05)';
        container.style.transition = 'transform 0.5s ease';
        
        // Redirect to celebration page after 2 seconds
        setTimeout(() => {
            window.location.href = 'celebration.html';
        }, 2000);
    }
    
    function shakeInput() {
        dateInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            dateInput.style.animation = '';
        }, 500);
    }
    
    function clearInput() {
        dateInput.value = '';
    }
    
    function resetForm() {
        dateInput.disabled = false;
        unlockBtn.disabled = false;
        dateInput.value = '';
        unlockBtn.style.background = '';
        unlockBtn.innerHTML = '<span class="button-text">Unlock</span>';
        
        const container = document.querySelector('.container');
        container.style.transform = '';
    }
    
    // Add shake animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});