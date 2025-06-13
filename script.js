document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const form = document.getElementById('signup-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.getElementById('submit-btn');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Password requirements elements
    const lengthRequirement = document.getElementById('length');
    const uppercaseRequirement = document.getElementById('uppercase');
    const lowercaseRequirement = document.getElementById('lowercase');
    const numberRequirement = document.getElementById('number');
    const specialRequirement = document.getElementById('special');

    // Validation flags
    let isNameValid = false;
    let isEmailValid = false;
    let isPasswordValid = false;
    let isConfirmValid = false;
    let isTermsChecked = false;

    // Event listeners for real-time validation
    fullnameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    termsCheckbox.addEventListener('change', validateTerms);
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    form.addEventListener('submit', handleFormSubmission);
    modalCloseBtn.addEventListener('click', closeSuccessModal);

    // Validate name field
    function validateName() {
        const nameError = document.getElementById('name-error');
        const nameValidIcon = document.getElementById('name-valid');
        const nameInvalidIcon = document.getElementById('name-invalid');
        
        if (fullnameInput.validity.valid) {
            isNameValid = true;
            fullnameInput.classList.remove('border-red-500');
            fullnameInput.classList.add('border-green-500');
            nameError.classList.add('hidden');
            nameValidIcon.classList.remove('hidden');
            nameInvalidIcon.classList.add('hidden');
        } else {
            isNameValid = false;
            fullnameInput.classList.remove('border-green-500');
            fullnameInput.classList.add('border-red-500');
            nameError.classList.remove('hidden');
            nameValidIcon.classList.add('hidden');
            nameInvalidIcon.classList.remove('hidden');
            
            if (fullnameInput.validity.valueMissing) {
                nameError.textContent = 'Name is required';
            } else if (fullnameInput.validity.tooShort) {
                nameError.textContent = `Name should be at least ${fullnameInput.minLength} characters`;
            }
        }
        
        updateSubmitButton();
    }

    // Validate email field
    function validateEmail() {
        const emailError = document.getElementById('email-error');
        const emailValidIcon = document.getElementById('email-valid');
        const emailInvalidIcon = document.getElementById('email-invalid');
        
        if (emailInput.validity.valid) {
            isEmailValid = true;
            emailInput.classList.remove('border-red-500');
            emailInput.classList.add('border-green-500');
            emailError.classList.add('hidden');
            emailValidIcon.classList.remove('hidden');
            emailInvalidIcon.classList.add('hidden');
        } else {
            isEmailValid = false;
            emailInput.classList.remove('border-green-500');
            emailInput.classList.add('border-red-500');
            emailError.classList.remove('hidden');
            emailValidIcon.classList.add('hidden');
            emailInvalidIcon.classList.remove('hidden');
            
            if (emailInput.validity.valueMissing) {
                emailError.textContent = 'Email is required';
            } else if (emailInput.validity.typeMismatch) {
                emailError.textContent = 'Please enter a valid email address';
            }
        }
        
        updateSubmitButton();
    }

    // Validate password field
    function validatePassword() {
        const password = passwordInput.value;
        
        // Check length
        if (password.length >= 8) {
            lengthRequirement.classList.remove('invalid');
            lengthRequirement.classList.add('valid');
        } else {
            lengthRequirement.classList.remove('valid');
            lengthRequirement.classList.add('invalid');
        }
        
        // Check uppercase
        if (/[A-Z]/.test(password)) {
            uppercaseRequirement.classList.remove('invalid');
            uppercaseRequirement.classList.add('valid');
        } else {
            uppercaseRequirement.classList.remove('valid');
            uppercaseRequirement.classList.add('invalid');
        }
        
        // Check lowercase
        if (/[a-z]/.test(password)) {
            lowercaseRequirement.classList.remove('invalid');
            lowercaseRequirement.classList.add('valid');
        } else {
            lowercaseRequirement.classList.remove('valid');
            lowercaseRequirement.classList.add('invalid');
        }
        
        // Check number
        if (/\d/.test(password)) {
            numberRequirement.classList.remove('invalid');
            numberRequirement.classList.add('valid');
        } else {
            numberRequirement.classList.remove('valid');
            numberRequirement.classList.add('invalid');
        }
        
        // Check special character
        if (/[@$!%*?&]/.test(password)) {
            specialRequirement.classList.remove('invalid');
            specialRequirement.classList.add('valid');
        } else {
            specialRequirement.classList.remove('valid');
            specialRequirement.classList.add('invalid');
        }
        
        // Validate against pattern
        if (passwordInput.validity.valid) {
            isPasswordValid = true;
            passwordInput.classList.remove('border-red-500');
            passwordInput.classList.add('border-green-500');
        } else {
            isPasswordValid = false;
            passwordInput.classList.remove('border-green-500');
            passwordInput.classList.add('border-red-500');
        }
        
        // Re-validate confirm password if it has value
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
        
        updateSubmitButton();
    }

    // Validate confirm password field
    function validateConfirmPassword() {
        const confirmError = document.getElementById('confirm-error');
        const confirmValidIcon = document.getElementById('confirm-valid');
        const confirmInvalidIcon = document.getElementById('confirm-invalid');
        
        if (confirmPasswordInput.value === passwordInput.value && passwordInput.value) {
            isConfirmValid = true;
            confirmPasswordInput.classList.remove('border-red-500');
            confirmPasswordInput.classList.add('border-green-500');
            confirmError.classList.add('hidden');
            confirmValidIcon.classList.remove('hidden');
            confirmInvalidIcon.classList.add('hidden');
        } else {
            isConfirmValid = false;
            confirmPasswordInput.classList.remove('border-green-500');
            confirmPasswordInput.classList.add('border-red-500');
            confirmValidIcon.classList.add('hidden');
            confirmInvalidIcon.classList.remove('hidden');
            
            if (!passwordInput.value) {
                confirmError.textContent = 'Please enter a password first';
            } else {
                confirmError.textContent = 'Passwords do not match';
            }
            
            if (confirmPasswordInput.value) {
                confirmError.classList.remove('hidden');
            } else {
                confirmError.classList.add('hidden');
            }
        }
        
        updateSubmitButton();
    }

    // Validate terms checkbox
    function validateTerms() {
        const termsError = document.getElementById('terms-error');
        
        if (termsCheckbox.checked) {
            isTermsChecked = true;
            termsError.classList.add('hidden');
        } else {
            isTermsChecked = false;
            termsError.classList.remove('hidden');
        }
        
        updateSubmitButton();
    }

    // Toggle password visibility
    function togglePasswordVisibility() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = togglePasswordBtn.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    }

    // Update submit button state
    function updateSubmitButton() {
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid && isTermsChecked) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Handle form submission
    function handleFormSubmission(e) {
        e.preventDefault();
        
        // Validate all fields one more time
        validateName();
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        validateTerms();
        
        // Check if form is valid
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid && isTermsChecked) {
            // In a real app, you would send the data to a server here
            console.log('Form submitted successfully!');
            console.log({
                name: fullnameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            });
            
            // Show success modal
            successModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            
            // Reset form (optional)
            // form.reset();
            // Reset validation states
            // isNameValid = isEmailValid = isPasswordValid = isConfirmValid = isTermsChecked = false;
            // updateSubmitButton();
        } else {
            // Highlight invalid fields
            if (!isNameValid) {
                fullnameInput.classList.add('shake');
                setTimeout(() => fullnameInput.classList.remove('shake'), 400);
            }
            if (!isEmailValid) {
                emailInput.classList.add('shake');
                setTimeout(() => emailInput.classList.remove('shake'), 400);
            }
            if (!isPasswordValid) {
                passwordInput.classList.add('shake');
                setTimeout(() => passwordInput.classList.remove('shake'), 400);
            }
            if (!isConfirmValid) {
                confirmPasswordInput.classList.add('shake');
                setTimeout(() => confirmPasswordInput.classList.remove('shake'), 400);
            }
            if (!isTermsChecked) {
                termsCheckbox.classList.add('shake');
                setTimeout(() => termsCheckbox.classList.remove('shake'), 400);
            }
        }
    }

    // Close success modal
    function closeSuccessModal() {
        successModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    // Initial validation check
    updateSubmitButton();
});