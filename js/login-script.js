document.addEventListener('DOMContentLoaded', () => {
    const loginBox = document.getElementById('login-box');
    const registerBox = document.getElementById('register-box');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Chuyển đổi giữa các form
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginBox.classList.add('hidden');
        registerBox.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
    });

    // Hàm xử lý đăng ký
    function handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value; // Lấy giá trị email
        const password = document.getElementById('register-password').value;
        const successMsg = document.getElementById('register-success');
        const errorMsg = document.getElementById('register-error');

        successMsg.textContent = '';
        errorMsg.textContent = '';

        let users = JSON.parse(localStorage.getItem('users')) || {};

        // Kiểm tra xem email đã tồn tại chưa
        const emailExists = Object.values(users).some(user => user.email === email);

        if (users[username]) {
            errorMsg.textContent = 'Tên đăng nhập đã tồn tại!';
        } else if (emailExists) {
            errorMsg.textContent = 'Email này đã được sử dụng!';
        } else {
            // Cập nhật cấu trúc lưu trữ
            users[username] = { 
                password: password, // Trong thực tế phải mã hóa mật khẩu
                email: email 
            };
            localStorage.setItem('users', JSON.stringify(users));
            successMsg.textContent = 'Đăng ký thành công! Vui lòng chuyển sang tab đăng nhập.';
            registerForm.reset();
        }
    }

    // Hàm xử lý đăng nhập
    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const errorMsg = document.getElementById('login-error');

        let users = JSON.parse(localStorage.getItem('users')) || {};

        // Cập nhật logic kiểm tra đăng nhập cho phù hợp cấu trúc mới
        if (users[username] && users[username].password === password) {
            // Đăng nhập thành công, lưu thông tin và chuyển hướng
            localStorage.setItem('currentUser', username);
            window.location.href = 'index.html'; // Chuyển về trang chủ
        } else {
            errorMsg.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng.';
        }
    }

    registerForm.addEventListener('submit', handleRegister);
    loginForm.addEventListener('submit', handleLogin);
    
    // --- PHẦN Xử lý hiển thị mật khẩu ---
    const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a.75.75 0 0 1 0-1.113ZM12.001 18.75c3.96 0 7.625-2.55 9.08-6.75-1.455-4.2-5.12-6.75-9.08-6.75-3.96 0-7.625 2.55-9.08 6.75 1.455 4.2 5.12 6.75 9.08 6.75Z" clip-rule="evenodd" /></svg>`;
    const eyeSlashIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 0 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a3 3 0 0 0-4.242-4.242L12 9.03l-1.159-1.159a3 3 0 0 0-4.243-4.242L3.89 2.151a11.248 11.248 0 0 1 18.785 10.402ZM12 18.75a9.75 9.75 0 0 0 5.373-1.54l-1.928-1.928A4.5 4.5 0 0 1 12 16.5a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 1.23-3.039l-2.43-2.43A9.75 9.75 0 0 0 1.5 12a9.75 9.75 0 0 0 10.5 6.75Z" /></svg>`;

    function setupPasswordToggle(inputId, toggleId) {
        const passwordInput = document.getElementById(inputId);
        const togglePassword = document.getElementById(toggleId);
        
        if (passwordInput && togglePassword) {
            togglePassword.innerHTML = eyeIcon; // Đặt icon mặc định

            togglePassword.addEventListener('click', () => {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    togglePassword.innerHTML = eyeSlashIcon;
                } else {
                    passwordInput.type = 'password';
                    togglePassword.innerHTML = eyeIcon;
                }
            });
        }
    }
    
    setupPasswordToggle('login-password', 'toggle-login-password');
    setupPasswordToggle('register-password', 'toggle-register-password');

    // Kiểm tra nếu URL có #register để hiển thị form đăng ký
    if (window.location.hash === '#register') {
        loginBox.classList.add('hidden');
        registerBox.classList.remove('hidden');
    }
});