    <script>
        document.addEventListener('DOMContentLoaded', function () {
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
            const progressSteps = document.querySelectorAll('.progress-step');

            // Password requirements elements
            const lengthRequirement = document.getElementById('length');
            const uppercaseRequirement = document.getElementById('uppercase');
            const lowercaseRequirement = document.getElementById('lowercase');
            const numberRequirement = document.getElementById('number');
            const specialRequirement = document.getElementById('special');
            const strengthFill = document.getElementById('strength-fill');
            const strengthText = document.getElementById('strength-text');

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

            // Initialize tooltips for social buttons
            document.querySelectorAll('.social-btn').forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    const platform = this.classList.contains('google') ? 'Google' : 
                                   this.classList.contains('facebook') ? 'Facebook' : 'GitHub';
                    // In a real implementation, you could show a tooltip here
                });
            });

            // Validate name field
            function validateName() {
                const nameError = document.getElementById('name-error');
                const nameValidIcon = document.getElementById('name-valid');
                const nameInvalidIcon = document.getElementById('name-invalid');

                if (fullnameInput.validity.valid) {
                    isNameValid = true;
                    fullnameInput.classList.remove('invalid');
                    fullnameInput.classList.add('valid');
                    nameError.classList.add('hidden');
                    nameValidIcon.classList.add('show');
                    nameInvalidIcon.classList.remove('show');
                    updateProgress(0, true);
                } else {
                    isNameValid = false;
                    fullnameInput.classList.remove('valid');
                    fullnameInput.classList.add('invalid');
                    nameError.classList.remove('hidden');
                    nameValidIcon.classList.remove('show');
                    nameInvalidIcon.classList.add('show');
                    updateProgress(0, false);

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
                    emailInput.classList.remove('invalid');
                    emailInput.classList.add('valid');
                    emailError.classList.add('hidden');
                    emailValidIcon.classList.add('show');
                    emailInvalidIcon.classList.remove('show');
                    updateProgress(0, true);
                } else {
                    isEmailValid = false;
                    emailInput.classList.remove('valid');
                    emailInput.classList.add('invalid');
                    emailError.classList.remove('hidden');
                    emailValidIcon.classList.remove('show');
                    emailInvalidIcon.classList.add('show');
                    updateProgress(0, false);

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
                let strength = 0;

                // Check length
                if (password.length >= 8) {
                    lengthRequirement.classList.add('valid');
                    lengthRequirement.classList.remove('invalid');
                    strength += 20;
                } else {
                    lengthRequirement.classList.remove('valid');
                    lengthRequirement.classList.add('invalid');
                }

                // Check uppercase
                if (/[A-Z]/.test(password)) {
                    uppercaseRequirement.classList.add('valid');
                    uppercaseRequirement.classList.remove('invalid');
                    strength += 20;
                } else {
                    uppercaseRequirement.classList.remove('valid');
                    uppercaseRequirement.classList.add('invalid');
                }

                // Check lowercase
                if (/[a-z]/.test(password)) {
                    lowercaseRequirement.classList.add('valid');
                    lowercaseRequirement.classList.remove('invalid');
                    strength += 20;
                } else {
                    lowercaseRequirement.classList.remove('valid');
                    lowercaseRequirement.classList.add('invalid');
                }

                // Check number
                if (/\d/.test(password)) {
                    numberRequirement.classList.add('valid');
                    numberRequirement.classList.remove('invalid');
                    strength += 20;
                } else {
                    numberRequirement.classList.remove('valid');
                    numberRequirement.classList.add('invalid');
                }

                // Check special character
                if (/[@$!%*?&]/.test(password)) {
                    specialRequirement.classList.add('valid');
                    specialRequirement.classList.remove('invalid');
                    strength += 20;
                } else {
                    specialRequirement.classList.remove('valid');
                    specialRequirement.classList.add('invalid');
                }

                // Update strength meter
                strengthFill.style.width = `${strength}%`;
                
                // Set strength color and text
                if (strength <= 20) {
                    strengthFill.style.backgroundColor = '#ef4444';
                    strengthText.textContent = 'Password strength: Weak';
                    strengthText.style.color = '#ef4444';
                } else if (strength <= 60) {
                    strengthFill.style.backgroundColor = '#f59e0b';
                    strengthText.textContent = 'Password strength: Fair';
                    strengthText.style.color = '#f59e0b';
                } else if (strength <= 80) {
                    strengthFill.style.backgroundColor = '#10b981';
                    strengthText.textContent = 'Password strength: Good';
                    strengthText.style.color = '#10b981';
                } else {
                    strengthFill.style.backgroundColor = '#059669';
                    strengthText.textContent = 'Password strength: Strong';
                    strengthText.style.color = '#059669';
                }

                // Validate against pattern
                if (passwordInput.validity.valid) {
                    isPasswordValid = true;
                    passwordInput.classList.remove('invalid');
                    passwordInput.classList.add('valid');
                    document.getElementById('password-valid').classList.add('show');
                    document.getElementById('password-invalid').classList.remove('show');
                    updateProgress(1, true);
                } else {
                    isPasswordValid = false;
                    passwordInput.classList.remove('valid');
                    passwordInput.classList.add('invalid');
                    document.getElementById('password-valid').classList.remove('show');
                    document.getElementById('password-invalid').classList.add('show');
                    updateProgress(1, false);
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
                    confirmPasswordInput.classList.remove('invalid');
                    confirmPasswordInput.classList.add('valid');
                    confirmError.classList.add('hidden');
                    confirmValidIcon.classList.add('show');
                    confirmInvalidIcon.classList.remove('show');
                    updateProgress(1, true);
                } else {
                    isConfirmValid = false;
                    confirmPasswordInput.classList.remove('valid');
                    confirmPasswordInput.classList.add('invalid');
                    confirmValidIcon.classList.remove('show');
                    confirmInvalidIcon.classList.add('show');

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
                    updateProgress(1, false);
                }

                updateSubmitButton();
            }

            // Validate terms checkbox
            function validateTerms() {
                const termsError = document.getElementById('terms-error');

                if (termsCheckbox.checked) {
                    isTermsChecked = true;
                    termsError.classList.add('hidden');
                    updateProgress(2, true);
                } else {
                    isTermsChecked = false;
                    termsError.classList.remove('hidden');
                    updateProgress(2, false);
                }

                updateSubmitButton();
            }

            // Update progress indicator
            function updateProgress(stepIndex, isValid) {
                if (isValid) {
                    progressSteps[stepIndex].classList.add('completed');
                    progressSteps[stepIndex].classList.remove('active');
                    
                    // Move to next step if available
                    if (stepIndex < 2) {
                        progressSteps[stepIndex + 1].classList.add('active');
                    }
                } else {
                    progressSteps[stepIndex].classList.remove('completed');
                    if (stepIndex === 0) {
                        progressSteps[stepIndex].classList.add('active');
                    }
                }
            }

            // Toggle password visibility
            function togglePasswordVisibility() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                // Toggle eye icon
                const icon = togglePasswordBtn.querySelector('i');
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
                
                // Also toggle for confirm password
                confirmPasswordInput.type = type;
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
                    // Show loading state
                    submitBtn.classList.add('btn-loading');
                    submitBtn.disabled = true;

                    // Simulate API call
                    setTimeout(() => {
                        // In a real app, you would send the data to a server here
                        console.log('Form submitted successfully!');
                        console.log({
                            name: fullnameInput.value,
                            email: emailInput.value,
                            password: passwordInput.value
                        });

                        // Remove loading state
                        submitBtn.classList.remove('btn-loading');

                        // Show success modal with confetti effect
                        successModal.classList.remove('hidden');
                        document.body.classList.add('overflow-hidden');
                        
                        // Create confetti effect
                        createConfetti();

                        // Reset form (optional)
                        // form.reset();
                        // Reset validation states
                        // isNameValid = isEmailValid = isPasswordValid = isConfirmValid = isTermsChecked = false;
                        // updateSubmitButton();
                    }, 1500);
                } else {
                    // Highlight invalid fields
                    if (!isNameValid) {
                        fullnameInput.classList.add('shake');
                        setTimeout(() => fullnameInput.classList.remove('shake'), 500);
                    }
                    if (!isEmailValid) {
                        emailInput.classList.add('shake');
                        setTimeout(() => emailInput.classList.remove('shake'), 500);
                    }
                    if (!isPasswordValid) {
                        passwordInput.classList.add('shake');
                        setTimeout(() => passwordInput.classList.remove('shake'), 500);
                    }
                    if (!isConfirmValid) {
                        confirmPasswordInput.classList.add('shake');
                        setTimeout(() => confirmPasswordInput.classList.remove('shake'), 500);
                    }
                    if (!isTermsChecked) {
                        termsCheckbox.classList.add('shake');
                        setTimeout(() => termsCheckbox.classList.remove('shake'), 500);
                    }
                }
            }

            // Create confetti effect
            function createConfetti() {
                const modalContent = successModal.querySelector('.success-modal');
                for (let i = 0; i < 30; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = `${Math.random() * 100}%`;
                    confetti.style.top = `-10px`;
                    confetti.style.backgroundColor = getRandomColor();
                    confetti.style.animationDelay = `${Math.random() * 2}s`;
                    modalContent.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 2000);
                }
            }

            function getRandomColor() {
                const colors = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            // Close success modal
            function closeSuccessModal() {
                successModal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }

            // Initial validation check
            updateSubmitButton();

            // Social login button handlers
            document.querySelectorAll('.social-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const platform = this.classList.contains('google') ? 'Google' : 
                                   this.classList.contains('facebook') ? 'Facebook' : 'GitHub';
                    alert(`In a real implementation, this would redirect to ${platform} authentication`);
                });
            });
        });
    </script>