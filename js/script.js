document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  const userActions = document.getElementById("user-actions");
  const userInfo = document.getElementById("user-info");
  const welcomeMessage = document.getElementById("welcome-message");

  let currentUser = null;
  let userFavorites = JSON.parse(localStorage.getItem("userFavorites")) || {};
  // chạy trên mọi trang để cập nhật trạng thái đăng nhập trên Header
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

    // Phần logic bên dưới chỉ dành cho trang chủ, nên ta sẽ kiểm tra
    const mainDishesContainer = document.getElementById("main-dishes");
    if (mainDishesContainer) {
      const favoritesFilterBtn = document.getElementById(
        "favorites-filter-btn"
      );
      if (currentUser) {
        favoritesFilterBtn.classList.remove("hidden");
      } else {
        favoritesFilterBtn.classList.add("hidden");
      }
      // Render lại món ăn để cập nhật icon trái tim sau khi đăng nhập/đăng xuất
      const searchInput = document.getElementById("search-input");
      const activeFilter =
        document.querySelector(".filter-btn.active").dataset.region;
      renderDishes(activeFilter, searchInput.value);
    }
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    // Chuyển về trang chủ sau khi đăng xuất để tránh lỗi
    if (window.location.pathname.includes("about.html")) {
      window.location.href = "index.html";
    } else {
      updateUserUI();
    }
  }

  // Luôn gắn sự kiện cho nút đăng xuất vì nó có trên mọi trang
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
  // Kiểm tra sự tồn tại của 'main-dishes' để biết có phải trang chủ không.
  // Nếu đúng, toàn bộ code bên trong sẽ được thực thi.
  const mainDishesContainer = document.getElementById("main-dishes");
  if (mainDishesContainer) {
    const dishes = [
      // Món chính
      {
        id: 1,
        name: "Phở Bò",
        category: "main",
        region: "bac",
        image: "images/pho-bo.jpg",
        description:
          "Phở Bò là biểu tượng tinh hoa của ẩm thực Hà Nội, được cả thế giới biết đến. Nước dùng trong, ngọt thanh từ xương bò hầm hàng giờ với quế, hồi, gừng nướng mang lại hương vị thơm ngào ngạt. Sợi phở mềm mịn, thịt bò tươi thái mỏng chín tái trong nước dùng nóng hổi, điểm thêm hành lá, rau thơm, chanh và ớt. Mỗi tô phở không chỉ ngon miệng mà còn gợi lên cảm giác ấm áp, gần gũi, là món ăn sáng quen thuộc của người Việt và là trải nghiệm khó quên với du khách.",
        ingredients:
          "Bánh phở, xương bò, thịt bò tái/chín, gừng, hành tím, quế, hồi, thảo quả, rau thơm, hành lá, chanh, ớt, nước mắm, muối, tiêu.",
      },

      {
        id: 2,
        name: "Bún Chả",
        category: "main",
        region: "bac",
        image: "images/bun-cha.jpg",
        description:
          "Bún Chả là món ăn gắn liền với đời sống người Hà Nội, giản dị mà tinh tế. Thịt ba chỉ và nạc vai được tẩm ướp gia vị rồi nướng trên than hoa dậy mùi thơm lừng. Khi ăn, bún tươi trắng mềm được chan cùng bát nước mắm chua ngọt, trong đó có những miếng chả nướng vàng ruộm. Rau sống tươi mát đi kèm giúp cân bằng vị béo của thịt và sự đậm đà của nước chấm. Bún Chả không chỉ hấp dẫn thực khách trong nước mà còn từng “gây sốt” với bạn bè quốc tế.",
        ingredients:
          "Bún tươi, thịt ba chỉ, thịt nạc vai, nước mắm, đường, giấm, tỏi, ớt, hạt tiêu, cà rốt, đu đủ xanh, rau thơm, xà lách.",
      },

      {
        id: 3,
        name: "Bánh Mì",
        category: "main",
        region: "nam",
        image: "images/banh-mi.jpg",
        description:
          "Bánh Mì Việt Nam là niềm tự hào của ẩm thực đường phố, đã nhiều lần lọt top những món ăn ngon nhất thế giới. Vỏ bánh giòn rụm vàng ươm, ruột xốp mềm, kết hợp cùng lớp nhân phong phú: pate béo ngậy, thịt nguội, chả lụa, rau dưa giòn mát và sốt mayonnaise đặc trưng. Tùy vùng miền, bánh mì có nhiều biến thể như bánh mì thịt nướng, bánh mì xíu mại hay bánh mì chay. Dù đơn giản hay cầu kỳ, ổ bánh mì nhỏ bé vẫn chứa đựng sự sáng tạo và tinh hoa ẩm thực Việt.",
        ingredients:
          "Bánh mì baguette, pate, thịt nguội, chả lụa, dưa leo, đồ chua (cà rốt, củ cải), rau thơm, xà lách, sốt mayonnaise, nước tương, ớt.",
      },

      {
        id: 4,
        name: "Cơm Tấm",
        category: "main",
        region: "nam",
        image: "images/com-tam.jpg",
        description:
          "Cơm Tấm là đặc sản Sài Gòn, nổi bật với hạt gạo tấm vỡ mềm dẻo, ăn kèm nhiều món mặn hấp dẫn như sườn nướng, bì, chả trứng. Trên đĩa cơm, mỡ hành béo ngậy phủ lên hạt cơm trắng, thêm chút dưa chua, dưa leo tươi mát và chan nước mắm pha đậm đà. Cơm Tấm không chỉ là bữa ăn bình dân quen thuộc mà còn trở thành nét văn hóa ẩm thực của miền Nam, được người dân và du khách yêu thích.",
        ingredients:
          "Gạo tấm, sườn nướng, bì heo, chả trứng, mỡ hành, dưa leo, cà chua, đồ chua, trứng ốp la, nước mắm pha.",
      },

      {
        id: 5,
        name: "Bún Bò Huế",
        category: "main",
        region: "trung",
        image: "images/bun-bo-hue.jpg",
        description:
          "Bún Bò Huế mang đậm dấu ấn cố đô, nổi tiếng với vị cay nồng, nước lèo đậm đà nấu từ xương bò, giò heo và mắm ruốc đặc trưng. Sợi bún to tròn, thịt bò thái lát, chả cua, giò heo được xếp đầy trong tô nước dùng đỏ au hấp dẫn. Rau sống, hoa chuối thái sợi và chanh ớt ăn kèm khiến hương vị thêm trọn vẹn. Đây không chỉ là món ăn no bụng mà còn là linh hồn của ẩm thực xứ Huế.",
        ingredients:
          "Bún sợi to, bắp bò, giò heo, chả cua, huyết heo, mắm ruốc, sả, ớt, hành lá, rau sống, hoa chuối bào, chanh, nước mắm, muối.",
      },

      {
        id: 6,
        name: "Cao Lầu",
        category: "main",
        region: "trung",
        image: "images/cao-lau.jpg",
        description:
          "Cao Lầu là món ăn gắn liền với phố cổ Hội An, với sợi mì vàng óng dai đặc biệt, được chế biến từ gạo ngâm trong nước giếng Bá Lễ. Topping gồm thịt heo xá xíu ướp đậm đà, tóp mỡ giòn rụm, rau sống tươi xanh và ít nước dùng chan vừa phải. Cao Lầu là sự hòa quyện của vị mặn mà, béo ngậy, thanh mát, mang lại trải nghiệm độc đáo khó tìm thấy ở nơi khác. Đây được xem như “linh hồn” ẩm thực của Hội An.",
        ingredients:
          "Mì Cao Lầu, thịt heo xá xíu, tóp mỡ, giá đỗ, rau sống (xà lách, rau thơm), nước dùng ninh từ xương, hành phi.",
      },

      // Món ăn vặt
      {
        id: 7,
        name: "Nem Rán (Chả Giò)",
        category: "snack",
        region: "bac",
        image: "images/nem-ran.jpg",
        description:
          "Nem Rán (hay còn gọi là Chả Giò ở miền Nam) là món ăn truyền thống trong các dịp lễ Tết và mâm cỗ gia đình. Những chiếc nem được cuốn khéo léo từ lớp bánh đa nem mỏng, nhân thịt heo, mộc nhĩ, miến, cà rốt và trứng, sau đó chiên vàng giòn rụm. Khi cắn, lớp vỏ giòn tan hòa quyện với phần nhân mềm thơm, đậm đà. Nem rán thường ăn kèm rau sống, bún và nước chấm pha chua ngọt, tạo nên hương vị hấp dẫn khó cưỡng.",
        ingredients:
          "Thịt heo băm, mộc nhĩ, miến dong, cà rốt, trứng gà, hành khô, bánh đa nem, hạt tiêu, nước mắm, dầu ăn, rau sống.",
      },

      {
        id: 8,
        name: "Bánh Xèo",
        category: "snack",
        region: "nam",
        image: "images/banh-xeo.jpg",
        description:
          "Bánh Xèo miền Nam có lớp vỏ vàng óng, giòn rụm nhờ bột gạo trộn với bột nghệ và nước cốt dừa. Nhân bánh gồm tôm, thịt heo, giá đỗ, đôi khi thêm nấm hoặc hải sản. Khi ăn, người ta cắt bánh, cuốn cùng rau sống và chấm nước mắm chua ngọt. Sự kết hợp của lớp vỏ giòn, nhân đậm đà và rau tươi mát tạo nên trải nghiệm ẩm thực độc đáo, khiến bánh xèo trở thành món ăn vặt được yêu thích khắp ba miền.",
        ingredients:
          "Bột gạo, bột nghệ, nước cốt dừa, tôm, thịt ba chỉ, giá đỗ, nấm, hành lá, rau sống, nước mắm pha.",
      },

      {
        id: 9,
        name: "Gỏi Cuốn",
        category: "snack",
        region: "nam",
        image: "images/goi-cuon.jpg",
        description:
          "Gỏi Cuốn là món ăn thanh mát và bổ dưỡng, thường được chọn cho những bữa ăn nhẹ. Bánh tráng mềm dẻo cuốn cùng tôm, thịt heo luộc, bún tươi và rau sống. Khi ăn, gỏi cuốn chấm với nước mắm tỏi ớt hoặc tương đậu phộng béo ngậy, mang lại cảm giác vừa thanh đạm vừa đậm đà. Đây là món ăn nổi tiếng của Việt Nam được nhiều du khách quốc tế ưa chuộng bởi sự đơn giản nhưng tinh tế.",
        ingredients:
          "Bánh tráng, bún tươi, tôm luộc, thịt heo luộc, rau thơm, xà lách, hẹ, nước mắm chua ngọt hoặc tương đậu phộng.",
      },

      {
        id: 10,
        name: "Bột Chiên",
        category: "snack",
        region: "nam",
        image: "images/bot-chien.jpg",
        description:
          "Bột Chiên là món ăn vặt quen thuộc với học sinh, sinh viên Sài Gòn. Những miếng bột gạo được chiên vàng giòn bên ngoài, dẻo bên trong, rồi đảo cùng trứng gà thơm phức. Khi dọn ra, bột chiên được ăn kèm đu đủ bào chua ngọt, hành lá và chấm với xì dầu pha tương ớt. Vị giòn, dẻo, béo và chua ngọt kết hợp hài hòa, tạo nên sức hút khó cưỡng.",
        ingredients:
          "Bột gạo, trứng gà, hành lá, đu đủ bào, xì dầu, giấm, đường, tương ớt, dầu ăn.",
      },

      {
        id: 11,
        name: "Chè Ba Miền",
        category: "snack",
        region: "all",
        image: "images/che.jpg",
        description:
          "Chè là món ăn tráng miệng ngọt mát phổ biến ở khắp ba miền Việt Nam, với vô số biến thể phong phú. Từ chè đậu xanh, đậu đỏ, đậu đen đến chè thập cẩm với thạch, trân châu và nước cốt dừa béo ngậy, mỗi loại chè đều mang hương vị riêng. Vào những ngày hè oi ả, một cốc chè mát lạnh không chỉ giải nhiệt mà còn gợi cảm giác vui tươi, gần gũi. Đây là món ăn vặt dân dã nhưng luôn có sức hút đặc biệt.",
        ingredients:
          "Đậu xanh, đậu đỏ, đậu đen, bột báng, hạt sen, thạch rau câu, nước cốt dừa, đường, đá bào.",
      },

      {
        id: 12,
        name: "Bánh Tráng Nướng",
        category: "snack",
        region: "trung",
        image: "images/banh-trang-nuong.jpg",
        description:
          "Bánh Tráng Nướng, thường được gọi vui là “pizza Việt Nam”, là món ăn vặt cực kỳ phổ biến ở Đà Lạt và nhiều nơi khác. Lớp bánh tráng mỏng được nướng giòn trên than hồng, thêm trứng cút, hành lá, xúc xích, thịt băm, ruốc khô và sốt mayonnaise. Mỗi chiếc bánh vừa giòn, vừa béo, vừa mặn ngọt, khiến ai ăn thử một lần đều nhớ mãi.",
        ingredients:
          "Bánh tráng, trứng cút, hành lá, xúc xích, thịt băm, ruốc khô, phô mai, sốt mayonnaise, tương ớt.",
      },

      // Đặc sản
      {
        id: 13,
        name: "Phở Cuốn",
        category: "specialty",
        region: "bac",
        image: "images/pho-cuon.jpg",
        description:
          "Phở cuốn Hà Nội có bánh phở mềm cuốn thịt bò xào thơm, rau sống, chấm nước mắm tỏi ớt đậm đà.",
        ingredients: "Bánh phở, thịt bò, xà lách, rau thơm, nước mắm, tỏi, ớt.",
      },
      {
        id: 14,
        name: "Mì Quảng",
        category: "specialty",
        region: "trung",
        image: "images/mi-quang.jpg",
        description:
          "Mì Quảng là đặc sản Quảng Nam, sợi mì vàng dai, nước dùng ít nhưng đậm đà, ăn kèm tôm, thịt và bánh tráng mè.",
        ingredients:
          "Mì Quảng, tôm, thịt gà, trứng, lạc rang, rau sống, bánh tráng.",
      },
      {
        id: 15,
        name: "Bánh Căn",
        category: "specialty",
        region: "trung",
        image: "images/banh-can.jpg",
        description:
          "Bánh căn là món bánh gạo nhỏ nướng trong khuôn đất, ăn kèm nước chấm và rau sống, đặc sản miền Nam Trung Bộ.",
        ingredients: "Bột gạo, trứng, hải sản (tôm, mực), hành lá, mỡ hành.",
      },
      {
        id: 16,
        name: "Lẩu Mắm",
        category: "specialty",
        region: "nam",
        image: "images/lau-mam.jpg",
        description:
          "Lẩu mắm miền Tây có nước dùng nấu từ mắm cá sặc, đậm đà và thơm nồng, ăn kèm đa dạng rau đồng và hải sản.",
        ingredients: "Mắm cá, cá, tôm, mực, thịt ba chỉ, cà tím, rau các loại.",
      },
      {
        id: 17,
        name: "Chả Cá Lã Vọng",
        category: "specialty",
        region: "bac",
        image: "images/cha-ca.jpg",
        description:
          "Chả Cá Lã Vọng là đặc sản Hà Nội, cá lăng tẩm ướp nghệ nướng, ăn kèm bún, lạc rang, thì là và mắm tôm.",
        ingredients: "Cá lăng, nghệ, thì là, hành lá, bún, mắm tôm, lạc rang.",
      },
      {
        id: 18,
        name: "Bánh Bèo",
        category: "specialty",
        region: "trung",
        image: "images/banh-beo.jpg",
        description:
          "Bánh bèo Huế nhỏ xinh, mềm mịn, ăn kèm tôm cháy, mỡ hành và chan nước mắm mặn ngọt.",
        ingredients: "Bột gạo, tôm khô, hành lá, mỡ hành, nước mắm.",
      },
      {
        id: 19,
        name: "Thịt Chua Phú Thọ",
        category: "specialty",
        region: "bac",
        image: "images/thit-chua.jpg",
        description:
          "Thịt chua Phú Thọ được làm từ thịt lợn ướp thính, lên men tự nhiên, có vị chua nhẹ đặc trưng.",
        ingredients: "Thịt lợn nạc, bì lợn, thính gạo, lá ổi.",
      },
      {
        id: 20,
        name: "Bánh Gai",
        category: "specialty",
        region: "bac",
        image: "images/banh-gai.jpg",
        description:
          "Bánh gai truyền thống với vỏ đen từ lá gai, nhân đậu xanh dừa ngọt bùi, thường xuất hiện trong lễ hội.",
        ingredients: "Bột nếp, lá gai, đậu xanh, dừa nạo, mỡ lợn, đường.",
      },
      {
        id: 21,
        name: "Nem Chua Thanh Hóa",
        category: "specialty",
        region: "bac",
        image: "images/nem-chua.jpg",
        description:
          "Nem chua Thanh Hóa nổi tiếng cả nước với hương vị chua nhẹ, cay nồng của ớt, thơm mùi tỏi và lá đinh lăng. Đây là món ăn chơi hấp dẫn và cũng là món quà ý nghĩa của xứ Thanh.",
        ingredients:
          "Thịt heo nạc, bì lợn, thính gạo, tỏi, ớt, lá đinh lăng, lá chuối, gia vị.",
      },
      {
        id: 22,
        name: "Hủ Tiếu",
        category: "specialty",
        region: "nam",
        image: "images/hu-tieu.jpg",
        description:
          "Hủ tiếu là món ăn đặc sản miền Nam có nguồn gốc Hoa, nước dùng ngọt thanh từ xương heo, sợi hủ tiếu dai mềm, ăn kèm thịt heo, tôm, gan và rau sống. Các biến thể nổi tiếng gồm hủ tiếu Nam Vang, Mỹ Tho, Sa Đéc.",
        ingredients:
          "Sợi hủ tiếu, xương heo, thịt nạc, gan heo, tôm, trứng cút, giá đỗ, hẹ, xà lách, hành phi, nước mắm, muối, tiêu.",
      },
    ];

    // Lấy các element CỦA TRANG CHỦ
    const snackDishesContainer = document.getElementById("snack-dishes");
    const specialtyDishesContainer =
      document.getElementById("specialty-dishes");
    const favoriteDishesContainer = document.getElementById("favorite-dishes");
    const favoritesSection = document.getElementById("favorites-section");
    const mainSections = document.querySelectorAll(
      ".category:not(#favorites-section)"
    );
    const dishDetailModal = document.getElementById("dish-detail-modal");
    const closeBtns = document.querySelectorAll(".close-btn");
    const commentForm = document.getElementById("comment-form");
    const searchInput = document.getElementById("search-input");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let currentDishId = null;
    let currentRating = 0;

    // --- Toàn bộ các hàm chức năng của trang chủ (renderDishes, toggleFavorite,...) ---
    function saveUserFavorites() {
      localStorage.setItem("userFavorites", JSON.stringify(userFavorites));
    }
    function toggleFavorite(dishId) {
      if (!currentUser) {
        alert("Vui lòng đăng nhập để sử dụng tính năng này!");
        return;
      }
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
      const activeFilter =
        document.querySelector(".filter-btn.active").dataset.region;
      renderDishes(activeFilter, searchInput.value);
      if (
        !dishDetailModal.classList.contains("hidden") &&
        currentDishId === dishIdNum
      ) {
        const modalIcon = document.querySelector(
          "#dish-detail-content .favorite-icon"
        );
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
      const currentUserFavs =
        currentUser && userFavorites[currentUser]
          ? userFavorites[currentUser]
          : [];
      let dishesToDisplay;
      if (regionFilter === "favorites") {
        favoritesSection.classList.remove("hidden");
        mainSections.forEach((sec) => sec.classList.add("hidden"));
        dishesToDisplay = dishes.filter(
          (dish) =>
            currentUserFavs.includes(dish.id) &&
            dish.name.toLowerCase().includes(lowerCaseSearchTerm)
        );
      } else {
        favoritesSection.classList.add("hidden");
        mainSections.forEach((sec) => sec.classList.remove("hidden"));
        dishesToDisplay = dishes.filter((dish) => {
          const regionMatch =
            regionFilter === "all" ||
            dish.region === regionFilter ||
            dish.region === "all";
          const searchMatch = dish.name
            .toLowerCase()
            .includes(lowerCaseSearchTerm);
          return regionMatch && searchMatch;
        });
      }
      if (dishesToDisplay.length === 0) {
        const targetContainer =
          regionFilter === "favorites"
            ? favoriteDishesContainer
            : mainDishesContainer;
        targetContainer.innerHTML =
          '<p style="text-align: center; width: 100%; grid-column: 1 / -1;">Không tìm thấy món ăn phù hợp.</p>';
      }
      dishesToDisplay.forEach((dish) => {
        const isFavorite = currentUserFavs.includes(dish.id);
        const dishCard = ` <div class="dish-card" data-id="${dish.id}"> ${
          currentUser
            ? `<i class="favorite-icon ${
                isFavorite ? "fas active" : "far"
              } fa-heart" data-id="${dish.id}"></i>`
            : ""
        } <img src="${dish.image}" alt="${
          dish.name
        }"> <div class="dish-card-content"> <h4>${
          dish.name
        }</h4> <p>${dish.description.substring(0, 100)}...</p> </div> </div>`;
        if (regionFilter === "favorites") {
          favoriteDishesContainer.innerHTML += dishCard;
        } else {
          if (dish.category === "main")
            mainDishesContainer.innerHTML += dishCard;
          else if (dish.category === "snack")
            snackDishesContainer.innerHTML += dishCard;
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
      const currentUserFavs =
        currentUser && userFavorites[currentUser]
          ? userFavorites[currentUser]
          : [];
      const isFavorite = currentUserFavs.includes(dish.id);
      const dishDetailContent = document.getElementById("dish-detail-content");
      dishDetailContent.innerHTML = ` <img src="${dish.image}" alt="${
        dish.name
      }"> <div class="dish-info"> <h2> ${dish.name} ${
        currentUser
          ? `<i class="favorite-icon ${
              isFavorite ? "fas active" : "far"
            } fa-heart" data-id="${dish.id}"></i>`
          : ""
      } </h2> <p><strong>Nguyên liệu chính:</strong> ${
        dish.ingredients
      }</p> <p>${
        dish.description
      }</p> <div class="avg-rating" id="avg-rating-display"></div> </div>`;
      const modalFavIcon = dishDetailContent.querySelector(".favorite-icon");
      if (modalFavIcon) {
        modalFavIcon.addEventListener("click", () =>
          toggleFavorite(modalFavIcon.dataset.id)
        );
      }
      renderComments(currentDishId);
      updateCommentFormVisibility();
      dishDetailModal.style.display = "block";
    }
    function closeModal(modal) {
      if (modal) modal.style.display = "none";
    }
    function updateCommentFormVisibility() {
      const commentLoginPrompt = document.getElementById(
        "comment-login-prompt"
      );
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
          for (let i = 1; i <= 5; i++) {
            stars += `<i class="fa-star ${
              i <= comment.rating ? "fas" : "far"
            }"></i>`;
          }
          const commentEl = `<div class="comment"><p class="comment-author">${comment.user}</p><div class="comment-rating">${stars}</div><p>${comment.text}</p></div>`;
          commentList.innerHTML += commentEl;
        });
        const avgRating = totalRating / dishComments.length;
        document.getElementById(
          "avg-rating-display"
        ).textContent = `Đánh giá: ${avgRating.toFixed(1)}/5 ⭐`;
      } else {
        commentList.innerHTML =
          "<p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>";
        document.getElementById("avg-rating-display").textContent =
          "Chưa có đánh giá";
      }
    }
    function handleCommentSubmit(e) {
      e.preventDefault();
      const commentText = document.getElementById("comment-text").value;
      if (!commentText || currentRating === 0) {
        alert("Vui lòng viết bình luận và chọn số sao đánh giá!");
        return;
      }
      const newComment = {
        user: currentUser,
        text: commentText,
        rating: currentRating,
      };
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
        const stars = document
          .getElementById("comment-form")
          .querySelectorAll(".star-rating i");
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
      const stars = document
        .getElementById("comment-form")
        .querySelectorAll(".star-rating i");
      stars.forEach((star) => {
        star.classList.remove("fas", "selected");
        star.classList.add("far");
      });
      currentRating = 0;
    }

    // --- Gắn các Event Listener cho trang chủ ---
    commentForm.addEventListener("submit", handleCommentSubmit);
    closeBtns.forEach((btn) =>
      btn.addEventListener("click", () => closeModal(dishDetailModal))
    );
    window.addEventListener("click", (e) => {
      if (e.target === dishDetailModal) closeModal(dishDetailModal);
    });
    document
      .getElementById("comment-form")
      .querySelector(".star-rating")
      .addEventListener("click", handleStarRating);
    document
      .getElementById("login-from-comment")
      .addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "login.html";
      });
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        button.classList.add("active");
        renderDishes(button.dataset.region, searchInput.value);
      });
    });
    searchInput.addEventListener("input", () => {
      const region =
        document.querySelector(".filter-btn.active").dataset.region;
      renderDishes(region, searchInput.value);
    });
  }
  // Gọi hàm này để cập nhật header ngay khi trang tải xong
  updateUserUI();
});

// ===== click vào ảnh nó sẽ duy chuyển xuống hình ảnh bên dưới  =====
function clearHighlight() {
  document
    .querySelectorAll(".dish-card.highlight")
    .forEach((el) => el.classList.remove("highlight"));
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

// ===== Event delegation: bắt click ở carousel & danh sách bên dưới =====
document.addEventListener("click", (e) => {
  // 1) Click vào card trong CAROUSEL -> highlight món tương ứng dưới & scroll tới
  const carouselCard = e.target.closest(".carousel .card");
  if (carouselCard) {
    const id = carouselCard.getAttribute("data-id");
    highlightDishById(id, true);
    return; // ngăn xử lý tiếp
  }

  // 2) Click trực tiếp vào card MÓN ĂN BÊN DƯỚI -> highlight ngay card đó
  const dishCard = e.target.closest(".dish-card");
  if (dishCard) {
    clearHighlight();
    dishCard.classList.add("highlight");
    return;
  }
});
