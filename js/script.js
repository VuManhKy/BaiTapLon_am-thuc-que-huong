document.addEventListener("DOMContentLoaded", () => {


  // --- Menu Hamburger ---
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', () => {
          mainNav.classList.toggle('nav-active');
      });
  }

  // --- Trạng thái người dùng & Đăng xuất ---
  const logoutBtn = document.getElementById("logout-btn");
  const userActions = document.getElementById("user-actions");
  const userInfo = document.getElementById("user-info");
  const welcomeMessage = document.getElementById("welcome-message");
  
  let currentUser = null;
  let userFavorites = JSON.parse(localStorage.getItem("userFavorites")) || {};

  function handleLogout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    // Chuyển về trang chủ sau khi đăng xuất nếu đang ở trang khác
    if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
        window.location.href = 'index.html';
    } else {
        updateUserUI();
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }


  const mainDishesContainer = document.getElementById("main-dishes");
  if (mainDishesContainer) {
    
    // Lấy các element CỦA TRANG CHỦ
    const snackDishesContainer = document.getElementById("snack-dishes");
    const specialtyDishesContainer = document.getElementById("specialty-dishes");
    const favoriteDishesContainer = document.getElementById("favorite-dishes");
    const favoritesSection = document.getElementById("favorites-section");
    const mainSections = document.querySelectorAll(".category:not(#favorites-section)");
    const dishDetailModal = document.getElementById("dish-detail-modal");
    const closeBtns = document.querySelectorAll(".close-btn");
    const commentForm = document.getElementById("comment-form");
    const searchInput = document.getElementById("search-input");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let currentDishId = null;
    let currentRating = 0;

    // --- Các hàm chức năng của trang chủ ---
    function saveUserFavorites() { localStorage.setItem("userFavorites", JSON.stringify(userFavorites)); }

    function toggleFavorite(dishId) {
        if (!currentUser) { alert("Vui lòng đăng nhập để sử dụng tính năng này!"); return; }
        const dishIdNum = parseInt(dishId);
        const currentUserFavs = userFavorites[currentUser] || [];
        const favIndex = currentUserFavs.indexOf(dishIdNum);

        if (favIndex > -1) {
            currentUserFavs.splice(favIndex, 1);
        } else {
            currentUserFavs.push(dishIdNum);
        }
        userFavorites[currentUser] = currentUserFavs;
        saveUserFavorites();

        const activeFilter = document.querySelector(".filter-btn.active").dataset.region;
        renderDishes(activeFilter, searchInput.value);

        if (!dishDetailModal.classList.contains("hidden") && currentDishId === dishIdNum) {
            const modalIcon = document.querySelector("#dish-detail-content .favorite-icon");
            if (modalIcon) {
                modalIcon.classList.toggle("active", favIndex === -1);
                modalIcon.classList.toggle("fas", favIndex === -1);
                modalIcon.classList.toggle("far", favIndex > -1);
            }
        }
    }

    function renderDishes(regionFilter = "all", searchTerm = "") {
        mainDishesContainer.innerHTML = "";
        snackDishesContainer.innerHTML = "";
        specialtyDishesContainer.innerHTML = "";
        favoriteDishesContainer.innerHTML = "";
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        const currentUserFavs = currentUser && userFavorites[currentUser] ? userFavorites[currentUser] : [];

        let dishesToDisplay;
        if (regionFilter === "favorites") {
            favoritesSection.classList.remove("hidden");
            mainSections.forEach((sec) => sec.classList.add("hidden"));
            dishesToDisplay = dishes.filter((dish) => currentUserFavs.includes(dish.id) && dish.name.toLowerCase().includes(lowerCaseSearchTerm));
        } else {
            favoritesSection.classList.add("hidden");
            mainSections.forEach((sec) => sec.classList.remove("hidden"));
            dishesToDisplay = dishes.filter((dish) => {
                const regionMatch = regionFilter === "all" || dish.region === regionFilter || dish.region === "all";
                const searchMatch = dish.name.toLowerCase().includes(lowerCaseSearchTerm);
                return regionMatch && searchMatch;
            });
        }

        if (dishesToDisplay.length === 0) {
            const targetContainer = regionFilter === "favorites" ? favoriteDishesContainer : mainDishesContainer;
            targetContainer.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1;">Không tìm thấy món ăn phù hợp.</p>';
        }

        dishesToDisplay.forEach((dish) => {
            const isFavorite = currentUserFavs.includes(dish.id);
            const dishCard = `
                <div class="dish-card" data-id="${dish.id}">
                    ${currentUser ? `<i class="favorite-icon ${isFavorite ? "fas active" : "far"} fa-heart" data-id="${dish.id}"></i>` : ""}
                    <img src="${dish.image}" alt="${dish.name}">
                    <div class="dish-card-content">
                        <h4>${dish.name}</h4>
                        <p>${dish.description.substring(0, 100)}...</p>
                    </div>
                </div>`;

            if (regionFilter === "favorites") {
                favoriteDishesContainer.innerHTML += dishCard;
            } else {
                if (dish.category === "main") mainDishesContainer.innerHTML += dishCard;
                else if (dish.category === "snack") snackDishesContainer.innerHTML += dishCard;
                else specialtyDishesContainer.innerHTML += dishCard;
            }
        });

        document.querySelectorAll(".dish-card").forEach((card) => {
            card.addEventListener("click", (e) => {
                if (!e.target.classList.contains("favorite-icon")) {
                    showDishDetail(card.dataset.id);
                }
            });
        });

        document.querySelectorAll(".favorite-icon").forEach((icon) => {
            icon.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleFavorite(icon.dataset.id);
            });
        });
    }

    function showDishDetail(dishId) {
        currentDishId = parseInt(dishId);
        const dish = dishes.find((d) => d.id === currentDishId);
        if (!dish) return;

        const currentUserFavs = currentUser && userFavorites[currentUser] ? userFavorites[currentUser] : [];
        const isFavorite = currentUserFavs.includes(dish.id);
        const dishDetailContent = document.getElementById("dish-detail-content");

        let nutritionTableHtml = '';
        if (dish.nutrition) {
            nutritionTableHtml = `
                <h4 style="margin-top: 20px;">Thông Tin Dinh Dưỡng (Tham Khảo)</h4>
                <table class="nutrition-table">
                    <thead><tr><th>Năng lượng (Calories)</th><th>Chất đạm (Protein)</th><th>Chất béo (Fat)</th></tr></thead>
                    <tbody><tr><td>${dish.nutrition.calories}</td><td>${dish.nutrition.protein}</td><td>${dish.nutrition.fat}</td></tr></tbody>
                </table>`;
        }

        dishDetailContent.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <div class="dish-info">
                <h2>
                    ${dish.name}
                    ${currentUser ? `<i class="favorite-icon ${isFavorite ? "fas active" : "far"} fa-heart" data-id="${dish.id}"></i>` : ""}
                </h2>
                <p><strong>Nguyên liệu chính:</strong> ${dish.ingredients}</p>
                <p>${dish.description}</p>
                ${nutritionTableHtml}
                <div class="avg-rating" id="avg-rating-display"></div>
            </div>`;

        const modalFavIcon = dishDetailContent.querySelector(".favorite-icon");
        if (modalFavIcon) {
            modalFavIcon.addEventListener("click", () => toggleFavorite(modalFavIcon.dataset.id));
        }
        renderComments(currentDishId);
        updateCommentFormVisibility();
        dishDetailModal.style.display = "block";
    }

    function closeModal(modal) { if (modal) modal.style.display = "none"; }

    function updateCommentFormVisibility() {
        const commentLoginPrompt = document.getElementById("comment-login-prompt");
        if (!commentLoginPrompt) return;
        if (currentUser) {
            commentLoginPrompt.classList.add("hidden");
            commentForm.classList.remove("hidden");
        } else {
            commentLoginPrompt.classList.remove("hidden");
            commentForm.classList.add("hidden");
        }
    }

    function renderComments(dishId) {
        const commentList = document.getElementById("comment-list");
        commentList.innerHTML = "";
        let allComments = JSON.parse(localStorage.getItem("comments")) || {};
        const dishComments = allComments[dishId] || [];
        let totalRating = 0;

        if (dishComments.length > 0) {
            dishComments.forEach((comment) => {
                totalRating += comment.rating;
                let stars = "";
                for (let i = 1; i <= 5; i++) { stars += `<i class="fa-star ${ i <= comment.rating ? "fas" : "far" }"></i>`; }
                const commentEl = `<div class="comment"><p class="comment-author">${comment.user}</p><div class="comment-rating">${stars}</div><p>${comment.text}</p></div>`;
                commentList.innerHTML += commentEl;
            });
            const avgRating = totalRating / dishComments.length;
            document.getElementById("avg-rating-display").textContent = `Đánh giá: ${avgRating.toFixed(1)}/5 ⭐`;
        } else {
            commentList.innerHTML = "<p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>";
            document.getElementById("avg-rating-display").textContent = "Chưa có đánh giá";
        }
    }

    function handleCommentSubmit(e) {
        e.preventDefault();
        const commentText = document.getElementById("comment-text").value;
        if (!commentText || currentRating === 0) { alert("Vui lòng viết bình luận và chọn số sao đánh giá!"); return; }
        const newComment = { user: currentUser, text: commentText, rating: currentRating };
        let allComments = JSON.parse(localStorage.getItem("comments")) || {};
        if (!allComments[currentDishId]) allComments[currentDishId] = [];
        allComments[currentDishId].push(newComment);
        localStorage.setItem("comments", JSON.stringify(allComments));
        renderComments(currentDishId);
        commentForm.reset();
        resetStars();
    }

    function handleStarRating(e) {
        if (e.target.matches(".star-rating i")) {
            const stars = document.getElementById("comment-form").querySelectorAll(".star-rating i");
            currentRating = parseInt(e.target.dataset.value);
            stars.forEach((star) => {
                if (parseInt(star.dataset.value) <= currentRating) {
                    star.classList.remove("far");
                    star.classList.add("fas", "selected");
                } else {
                    star.classList.remove("fas", "selected");
                    star.classList.add("far");
                }
            });
        }
    }

    function resetStars() {
        const stars = document.getElementById("comment-form").querySelectorAll(".star-rating i");
        stars.forEach((star) => {
            star.classList.remove("fas", "selected");
            star.classList.add("far");
        });
        currentRating = 0;
    }

    // --- Gắn các Event Listener cho trang chủ ---
    commentForm.addEventListener("submit", handleCommentSubmit);
    closeBtns.forEach((btn) => btn.addEventListener("click", () => closeModal(dishDetailModal)));
    window.addEventListener("click", (e) => { if (e.target === dishDetailModal) closeModal(dishDetailModal); });
    document.getElementById("comment-form").querySelector(".star-rating").addEventListener("click", handleStarRating);
    document.getElementById("login-from-comment").addEventListener("click", (e) => { e.preventDefault(); window.location.href = "login.html"; });
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelector(".filter-btn.active").classList.remove("active");
            button.classList.add("active");
            renderDishes(button.dataset.region, searchInput.value);
        });
    });
    searchInput.addEventListener("input", () => {
        const region = document.querySelector(".filter-btn.active").dataset.region;
        renderDishes(region, searchInput.value);
    });

    // --- Xử lý highlight và click vào carousel (cũng chỉ dành cho trang chủ) ---
    function clearHighlight() {
      document.querySelectorAll(".dish-card.highlight").forEach((el) => el.classList.remove("highlight"));
    }

    function highlightDishById(id, scrollIntoView = false) {
      const target = document.querySelector(`.dish-card[data-id="${id}"]`);
      if (!target) return;
      clearHighlight();
      target.classList.add("highlight");
      if (scrollIntoView) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    document.addEventListener("click", (e) => {
      const carouselCard = e.target.closest(".carousel .card");
      if (carouselCard) {
        const id = carouselCard.getAttribute("data-id");
        highlightDishById(id, true);
        return;
      }

      const dishCard = e.target.closest(".dish-card");
      if (dishCard && !e.target.classList.contains('favorite-icon')) { // Chắc chắn không phải click vào icon trái tim
        clearHighlight();
        dishCard.classList.add("highlight");
      }
    });

  } 

  function updateUserUI() {
    currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      userActions.classList.add("hidden");
      userInfo.classList.remove("hidden");
      welcomeMessage.textContent = `Chào, ${currentUser}!`;
    } else {
      userActions.classList.remove("hidden");
      userInfo.classList.add("hidden");
    }

    // Chỉ chạy renderDishes nếu ở trang chủ
    if (mainDishesContainer) {
      const favoritesFilterBtn = document.getElementById("favorites-filter-btn");
      if(currentUser) {
        favoritesFilterBtn.classList.remove("hidden");
      } else {
        favoritesFilterBtn.classList.add("hidden");
      }
      const searchInput = document.getElementById("search-input");
      const activeFilter = document.querySelector(".filter-btn.active").dataset.region;
      renderDishes(activeFilter, searchInput.value);
    }
  }

  updateUserUI();

});