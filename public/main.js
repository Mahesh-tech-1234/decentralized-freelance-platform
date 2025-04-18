document.addEventListener('DOMContentLoaded', () => {
    // Handle Registration Form
    if (document.getElementById('registerForm')) {
        const registerForm = document.getElementById('registerForm');
        
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent page refresh

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
            const portfolio = document.getElementById('portfolio').files[0]; // Assuming single file upload

            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('skills', JSON.stringify(skills));
            formData.append('portfolio', portfolio);

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();
                if (result.success) {
                    alert('Registration successful! Redirecting to login...');
                    window.location.href = 'login.html'; // Redirect to login page
                } else {
                    alert(result.message || 'Registration failed.');
                }
            } catch (error) {
                alert('An error occurred during registration. Please try again.');
                console.error(error);
            }
        });
    }

    // Handle Login Form
    if (document.getElementById('loginForm')) {
        const loginForm = document.getElementById('loginForm');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent page refresh

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                const result = await response.json();
                if (result.success) {
                    localStorage.setItem('user', JSON.stringify(result.user)); // Store user info in localStorage
                    window.location.href = 'dashboard.html'; // Redirect to dashboard page
                } else {
                    alert(result.message || 'Login failed.');
                }
            } catch (error) {
                alert('An error occurred during login. Please try again.');
                console.error(error);
            }
        });
    }
});
