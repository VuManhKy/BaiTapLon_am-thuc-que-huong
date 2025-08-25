   document.addEventListener("DOMContentLoaded", () => {           
            // Lấy các element cần thiết
            const loginPrompt = document.getElementById('login-prompt');
            const historyContent = document.getElementById('user-history-content');
            const welcomeMsg = document.getElementById('history-welcome-message');
            const likedGrid = document.getElementById('liked-dishes-grid');
            const commentsList = document.getElementById('comments-history-list');

            const currentUser = localStorage.getItem('currentUser');

            // --- KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP ---
            if (!currentUser) {
                // Nếu chưa đăng nhập, chỉ hiển thị khung yêu cầu
                loginPrompt.classList.remove('hidden');
                historyContent.classList.add('hidden');
            } else {
                // Nếu đã đăng nhập, ẩn khung yêu cầu và hiển thị nội dung lịch sử
                loginPrompt.classList.add('hidden');
                historyContent.classList.remove('hidden');
                welcomeMsg.textContent = `Lịch Sử Hoạt Động Của ${currentUser}`;

                // --- Lấy dữ liệu từ Local Storage ---
                const userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || {};
                const allComments = JSON.parse(localStorage.getItem('comments')) || {};

                // --- 1. HIỂN THỊ CÁC MÓN ĂN ĐÃ THÍCH ---
                const myFavoriteIds = userFavorites[currentUser] || [];
                if (myFavoriteIds.length === 0) {
                    likedGrid.innerHTML = '<p>Bạn chưa thích món ăn nào cả.</p>';
                } else {
                    let likedHtml = '';
                    const myFavoriteDishes = dishes.filter(dish => myFavoriteIds.includes(dish.id));
                    myFavoriteDishes.forEach(dish => {
                        likedHtml += `
                            <div class="dish-card" onclick="alert('Xem chi tiết món ${dish.name}')">
                                <img src="${dish.image}" alt="${dish.name}">
                                <div class="dish-card-content">
                                    <h4>${dish.name}</h4>
                                    <p>${dish.description.substring(0, 100)}...</p>
                                </div>
                            </div>`;
                    });
                    likedGrid.innerHTML = likedHtml;
                }

                // --- 2. HIỂN THỊ CÁC BÌNH LUẬN ĐÃ GỬI ---
                let commentsHtml = '';
                let commentsFound = false;
                
                // Duyệt qua tất cả các bình luận của tất cả các món ăn
                for (const dishId in allComments) {
                    const dishComments = allComments[dishId];
                    const dishInfo = dishes.find(d => d.id == dishId); // Tìm thông tin món ăn

                    if (dishInfo) {
                        dishComments.forEach(comment => {
                            // Nếu bình luận này là của người dùng hiện tại
                            if (comment.user === currentUser) {
                                commentsFound = true;
                                let stars = '';
                                for (let i = 1; i <= 5; i++) {
                                    stars += `<i class="fa-star ${ i <= comment.rating ? 'fas' : 'far' }"></i>`;
                                }

                                commentsHtml += `
                                    <div class="history-comment-card">
                                        <p class="comment-dish-name">Bạn đã bình luận cho món: ${dishInfo.name}</p>
                                        <div class="comment-rating">${stars}</div>
                                        <p class="comment-text">"<em>${comment.text}</em>"</p>
                                    </div>`;
                            }
                        });
                    }
                }

                if (!commentsFound) {
                    commentsList.innerHTML = '<p>Bạn chưa gửi bình luận nào.</p>';
                } else {
                    commentsList.innerHTML = commentsHtml;
                }
            }
        });