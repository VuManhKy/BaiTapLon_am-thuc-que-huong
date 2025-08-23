// FILE script.js CỦA TRANG CHỦ - ĐÃ ĐƯỢC RÚT GỌN

document.addEventListener('DOMContentLoaded', () => {
    const dishes = [
    // Món chính
    { id: 1, name: 'Phở Bò', category: 'main', region: 'bac', image: 'images/pho-bo.jpg', description: 'Phở bò là tinh hoa ẩm thực Hà Nội, nổi bật với nước dùng ngọt thanh ninh từ xương bò cùng quế, hồi, gừng nướng. Bánh phở mềm, thịt bò tươi thái mỏng, ăn kèm chanh, ớt và rau thơm tạo nên hương vị đặc trưng khó quên.', ingredients: 'Bánh phở, xương bò, thịt bò tái/chín, gừng, hành tím, quế, hồi, thảo quả, rau thơm, chanh, ớt, nước mắm, muối, tiêu.' },
    { id: 2, name: 'Bún Chả', category: 'main', region: 'bac', image: 'images/bun-cha.jpg', description: 'Bún chả là món ăn nổi tiếng Hà Nội, với chả thịt lợn nướng trên than hoa vàng ruộm, ăn kèm bún tươi và nước mắm chua ngọt, tạo nên hương vị hài hòa.', ingredients: 'Bún tươi, thịt ba chỉ, thịt nạc vai, nước mắm, đường, giấm, tỏi, ớt, rau sống.' },
    { id: 3, name: 'Bánh Mì', category: 'main', region: 'nam', image: 'images/banh-mi.jpg', description: 'Bánh mì Việt Nam là món ăn đường phố nổi tiếng thế giới, với ổ baguette giòn rụm kẹp pate, thịt nguội, rau dưa và sốt đặc trưng.', ingredients: 'Bánh mì, pate, thịt nguội, chả lụa, dưa leo, đồ chua, rau thơm, sốt mayonnaise.' },
    { id: 4, name: 'Cơm Tấm', category: 'main', region: 'nam', image: 'images/com-tam.jpg', description: 'Cơm tấm là đặc sản Sài Gòn, hạt cơm vỡ mềm dẻo ăn kèm sườn nướng, bì, chả trứng và chan nước mắm pha đậm đà.', ingredients: 'Gạo tấm, sườn nướng, bì heo, chả trứng, mỡ hành, dưa leo, đồ chua, nước mắm.' },
    { id: 5, name: 'Bún Bò Huế', category: 'main', region: 'trung', image: 'images/bun-bo-hue.jpg', description: 'Bún bò Huế nổi tiếng với vị cay nồng và nước lèo đậm đà từ xương bò, giò heo cùng mắm ruốc đặc trưng xứ Huế.', ingredients: 'Bún, bắp bò, giò heo, mắm ruốc, sả, ớt, hành lá, rau sống.' },
    { id: 6, name: 'Cao Lầu', category: 'main', region: 'trung', image: 'images/cao-lau.jpg', description: 'Cao Lầu là đặc sản Hội An với sợi mì vàng dai, thịt xá xíu thơm đậm đà và rau sống tươi xanh.', ingredients: 'Mì cao lầu, thịt heo xá xíu, giá đỗ, rau thơm, tóp mỡ, nước dùng.'},
    // Món ăn vặt
    { id: 7, name: 'Nem Rán (Chả Giò)', category: 'snack', region: 'bac', image: 'images/nem-ran.jpg', description: 'Nem rán là món ăn giòn rụm bên ngoài, nhân thịt và rau củ mềm thơm, thường xuất hiện trong mâm cỗ truyền thống.', ingredients: 'Thịt heo băm, mộc nhĩ, miến, cà rốt, trứng, bánh đa nem, gia vị.' },
    { id: 8, name: 'Bánh Xèo', category: 'snack', region: 'nam', image: 'images/banh-xeo.jpg', description: 'Bánh xèo miền Nam có lớp vỏ vàng giòn, nhân tôm thịt giá đỗ, ăn kèm rau sống và nước mắm chua ngọt.', ingredients: 'Bột gạo, bột nghệ, tôm, thịt heo, giá đỗ, rau sống, nước mắm.' },
    { id: 9, name: 'Gỏi Cuốn', category: 'snack', region: 'nam', image: 'images/goi-cuon.jpg', description: 'Gỏi cuốn thanh mát với bánh tráng cuốn tôm, thịt, bún và rau, chấm cùng nước mắm pha hoặc tương đậu phộng.', ingredients: 'Bánh tráng, bún, tôm luộc, thịt heo luộc, rau thơm, xà lách, nước chấm.' },
    { id: 10, name: 'Bột Chiên', category: 'snack', region: 'nam', image: 'images/bot-chien.jpg', description: 'Bột chiên là món ăn vặt nổi tiếng ở Sài Gòn, từng miếng bột giòn bên ngoài, dẻo bên trong, ăn kèm trứng và đu đủ bào chua ngọt.', ingredients: 'Bột gạo, trứng, hành lá, đu đủ bào, xì dầu, tương ớt.' },
    { id: 11, name: 'Chè Ba Miền', category: 'snack', region: 'all', image: 'images/che.jpg', description: 'Chè Việt Nam đa dạng với đủ loại nguyên liệu như đậu, thạch, nước cốt dừa, mang đến vị ngọt mát đặc trưng.', ingredients: 'Đậu xanh, đậu đỏ, đậu đen, bột báng, thạch, nước cốt dừa, đường.' },
    { id: 12, name: 'Bánh Tráng Nướng', category: 'snack', region: 'trung', image: 'images/banh-trang-nuong.jpg', description: 'Bánh tráng nướng  “pizza Việt Nam”  với vỏ giòn rụm, trứng, hành lá và nhiều loại topping hấp dẫn.', ingredients: 'Bánh tráng, trứng cút, hành lá, xúc xích, ruốc khô, sốt mayonnaise.' },

    // Đặc sản
    { id: 13, name: 'Phở Cuốn', category: 'specialty', region: 'bac', image: 'images/pho-cuon.jpg', description: 'Phở cuốn Hà Nội có bánh phở mềm cuốn thịt bò xào thơm, rau sống, chấm nước mắm tỏi ớt đậm đà.', ingredients: 'Bánh phở, thịt bò, xà lách, rau thơm, nước mắm, tỏi, ớt.' },
    { id: 14, name: 'Mì Quảng', category: 'specialty', region: 'trung', image: 'images/mi-quang.jpg', description: 'Mì Quảng là đặc sản Quảng Nam, sợi mì vàng dai, nước dùng ít nhưng đậm đà, ăn kèm tôm, thịt và bánh tráng mè.', ingredients: 'Mì Quảng, tôm, thịt gà, trứng, lạc rang, rau sống, bánh tráng.' },
    { id: 15, name: 'Bánh Căn', category: 'specialty', region: 'trung', image: 'images/banh-can.jpg', description: 'Bánh căn là món bánh gạo nhỏ nướng trong khuôn đất, ăn kèm nước chấm và rau sống, đặc sản miền Nam Trung Bộ.', ingredients: 'Bột gạo, trứng, hải sản (tôm, mực), hành lá, mỡ hành.' },
    { id: 16, name: 'Lẩu Mắm', category: 'specialty', region: 'nam', image: 'images/lau-mam.jpg', description: 'Lẩu mắm miền Tây có nước dùng nấu từ mắm cá sặc, đậm đà và thơm nồng, ăn kèm đa dạng rau đồng và hải sản.', ingredients: 'Mắm cá, cá, tôm, mực, thịt ba chỉ, cà tím, rau các loại.' },
    { id: 17, name: 'Chả Cá Lã Vọng', category: 'specialty', region: 'bac', image: 'images/cha-ca.jpg', description: 'Chả Cá Lã Vọng là đặc sản Hà Nội, cá lăng tẩm ướp nghệ nướng, ăn kèm bún, lạc rang, thì là và mắm tôm.', ingredients: 'Cá lăng, nghệ, thì là, hành lá, bún, mắm tôm, lạc rang.' },
    { id: 18, name: 'Bánh Bèo', category: 'specialty', region: 'trung', image: 'images/banh-beo.jpg', description: 'Bánh bèo Huế nhỏ xinh, mềm mịn, ăn kèm tôm cháy, mỡ hành và chan nước mắm mặn ngọt.', ingredients: 'Bột gạo, tôm khô, hành lá, mỡ hành, nước mắm.' },
    { id: 19, name: 'Thịt Chua Phú Thọ', category: 'specialty', region: 'bac', image: 'images/thit-chua.jpg', description: 'Thịt chua Phú Thọ được làm từ thịt lợn ướp thính, lên men tự nhiên, có vị chua nhẹ đặc trưng.', ingredients: 'Thịt lợn nạc, bì lợn, thính gạo, lá ổi.' },
    { id: 20, name: 'Bánh Gai', category: 'specialty', region: 'bac', image: 'images/banh-gai.jpg', description: 'Bánh gai truyền thống với vỏ đen từ lá gai, nhân đậu xanh dừa ngọt bùi, thường xuất hiện trong lễ hội.', ingredients: 'Bột nếp, lá gai, đậu xanh, dừa nạo, mỡ lợn, đường.' },
    { id: 21, name: 'Nem Chua Thanh Hóa', category: 'specialty', region: 'bac', image: '../images/nem-chua.jpg', description: 'Nem chua Thanh Hóa nổi tiếng cả nước với hương vị chua nhẹ, cay nồng của ớt, thơm mùi tỏi và lá đinh lăng. Đây là món ăn chơi hấp dẫn và cũng là món quà ý nghĩa của xứ Thanh.', ingredients: 'Thịt heo nạc, bì lợn, thính gạo, tỏi, ớt, lá đinh lăng, lá chuối, gia vị.' },
    { id: 22, name: 'Hủ Tiếu', category: 'specialty', region: 'nam', image: 'images/hu-tieu.jpg', description: 'Hủ tiếu là món ăn đặc sản miền Nam có nguồn gốc Hoa, nước dùng ngọt thanh từ xương heo, sợi hủ tiếu dai mềm, ăn kèm thịt heo, tôm, gan và rau sống. Các biến thể nổi tiếng gồm hủ tiếu Nam Vang, Mỹ Tho, Sa Đéc.', ingredients: 'Sợi hủ tiếu, xương heo, thịt nạc, gan heo, tôm, trứng cút, giá đỗ, hẹ, xà lách, hành phi, nước mắm, muối, tiêu.' }
];

    const mainDishesContainer = document.getElementById('main-dishes');
    const snackDishesContainer = document.getElementById('snack-dishes');
    const specialtyDishesContainer = document.getElementById('specialty-dishes');

    const logoutBtn = document.getElementById('logout-btn');
    const userActions = document.getElementById('user-actions');
    const userInfo = document.getElementById('user-info');
    const welcomeMessage = document.getElementById('welcome-message');

    const dishDetailModal = document.getElementById('dish-detail-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const commentForm = document.getElementById('comment-form');
    
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let currentUser = null;
    let currentDishId = null;
    let currentRating = 0;

    // --- CÁC HÀM XỬ LÝ GIAO DIỆN CHÍNH (KHÔNG THAY ĐỔI NHIỀU) ---
    function renderDishes(regionFilter = 'all', searchTerm = '') {
        mainDishesContainer.innerHTML = '';
        snackDishesContainer.innerHTML = '';
        specialtyDishesContainer.innerHTML = '';
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        const filteredDishes = dishes.filter(dish => {
            const regionMatch = (regionFilter === 'all' || dish.region === regionFilter || dish.region === 'all');
            const searchMatch = dish.name.toLowerCase().includes(lowerCaseSearchTerm);
            return regionMatch && searchMatch;
        });
        if (filteredDishes.length === 0) {
            mainDishesContainer.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1;">Không tìm thấy món ăn phù hợp.</p>';
        }
        filteredDishes.forEach(dish => {
            const dishCard = `
                <div class="dish-card" data-id="${dish.id}">
                    <img src="${dish.image}" alt="${dish.name}">
                    <div class="dish-card-content">
                        <h4>${dish.name}</h4>
                        <p>${dish.description.substring(0, 100)}...</p>
                    </div>
                </div>`;
            if (dish.category === 'main') mainDishesContainer.innerHTML += dishCard;
            else if (dish.category === 'snack') snackDishesContainer.innerHTML += dishCard;
            else specialtyDishesContainer.innerHTML += dishCard;
        });
        document.querySelectorAll('.dish-card').forEach(card => {
            card.addEventListener('click', () => showDishDetail(card.dataset.id));
        });
    }

    function showDishDetail(dishId) {
        currentDishId = parseInt(dishId);
        const dish = dishes.find(d => d.id === currentDishId);
        if (!dish) return;
        const dishDetailContent = document.getElementById('dish-detail-content');
        dishDetailContent.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="dish-info">
                <h2>${dish.name}</h2>
                <p><strong>Nguyên liệu chính:</strong> ${dish.ingredients}</p>
                <p>${dish.description}</p>
                <div class="avg-rating" id="avg-rating-display"></div>
            </div>`;
        renderComments(currentDishId);
        updateCommentFormVisibility();
        dishDetailModal.style.display = 'block';
    }

    function closeModal(modal) {
        if(modal) modal.style.display = 'none';
    }
    
    function updateUserUI() {
        currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            userActions.classList.add('hidden');
            userInfo.classList.remove('hidden');
            welcomeMessage.textContent = `Chào, ${currentUser}!`;
        } else {
            userActions.classList.remove('hidden');
            userInfo.classList.add('hidden');
        }
    }

    function handleLogout() {
        localStorage.removeItem('currentUser');
        currentUser = null;
        updateUserUI();
    }
    
    function updateCommentFormVisibility() {
        const commentLoginPrompt = document.getElementById('comment-login-prompt');
        if (!commentLoginPrompt) return;
        if (currentUser) {
            commentLoginPrompt.classList.add('hidden');
            commentForm.classList.remove('hidden');
        } else {
            commentLoginPrompt.classList.remove('hidden');
            commentForm.classList.add('hidden');
        }
    }

    // Các hàm xử lý bình luận và đánh giá giữ nguyên
    function renderComments(dishId) { /* Giữ nguyên code cũ */ }
    function handleCommentSubmit(e){ /* Giữ nguyên code cũ */ }
    function handleStarRating(e) { /* Giữ nguyên code cũ */ }
    function resetStars() { /* Giữ nguyên code cũ */ }
    // (Bạn chỉ cần copy/paste lại các hàm này từ file script.js cũ của bạn)
    // Hoặc để mình điền đầy đủ giúp bạn
    function renderComments(dishId) {
        const commentList = document.getElementById('comment-list');
        commentList.innerHTML = '';
        let allComments = JSON.parse(localStorage.getItem('comments')) || {};
        const dishComments = allComments[dishId] || [];
        let totalRating = 0;
        if (dishComments.length > 0) {
            dishComments.forEach(comment => {
                totalRating += comment.rating;
                let stars = '';
                for(let i=1; i<=5; i++){
                    stars += `<i class="fa-star ${i <= comment.rating ? 'fas' : 'far'}"></i>`;
                }
                const commentEl = `<div class="comment"><p class="comment-author">${comment.user}</p><div class="comment-rating">${stars}</div><p>${comment.text}</p></div>`;
                commentList.innerHTML += commentEl;
            });
            const avgRating = totalRating / dishComments.length;
            document.getElementById('avg-rating-display').textContent = `Đánh giá: ${avgRating.toFixed(1)}/5 ⭐`;
        } else {
            commentList.innerHTML = '<p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>';
            document.getElementById('avg-rating-display').textContent = 'Chưa có đánh giá';
        }
    }
    function handleCommentSubmit(e){
        e.preventDefault();
        const commentText = document.getElementById('comment-text').value;
        if(!commentText || currentRating === 0) {
            alert('Vui lòng viết bình luận và chọn số sao đánh giá!');
            return;
        }
        const newComment = { user: currentUser, text: commentText, rating: currentRating };
        let allComments = JSON.parse(localStorage.getItem('comments')) || {};
        if (!allComments[currentDishId]) allComments[currentDishId] = [];
        allComments[currentDishId].push(newComment);
        localStorage.setItem('comments', JSON.stringify(allComments));
        renderComments(currentDishId);
        commentForm.reset();
        resetStars();
    }
    function handleStarRating(e) {
        if(e.target.matches('.star-rating i')) {
            const stars = document.getElementById('comment-form').querySelectorAll('.star-rating i');
            currentRating = parseInt(e.target.dataset.value);
            stars.forEach(star => {
                if (parseInt(star.dataset.value) <= currentRating) {
                    star.classList.remove('far'); star.classList.add('fas', 'selected');
                } else {
                    star.classList.remove('fas', 'selected'); star.classList.add('far');
                }
            });
        }
    }
    function resetStars() {
        const stars = document.getElementById('comment-form').querySelectorAll('.star-rating i');
        stars.forEach(star => {
            star.classList.remove('fas', 'selected'); star.classList.add('far');
        });
        currentRating = 0;
    }


    // --- EVENT LISTENERS ---
    logoutBtn.addEventListener('click', handleLogout);
    commentForm.addEventListener('submit', handleCommentSubmit);
    closeBtns.forEach(btn => btn.addEventListener('click', () => closeModal(dishDetailModal)));
    window.addEventListener('click', (e) => {
        if (e.target === dishDetailModal) closeModal(dishDetailModal);
    });
    document.getElementById('comment-form').querySelector('.star-rating').addEventListener('click', handleStarRating);
    
    // ĐÃ THAY ĐỔI: Chuyển hướng đến trang đăng nhập
    document.getElementById('login-from-comment').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'login.html';
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');
            renderDishes(button.dataset.region, searchInput.value);
        });
    });

    searchInput.addEventListener('input', () => {
        const region = document.querySelector('.filter-btn.active').dataset.region;
        renderDishes(region, searchInput.value);
    });

    // --- INITIALIZATION ---
    renderDishes(); 
    updateUserUI();
});