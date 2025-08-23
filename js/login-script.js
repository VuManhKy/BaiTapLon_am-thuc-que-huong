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
        const password = document.getElementById('register-password').value;
        const successMsg = document.getElementById('register-success');
        const errorMsg = document.getElementById('register-error');

        successMsg.textContent = '';
        errorMsg.textContent = '';

        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            errorMsg.textContent = 'Tên đăng nhập đã tồn tại!';
        } else {
            users[username] = password; // Trong thực tế phải mã hóa mật khẩu
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
        if (users[username] && users[username] === password) {
            // Đăng nhập thành công, lưu thông tin và chuyển hướng
            localStorage.setItem('currentUser', username);
            window.location.href = 'index.html'; // Chuyển về trang chủ
        } else {
            errorMsg.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng.';
        }
    }

    registerForm.addEventListener('submit', handleRegister);
    loginForm.addEventListener('submit', handleLogin);
    
    // Kiểm tra nếu URL có #register để hiển thị form đăng ký
    if (window.location.hash === '#register') {
        loginBox.classList.add('hidden');
        registerBox.classList.remove('hidden');
    }
});