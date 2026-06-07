// magazin.js - Магазин спортпита с ЛОКАЛЬНЫМИ изображениями (аналог системы тренеров)

class ShopManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('fitness_cart')) || [];
        this.orders = JSON.parse(localStorage.getItem('fitness_orders')) || [];
        this.currentProductId = null;
        this.products = {
            'whey-protein': {
                name: 'Whey Protein',
                brand: 'Optimum Nutrition',
                price: 3490,
                category: 'protein',
                oldPrice: 4200,
                localImage: 'public/products/whey-protein.jpg',
                description: '100% изолят сывороточного протеина премиум-класса. Идеален для быстрого восстановления и роста мышечной массы после тренировок.',
                reviews: [
                    { userId: 2, userName: 'Александр Петров', rating: 5, text: 'Отличный протеин!', date: '2024-01-15' },
                    { userId: 3, userName: 'Мария Сидорова', rating: 4, text: 'Хорошее качество за свои деньги.', date: '2024-01-10' },
                    { userId: 4, userName: 'Дмитрий Козлов', rating: 5, text: 'Лучшее соотношение цена/качество.', date: '2024-01-05' }
                ]
            },
            'protein-bar': {
                name: 'Protein Bar',
                brand: 'Quest Nutrition',
                price: 180,
                category: 'bars',
                localImage: 'public/products/protein-bar.jpg',
                description: 'Высокобелковый батончик с низким содержанием углеводов и сахара. 20г белка, всего 4г чистых углеводов.',
                reviews: [
                    { userId: 5, userName: 'Екатерина Волкова', rating: 5, text: 'Лучшие белковые батончики!', date: '2024-01-12' },
                    { userId: 6, userName: 'Игорь Николаев', rating: 4, text: 'Удобно брать с собой в зал.', date: '2024-01-08' }
                ]
            },
            'bcaa-complex': {
                name: 'BCAA Complex',
                brand: 'MyProtein',
                price: 2150,
                category: 'amino',
                localImage: 'public/products/bcaa-complex.jpg',
                description: 'Комплекс аминокислот BCAA 2:1:1 для повышения выносливости и ускорения восстановления.',
                reviews: [
                    { userId: 7, userName: 'Сергей Иванов', rating: 5, text: 'Отлично помогают восстановиться.', date: '2024-01-14' },
                    { userId: 8, userName: 'Анна Кузнецова', rating: 4, text: 'Пью во время тренировки. Добавляет энергии.', date: '2024-01-06' }
                ]
            },
            'shaker-pro': {
                name: 'Шейкер Pro',
                brand: 'BlenderBottle',
                price: 890,
                category: 'accessories',
                oldPrice: 1200,
                localImage: 'public/products/shaker-pro.jpg',
                description: 'Профессиональный шейкер с системой смешивания BlenderBall. Не протекает, легко моется, объём 700 мл.',
                reviews: [
                    { userId: 9, userName: 'Павел Смирнов', rating: 5, text: 'Лучший шейкер из всех, что пробовал!', date: '2024-01-13' },
                    { userId: 10, userName: 'Ольга Попова', rating: 4, text: 'Качественный, не пахнет пластиком.', date: '2024-01-09' }
                ]
            },
            'vitamin-d3': {
                name: 'Vitamin D3',
                brand: 'NOW Foods',
                price: 1250,
                category: 'vitamins',
                oldPrice: 1800,
                localImage: 'public/products/vitamin-d3.jpg',
                description: 'Высокодозированный витамин D3 (5000 МЕ) для поддержки иммунитета и костной системы.',
                reviews: [
                    { userId: 11, userName: 'Николай Федоров', rating: 5, text: 'Принимаю всю зиму, стал меньше болеть.', date: '2024-01-11' }
                ]
            },
            'casein-protein': {
                name: 'Casein Protein',
                brand: 'Gold Standard',
                price: 4200,
                category: 'protein',
                localImage: 'public/products/casein-protein.jpg',
                description: 'Медленный протеин для длительного насыщения мышц аминокислотами. Идеален для приема перед сном.',
                reviews: [
                    { userId: 12, userName: 'Артем Васильев', rating: 5, text: 'Пью перед сном. Утром просыпаюсь без чувства голода.', date: '2024-01-07' },
                    { userId: 13, userName: 'Виктория Новикова', rating: 4, text: 'Хороший казеин, но густеет очень быстро.', date: '2024-01-04' }
                ]
            },
            'l-glutamine': {
                name: 'L-Glutamine',
                brand: 'BSN',
                price: 1800,
                category: 'amino',
                localImage: 'public/products/l-glutamine.jpg',
                description: 'Чистая L-глютаминовая кислота для восстановления и укрепления иммунитета. Ускоряет заживление микротравм.',
                reviews: [
                    { userId: 14, userName: 'Константин Морозов', rating: 5, text: 'Отлично помогает восстанавливаться.', date: '2024-01-03' }
                ]
            },
            'energy-bar': {
                name: 'Energy Bar',
                brand: 'Grenade',
                price: 220,
                category: 'bars',
                localImage: 'public/products/energy-bar.jpg',
                description: 'Энергетический батончик с высоким содержанием белка и клетчатки. 23г белка, 1г сахара.',
                reviews: [
                    { userId: 15, userName: 'Татьяна Орлова', rating: 5, text: 'Спасает, когда хочется сладкого на диете.', date: '2024-01-02' },
                    { userId: 16, userName: 'Роман Захаров', rating: 4, text: 'Хороший энергетический заряд перед тренировкой.', date: '2024-01-01' }
                ]
            }
        };
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.updateCartCount();
        this.loadCartItems();
        this.setupCheckoutForm();
        this.setupOrderHistoryButton();
        this.setupProductCards();
        this.setupProductModal();
        this.setupAdminIntegration();
        this.setupTestData();
        setTimeout(() => this.loadProductImages(), 100);
    }

    getProductEmoji(productId) {
        const emojis = {
            'whey-protein': '🥛💪',
            'protein-bar': '🍫💪',
            'bcaa-complex': '💊⚡',
            'shaker-pro': '🥤🔥',
            'vitamin-d3': '☀️💊',
            'casein-protein': '🥛🌙',
            'l-glutamine': '🧬💪',
            'energy-bar': '⚡🍫'
        };
        return emojis[productId] || '🏋️';
    }

    loadProductImages() {
        const productImages = document.querySelectorAll('.product-img');
        productImages.forEach(img => {
            const productId = img.getAttribute('data-product-id');
            if (productId && this.products[productId] && this.products[productId].localImage) {
                const imgUrl = this.products[productId].localImage;
                const testImg = new Image();
                testImg.onload = () => { img.src = imgUrl; };
                testImg.onerror = () => {
                    img.style.display = 'none';
                    const parent = img.parentElement;
                    if (parent && !parent.querySelector('.fallback-placeholder')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-placeholder';
                        fallback.innerHTML = this.getProductEmoji(productId);
                        fallback.style.cssText = 'width:100%; height:200px; background: linear-gradient(135deg, #2a2a2a, #1a1a1a); display:flex; align-items:center; justify-content:center; font-size:4rem; border-radius:12px;';
                        parent.appendChild(fallback);
                    }
                    console.warn(`Изображение не загружено: ${imgUrl}`);
                };
                testImg.src = imgUrl;
            } else {
                img.style.display = 'none';
                const parent = img.parentElement;
                if (parent && !parent.querySelector('.fallback-placeholder')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-placeholder';
                    fallback.innerHTML = this.getProductEmoji(productId);
                    fallback.style.cssText = 'width:100%; height:200px; background: linear-gradient(135deg, #2a2a2a, #1a1a1a); display:flex; align-items:center; justify-content:center; font-size:4rem; border-radius:12px;';
                    parent.appendChild(fallback);
                }
            }
        });
    }

    getProductImage(productId, large = false) {
        const product = this.products[productId];
        if (!product || !product.localImage) {
            return large ? `<div class="no-image-placeholder" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#2a2a2a; border-radius:16px; font-size:4rem;">${this.getProductEmoji(productId)}</div>` : this.getProductEmoji(productId);
        }
        if (large) {
            return `<img src="${product.localImage}" alt="${product.name}" class="product-modal-img" onerror="this.onerror=null;this.parentElement.innerHTML='<div class=\'no-image-placeholder\' style=\'width:200px;height:200px;display:flex;align-items:center;justify-content:center;background:#2a2a2a;border-radius:16px;font-size:4rem;\'>${this.getProductEmoji(productId)}</div>';">`;
        } else {
            return `<img src="${product.localImage}" alt="${product.name}" class="cart-item-img" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Crect width=\'60\' height=\'60\' fill=\'%23333\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' fill=\'%23999\' font-size=\'30\'%3E${this.getProductEmoji(productId)}%3C/text%3E%3C/svg%3E';">`;
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('shop-category-btn')) {
                document.querySelectorAll('.shop-category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const category = e.target.getAttribute('data-category');
                this.filterProducts(category);
            }
        });

        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.prepareCheckoutForm();
                this.openCheckoutModal();
            });
        }

        const closeCheckout = document.getElementById('closeCheckout');
        if (closeCheckout) closeCheckout.addEventListener('click', () => this.closeCheckoutModal());

        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) checkoutForm.addEventListener('submit', (e) => { e.preventDefault(); this.processOrder(); });

        const continueShopping = document.getElementById('continueShopping');
        if (continueShopping) continueShopping.addEventListener('click', () => { this.closeSuccessModal(); window.location.href = 'shop.html'; });

        const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
        deliveryOptions.forEach(option => option.addEventListener('change', () => { this.updateOrderSummary(); this.updateDeliveryAddressField(); }));

        const checkoutModal = document.getElementById('checkoutModal');
        if (checkoutModal) checkoutModal.addEventListener('click', (e) => { if (e.target === checkoutModal) this.closeCheckoutModal(); });

        const successModal = document.getElementById('successModal');
        if (successModal) successModal.addEventListener('click', (e) => { if (e.target === successModal) this.closeSuccessModal(); });

        const orderHistoryBtn = document.getElementById('orderHistoryBtn');
        if (orderHistoryBtn) orderHistoryBtn.addEventListener('click', () => this.openOrderHistoryModal());

        const closeHistoryModal = document.getElementById('closeHistoryModal');
        if (closeHistoryModal) closeHistoryModal.addEventListener('click', () => this.closeOrderHistoryModal());

        const orderHistoryModal = document.getElementById('orderHistoryModal');
        if (orderHistoryModal) orderHistoryModal.addEventListener('click', (e) => { if (e.target === orderHistoryModal) this.closeOrderHistoryModal(); });

        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeProductModal(); });
    }

    setupProductCards() {
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card && !e.target.closest('.add-to-cart')) {
                const productId = card.querySelector('.add-to-cart')?.getAttribute('data-product');
                if (productId) this.openProductModal(productId);
            }
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                e.stopPropagation();
                const btn = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
                const productId = btn.getAttribute('data-product');
                if (productId) this.addToCart(productId);
            }
        });
    }

    setupProductModal() {
        const productModal = document.getElementById('productModal');
        const closeModal = document.getElementById('closeProductModal');
        if (closeModal && productModal) closeModal.addEventListener('click', () => this.closeProductModal());
        if (productModal) productModal.addEventListener('click', (e) => { if (e.target === productModal) this.closeProductModal(); });

        const addToCartBtn = document.getElementById('addToCartFromModal');
        if (addToCartBtn) addToCartBtn.addEventListener('click', () => { if (this.currentProductId) { this.addToCart(this.currentProductId); this.showNotification('Товар добавлен в корзину!'); } });

        const ratingStars = document.getElementById('ratingStars');
        if (ratingStars) ratingStars.addEventListener('click', (e) => { if (e.target.tagName === 'SPAN') this.setRating(parseInt(e.target.getAttribute('data-rating'))); });

        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) reviewForm.addEventListener('submit', (e) => { e.preventDefault(); this.submitReview(); });
    }

    setupCheckoutForm() {
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) checkoutBtn.addEventListener('click', () => this.prepareCheckoutForm());
    }

    setupOrderHistoryButton() {
        const orderHistoryBtn = document.getElementById('orderHistoryBtn');
        if (orderHistoryBtn) {
            if (window.authManager && window.authManager.currentUser) {
                orderHistoryBtn.style.display = 'flex';
                const userId = window.authManager.currentUser.id;
                const userPurchases = JSON.parse(localStorage.getItem(`fitness_purchases_${userId}`)) || [];
                const orderCount = userPurchases.length;
                let badge = orderHistoryBtn.querySelector('.order-count-badge');
                if (!badge) { badge = document.createElement('span'); badge.className = 'order-count-badge'; orderHistoryBtn.appendChild(badge); }
                badge.textContent = orderCount;
                badge.style.display = orderCount > 0 ? 'flex' : 'none';
            } else {
                orderHistoryBtn.style.display = 'none';
            }
        }
    }

    updateDeliveryAddressField() {
        const deliveryAddress = document.getElementById('deliveryAddress');
        const deliveryMethod = document.querySelector('input[name="delivery"]:checked');
        if (!deliveryAddress) return;
        if (deliveryMethod && deliveryMethod.value === 'pickup') {
            deliveryAddress.value = 'Самовывоз из клуба';
            deliveryAddress.readOnly = true;
            deliveryAddress.required = false;
            deliveryAddress.style.background = 'rgba(255, 255, 255, 0.05)';
            deliveryAddress.style.cursor = 'not-allowed';
            deliveryAddress.style.color = 'var(--text-muted)';
            const addressHint = deliveryAddress.parentElement.querySelector('small');
            if (addressHint) addressHint.style.display = 'none';
        } else {
            if (deliveryAddress.value === 'Самовывоз из клуба') deliveryAddress.value = '';
            deliveryAddress.readOnly = false;
            deliveryAddress.required = true;
            deliveryAddress.style.background = 'rgba(255, 255, 255, 0.1)';
            deliveryAddress.style.cursor = 'text';
            deliveryAddress.style.color = 'var(--text-primary)';
            const addressHint = deliveryAddress.parentElement.querySelector('small');
            if (addressHint) addressHint.style.display = 'block';
        }
    }

    prepareCheckoutForm() {
        const checkoutName = document.getElementById('checkoutName');
        const checkoutPhone = document.getElementById('checkoutPhone');
        const checkoutEmail = document.getElementById('checkoutEmail');
        if (window.authManager && window.authManager.currentUser) {
            const user = window.authManager.currentUser;
            checkoutName.value = `${user.firstName} ${user.lastName}`;
            checkoutPhone.value = user.phone;
            checkoutEmail.value = user.email;
            checkoutName.readOnly = true;
            checkoutPhone.readOnly = true;
            checkoutEmail.readOnly = true;
        } else {
            checkoutName.value = '';
            checkoutPhone.value = '';
            checkoutEmail.value = '';
            checkoutName.readOnly = false;
            checkoutPhone.readOnly = false;
            checkoutEmail.readOnly = false;
        }
        this.updateDeliveryAddressField();
    }

    openProductModal(productId) {
        this.currentProductId = productId;
        const product = this.products[productId];
        if (!product) return;
        const modal = document.getElementById('productModal');
        if (!modal) return;

        document.getElementById('productModalName').textContent = product.name;
        document.getElementById('productModalBrand').textContent = product.brand;
        document.getElementById('productModalPrice').textContent = product.price.toLocaleString() + ' ₽';
        const oldPrice = document.getElementById('productModalOldPrice');
        if (product.oldPrice) {
            oldPrice.textContent = product.oldPrice.toLocaleString() + ' ₽';
            oldPrice.style.display = 'inline';
        } else oldPrice.style.display = 'none';
        document.getElementById('productModalDescription').textContent = product.description || 'Описание отсутствует';
        const modalImage = document.getElementById('productModalImage');
        modalImage.innerHTML = this.getProductImage(productId, true);
        const addToCartBtn = document.getElementById('addToCartFromModal');
        if (addToCartBtn) addToCartBtn.setAttribute('data-product', productId);
        this.loadProductReviews(product);
        this.checkReviewPermissions(productId);
        this.setRating(5);
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) reviewForm.reset();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeProductModal() {
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.currentProductId = null;
        }
    }

    loadProductReviews(product) {
        const reviewsContainer = document.getElementById('productModalReviews');
        if (!reviewsContainer) return;
        const reviews = product.reviews || [];
        const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
        const ratingElement = document.getElementById('productModalRating');
        if (ratingElement) ratingElement.innerHTML = `${this.getStarsHTML(avgRating)} <span class="rating-value">${avgRating.toFixed(1)}</span> (${reviews.length} ${this.getReviewWord(reviews.length)})`;
        if (reviews.length > 0) {
            reviewsContainer.innerHTML = reviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <div class="review-user">
                            <div class="review-user-avatar">${this.getUserInitials(review.userName)}</div>
                            <div class="review-user-info"><h4>${review.userName}</h4><div class="review-date">${review.date}</div></div>
                        </div>
                        <div class="review-rating">${this.getStarsHTML(review.rating)}${review.adminCreated ? '<span class="admin-badge" title="Добавлено администратором">👑</span>' : ''}</div>
                    </div>
                    <div class="review-text">${review.text}</div>
                </div>
            `).join('');
        } else reviewsContainer.innerHTML = '<div class="no-reviews">Пока нет отзывов. Будьте первым!</div>';
    }

    checkReviewPermissions(productId) {
        const addReviewSection = document.getElementById('addReviewSection');
        const reviewNotice = document.getElementById('reviewNotice');
        if (!addReviewSection || !reviewNotice) return;
        if (!window.authManager || !window.authManager.currentUser) {
            addReviewSection.style.display = 'none';
            reviewNotice.style.display = 'block';
            reviewNotice.innerHTML = '<p>Чтобы оставить отзыв, необходимо <a href="#" id="loginToReview">войти в аккаунт</a> и приобрести данный товар.</p>';
            const loginLink = reviewNotice.querySelector('#loginToReview');
            if (loginLink) loginLink.addEventListener('click', (e) => { e.preventDefault(); this.closeProductModal(); if (window.authManager) document.getElementById('authModal').classList.add('active'); });
            return;
        }
        const userId = window.authManager.currentUser.id;
        const userPurchases = JSON.parse(localStorage.getItem(`fitness_purchases_${userId}`)) || [];
        const hasPurchased = userPurchases.some(p => p.productId === productId);
        if (hasPurchased) {
            const product = this.products[productId];
            const hasReview = product.reviews?.some(r => r.userId === userId);
            if (hasReview) {
                addReviewSection.style.display = 'none';
                reviewNotice.innerHTML = '<p>Вы уже оставили отзыв на этот товар. Спасибо!</p>';
                reviewNotice.style.display = 'block';
            } else {
                addReviewSection.style.display = 'block';
                reviewNotice.style.display = 'none';
            }
        } else {
            addReviewSection.style.display = 'none';
            reviewNotice.innerHTML = '<p>Чтобы оставить отзыв, необходимо приобрести данный товар.</p>';
            reviewNotice.style.display = 'block';
        }
    }

    setRating(rating) {
        const ratingInput = document.getElementById('reviewRating');
        if (ratingInput) ratingInput.value = rating;
        const stars = document.querySelectorAll('#ratingStars span');
        stars.forEach((star, index) => { if (index < rating) { star.classList.add('active'); star.style.color = '#FFDE00'; } else { star.classList.remove('active'); star.style.color = '#666'; } });
    }

    submitReview() {
        if (!this.currentProductId || !window.authManager || !window.authManager.currentUser) { this.showNotification('Ошибка: вы не авторизованы', true); return; }
        const rating = parseInt(document.getElementById('reviewRating').value);
        const text = document.getElementById('reviewText').value.trim();
        const userId = window.authManager.currentUser.id;
        const userName = `${window.authManager.currentUser.firstName} ${window.authManager.currentUser.lastName}`;
        if (!text) { this.showNotification('Пожалуйста, напишите текст отзыва', true); return; }
        const newReview = { userId, userName, rating, text, date: new Date().toISOString().split('T')[0] };
        if (!this.products[this.currentProductId].reviews) this.products[this.currentProductId].reviews = [];
        this.products[this.currentProductId].reviews.unshift(newReview);
        this.saveProducts();
        this.loadProductReviews(this.products[this.currentProductId]);
        document.getElementById('reviewForm').reset();
        this.setRating(5);
        document.getElementById('addReviewSection').style.display = 'none';
        document.getElementById('reviewNotice').innerHTML = '<p>Спасибо за ваш отзыв! Он будет опубликован после модерации.</p>';
        document.getElementById('reviewNotice').style.display = 'block';
        this.showNotification('Отзыв успешно добавлен!');
        if (window.syncEvents) window.syncEvents.syncUserData(userId);
    }

    saveProducts() { localStorage.setItem('fitness_products', JSON.stringify(this.products)); window.dispatchEvent(new CustomEvent('productsUpdated', { detail: { timestamp: new Date().toISOString() } })); }
    
    loadProducts() { const saved = localStorage.getItem('fitness_products'); if (saved) { const parsed = JSON.parse(saved); Object.keys(parsed).forEach(key => { if (this.products[key]) this.products[key] = parsed[key]; }); } }
    
    addToCart(productId, quantity = 1) { const product = this.products[productId]; if (!product) return; const existing = this.cart.find(i => i.id === productId); if (existing) existing.quantity += quantity; else this.cart.push({ id: productId, name: product.name, brand: product.brand, price: product.price, quantity }); this.saveCart(); this.updateCartCount(); this.showNotification(`${product.name} добавлен в корзину!`); }
    
    removeFromCart(productId) { this.cart = this.cart.filter(i => i.id !== productId); this.saveCart(); this.updateCartCount(); this.loadCartItems(); this.showNotification('Товар удален из корзины'); }
    
    updateCartCount() { const total = this.cart.reduce((s, i) => s + i.quantity, 0); document.querySelectorAll('.cart-count').forEach(c => c.textContent = total); }
    
    saveCart() { localStorage.setItem('fitness_cart', JSON.stringify(this.cart)); }
    
    loadCartItems() {
        const container = document.getElementById('cartItems');
        if (!container) return;
        if (this.cart.length === 0) { container.innerHTML = `<div class="empty-cart-message"><p>Ваша корзина пуста</p><a href="shop.html" class="btn-primary">Перейти в магазин</a></div>`; return; }
        let html = '', subtotal = 0;
        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            html += `<div class="cart-item" data-product="${item.id}">
                        <div class="cart-item-image">${this.getProductImage(item.id, false)}</div>
                        <div class="cart-item-info"><div class="cart-item-name">${item.name}</div><div class="cart-item-brand">${item.brand}</div></div>
                        <div class="cart-item-controls">
                            <div class="quantity-controls"><button class="quantity-btn minus" data-product="${item.id}">-</button><span class="quantity-value">${item.quantity}</span><button class="quantity-btn plus" data-product="${item.id}">+</button></div>
                            <div class="cart-item-price">${itemTotal.toLocaleString()} ₽</div>
                            <button class="remove-item" data-product="${item.id}">🗑️</button>
                        </div>
                    </div>`;
        });
        container.innerHTML = html;
        this.updateOrderSummary(subtotal);
        container.querySelectorAll('.quantity-btn.minus').forEach(btn => btn.addEventListener('click', (e) => { const id = e.target.getAttribute('data-product'); this.updateQuantity(id, -1); }));
        container.querySelectorAll('.quantity-btn.plus').forEach(btn => btn.addEventListener('click', (e) => { const id = e.target.getAttribute('data-product'); this.updateQuantity(id, 1); }));
        container.querySelectorAll('.remove-item').forEach(btn => btn.addEventListener('click', (e) => { const id = e.target.getAttribute('data-product'); this.removeFromCart(id); }));
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) checkoutBtn.disabled = false;
    }
    
    updateQuantity(productId, change) { const item = this.cart.find(i => i.id === productId); if (!item) return; item.quantity += change; if (item.quantity <= 0) this.removeFromCart(productId); else { this.saveCart(); this.updateCartCount(); this.loadCartItems(); } }
    
    updateOrderSummary(subtotal = null) { if (subtotal === null) subtotal = this.cart.reduce((s, i) => s + (i.price * i.quantity), 0); const deliveryMethod = document.querySelector('input[name="delivery"]:checked'); const shipping = deliveryMethod?.value === 'pickup' ? 0 : 300; const total = subtotal + shipping; const subtotalEl = document.getElementById('subtotal'); if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString() + ' ₽'; const shippingEl = document.getElementById('shipping'); if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Бесплатно' : shipping.toLocaleString() + ' ₽'; const totalEl = document.getElementById('total'); if (totalEl) totalEl.textContent = total.toLocaleString() + ' ₽'; this.updateOrderReview(subtotal, shipping, total); }
    
    updateOrderReview(subtotal, shipping, total) { const orderReview = document.getElementById('orderReview'); if (!orderReview) return; orderReview.innerHTML = `<div class="order-item"><span>Товары:</span><span>${subtotal.toLocaleString()} ₽</span></div><div class="order-item"><span>Доставка:</span><span>${shipping === 0 ? 'Бесплатно' : shipping.toLocaleString() + ' ₽'}</span></div><div class="order-item" style="border-top: 2px solid var(--border); padding-top: 10px; font-weight: bold;"><span>Итого:</span><span>${total.toLocaleString()} ₽</span></div>`; }
    
    openCheckoutModal() { const modal = document.getElementById('checkoutModal'); if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; } }
    
    closeCheckoutModal() { const modal = document.getElementById('checkoutModal'); if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; } }
    
    processOrder() {
        const name = document.getElementById('checkoutName').value, phone = document.getElementById('checkoutPhone').value, email = document.getElementById('checkoutEmail').value, address = document.getElementById('deliveryAddress').value, comment = document.getElementById('orderComment').value, deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
        if (this.cart.length === 0) { this.showNotification('Корзина пуста', true); return; }
        const orderTotal = this.cart.reduce((s, i) => s + (i.price * i.quantity), 0) + (deliveryMethod === 'pickup' ? 0 : 300);
        if (window.authManager && window.authManager.currentUser) {
            const userBalance = window.authManager.currentUser.balance || 0;
            if (userBalance < orderTotal) { this.showNotification('❌ Недостаточный баланс для оплаты товара', true); setTimeout(() => { const balanceModal = document.getElementById('balanceModal'); if (balanceModal) { this.closeCheckoutModal(); balanceModal.classList.add('active'); document.body.style.overflow = 'hidden'; } }, 500); return; }
        }
        const order = { id: 'VS-' + Date.now().toString().slice(-6), userId: window.authManager?.currentUser?.id || null, userName: name, userPhone: phone, userEmail: email, date: new Date().toISOString(), items: this.cart.map(i => ({ id: i.id, name: i.name, brand: i.brand, price: i.price, quantity: i.quantity })), subtotal: this.cart.reduce((s, i) => s + (i.price * i.quantity), 0), shipping: deliveryMethod === 'pickup' ? 0 : 300, total: orderTotal, deliveryMethod, deliveryAddress: address, comment, status: 'completed' };
        if (window.authManager && window.authManager.currentUser) {
            const userId = window.authManager.currentUser.id;
            const user = window.adminManager?.getUserById(userId);
            if (user) {
                const newBalance = Math.max(0, (user.balance || 0) - orderTotal);
                window.adminManager.updateUser(userId, { balance: newBalance });
                window.authManager.currentUser.balance = newBalance;
                localStorage.setItem('current_user', JSON.stringify(window.authManager.currentUser));
                window.authManager.updateUI();
                const transactions = JSON.parse(localStorage.getItem('fitness_transactions')) || [];
                transactions.unshift({ id: 'TR-' + Date.now().toString().slice(-8), userId, amount: -orderTotal, type: 'purchase', description: `Покупка товаров на сумму ${orderTotal.toLocaleString()} ₽`, date: new Date().toISOString(), status: 'completed' });
                localStorage.setItem('fitness_transactions', JSON.stringify(transactions));
            }
        }
        this.orders.push(order);
        localStorage.setItem('fitness_orders', JSON.stringify(this.orders));
        if (window.authManager && window.authManager.currentUser) {
            const userId = window.authManager.currentUser.id;
            const userPurchases = JSON.parse(localStorage.getItem(`fitness_purchases_${userId}`)) || [];
            order.items.forEach(item => { userPurchases.push({ id: Date.now() + Math.random(), productId: item.id, productName: `${item.name} (${item.brand})`, quantity: item.quantity, price: item.price, total: item.price * item.quantity, date: new Date().toISOString(), status: 'completed', orderId: order.id }); });
            localStorage.setItem(`fitness_purchases_${userId}`, JSON.stringify(userPurchases));
        }
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.closeCheckoutModal();
        this.showSuccessModal(order);
        window.dispatchEvent(new CustomEvent('shopOrderCompleted', { detail: order }));
        if (window.authManager && window.authManager.currentUser && window.syncEvents) window.syncEvents.syncUserData(window.authManager.currentUser.id);
    }
    
    showSuccessModal(order) { const successModal = document.getElementById('successModal'); const orderNumber = document.getElementById('orderNumber'); if (successModal && orderNumber) { orderNumber.textContent = order.id; const successMessage = document.getElementById('successMessage'); if (successMessage) { if (window.authManager && window.authManager.currentUser) successMessage.innerHTML = `Заказ успешно оформлен!<br>С вашего баланса списано ${order.total.toLocaleString()} ₽<br>Текущий баланс: ${(window.authManager.currentUser.balance || 0).toLocaleString()} ₽`; else successMessage.innerHTML = order.deliveryMethod === 'pickup' ? 'Вы успешно оформили заказ. Забрать товар можно в нашем клубе в течение 3 дней.' : 'Вы успешно оформили заказ. Ожидайте доставки в течение 2-3 дней.'; } successModal.classList.add('active'); document.body.style.overflow = 'hidden'; } }
    
    closeSuccessModal() { const modal = document.getElementById('successModal'); if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; } }
    
    openOrderHistoryModal() { const modal = document.getElementById('orderHistoryModal'); if (modal) { this.loadOrderHistory(); modal.classList.add('active'); document.body.style.overflow = 'hidden'; } }
    
    closeOrderHistoryModal() { const modal = document.getElementById('orderHistoryModal'); if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; } }
    
    loadOrderHistory() { const container = document.getElementById('ordersHistoryContent'); if (!container) return; const userPurchases = JSON.parse(localStorage.getItem(`fitness_purchases_${window.authManager?.currentUser?.id}`)) || []; if (userPurchases.length === 0) { container.innerHTML = '<div class="no-orders">У вас пока нет заказов</div>'; return; } let html = ''; userPurchases.forEach(p => { const statusMap = { pending: 'В обработке', processing: 'В процессе', shipped: 'Отправлен', delivered: 'Доставлен', cancelled: 'Отменен', completed: 'Завершен' }; html += `<div class="order-item-history"><div class="order-header"><div><span class="order-number">Покупка #${p.id}</span><span class="order-status status-${p.status || 'completed'}">${statusMap[p.status] || 'Завершен'}</span></div><div class="order-date">${new Date(p.date).toLocaleDateString('ru-RU')}</div></div><div class="order-details"><div><strong>Товар:</strong> ${p.productName}</div><div><strong>Количество:</strong> ${p.quantity}</div><div><strong>Цена:</strong> ${p.price.toLocaleString()} ₽</div></div><div class="order-total">Итого: ${p.total.toLocaleString()} ₽</div></div>`; }); container.innerHTML = html; }
    
    filterProducts(category) { document.querySelectorAll('.product-card').forEach(card => { if (category === 'all' || card.getAttribute('data-category') === category) { card.style.display = 'block'; setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50); } else { card.style.opacity = '0'; card.style.transform = 'translateY(20px)'; setTimeout(() => { card.style.display = 'none'; }, 300); } }); }
    
    showNotification(message, isError = false) { const notification = document.createElement('div'); notification.className = `notification ${isError ? 'error' : ''}`; notification.innerHTML = `<div class="notification-content"><span class="notification-icon">${isError ? '❌' : '✅'}</span><span class="notification-text">${message}</span></div>`; document.body.appendChild(notification); notification.style.cssText = `position:fixed; top:20px; right:20px; padding:1rem 1.5rem; background:${isError ? '#f44336' : '#4CAF50'}; color:white; border-radius:10px; z-index:99999; transform:translateX(120%); transition:transform 0.3s ease; font-weight:500; box-shadow:0 5px 15px rgba(0,0,0,0.3); border-left:4px solid ${isError ? '#d32f2f' : '#388E3C'}; max-width:400px;`; const content = notification.querySelector('.notification-content'); if (content) content.style.cssText = 'display:flex; align-items:center; gap:10px;'; setTimeout(() => notification.style.transform = 'translateX(0)', 100); setTimeout(() => { notification.style.transform = 'translateX(120%)'; setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300); }, 4000); }
    
    getStarsHTML(rating) { const full = Math.floor(rating); const half = rating % 1 >= 0.5; const empty = 5 - full - (half ? 1 : 0); return '⭐'.repeat(full) + (half ? '⭐' : '') + '☆'.repeat(empty); }
    
    getReviewWord(count) { if (count % 10 === 1 && count % 100 !== 11) return 'отзыв'; if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'отзыва'; return 'отзывов'; }
    
    getUserInitials(name) { return name.split(' ').map(n => n[0]).join('').toUpperCase(); }
    
    setupTestData() { if (this.orders.length === 0) { const testOrders = [ { id: 'VS-000001', userId: 101, userName: 'Иван Смирнов', userPhone: '+7 (999) 111-22-33', userEmail: 'ivan@example.com', date: '2024-01-15T14:30:00', items: [{ id: 'whey-protein', name: 'Whey Protein', brand: 'Optimum Nutrition', price: 3490, quantity: 1 }, { id: 'protein-bar', name: 'Protein Bar', brand: 'Quest Nutrition', price: 180, quantity: 3 }], subtotal: 4030, shipping: 300, total: 4330, deliveryMethod: 'delivery', deliveryAddress: 'г. Москва, ул. Тверская, д. 10, кв. 25', comment: '', status: 'completed' } ]; this.orders = testOrders; localStorage.setItem('fitness_orders', JSON.stringify(testOrders)); } }
    
    setupAdminIntegration() { window.shopAdmin = { getUserOrders: (userId) => this.orders.filter(o => o.userId === userId), getUserReviews: (userId) => { const reviews = []; for (const pid in this.products) { this.products[pid].reviews?.forEach(r => { if (r.userId === userId) reviews.push({ productId: pid, productName: this.products[pid].name, productBrand: this.products[pid].brand, ...r }); }); } return reviews; }, addOrderFromAdmin: (orderData) => { const order = { id: 'ADM-' + Date.now().toString().slice(-6), ...orderData, date: new Date().toISOString(), status: 'completed', adminCreated: true }; this.orders.push(order); localStorage.setItem('fitness_orders', JSON.stringify(this.orders)); window.dispatchEvent(new CustomEvent('adminOrderCreated', { detail: order })); return order; }, updateOrderStatus: (orderId, newStatus) => { const idx = this.orders.findIndex(o => o.id === orderId); if (idx !== -1) { this.orders[idx].status = newStatus; localStorage.setItem('fitness_orders', JSON.stringify(this.orders)); window.dispatchEvent(new CustomEvent('orderStatusUpdated', { detail: { orderId, status: newStatus } })); return true; } return false; }, addReviewFromAdmin: (userId, productId, reviewData) => { const product = this.products[productId]; if (!product) return false; if (!product.reviews) product.reviews = []; const review = { userId, userName: reviewData.userName || 'Администратор', rating: reviewData.rating || 5, text: reviewData.text || '', date: new Date().toISOString().split('T')[0], adminCreated: true }; product.reviews.unshift(review); this.saveProducts(); window.dispatchEvent(new CustomEvent('adminReviewCreated', { detail: { productId, review } })); return true; }, getShopStats: () => { const totalOrders = this.orders.length; const totalRevenue = this.orders.reduce((s, o) => s + (o.total || 0), 0); const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0; const productStats = {}; for (const pid in this.products) { const product = this.products[pid]; const productOrders = this.orders.filter(o => o.items?.some(i => i.id === pid)); productStats[pid] = { name: product.name, orders: productOrders.length, revenue: productOrders.reduce((s, o) => { const item = o.items.find(i => i.id === pid); return s + (item ? item.price * item.quantity : 0); }, 0) }; } return { totalOrders, totalRevenue, averageOrderValue: avgOrder, productStats }; } }; }
    
    displayOrderHistory(containerId) { const container = document.getElementById(containerId); if (!container) return; if (!window.authManager || !window.authManager.currentUser) { container.innerHTML = `<div class="no-orders" style="text-align:center;padding:3rem;"><h3>Войдите в аккаунт</h3><p>Для просмотра истории заказов необходимо авторизоваться</p><button class="btn-primary" id="loginFromHistory" style="margin-top:1rem;">Войти в аккаунт</button></div>`; const loginBtn = container.querySelector('#loginFromHistory'); if (loginBtn) loginBtn.addEventListener('click', () => document.getElementById('authModal').classList.add('active')); return; } const userId = window.authManager.currentUser.id; container.innerHTML = `<div class="loading-orders" style="text-align:center;padding:3rem;"><div class="loading-spinner"></div><p>Загрузка истории заказов...</p></div>`; setTimeout(() => { const userPurchases = JSON.parse(localStorage.getItem(`fitness_purchases_${userId}`)) || []; if (userPurchases.length === 0) { container.innerHTML = `<div class="no-orders" style="text-align:center;padding:3rem;"><h3>Заказов пока нет</h3><p>Вы еще не сделали ни одного заказа</p><a href="shop.html" class="btn-primary" style="margin-top:1rem;">Перейти в магазин</a></div>`; return; } const ordersMap = {}; userPurchases.forEach(p => { const orderId = p.orderId || `ORD-${p.date.split('T')[0]}`; if (!ordersMap[orderId]) ordersMap[orderId] = { id: orderId, date: p.date, items: [], total: 0, status: p.status }; ordersMap[orderId].items.push(p); ordersMap[orderId].total += p.total; }); const userOrders = Object.values(ordersMap).sort((a,b) => new Date(b.date) - new Date(a.date)); let html = ''; userOrders.forEach(order => { const formattedDate = new Date(order.date).toLocaleDateString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }); const statusMap = { pending:'В обработке', processing:'В процессе', shipped:'Отправлен', delivered:'Доставлен', cancelled:'Отменен', completed:'Завершен' }; html += `<div class="order-history-card"><div class="order-history-header"><div><h3 class="text-accent">Заказ #${order.id}</h3><div class="order-history-date">${formattedDate}</div></div><span class="order-status-badge status-${order.status || 'completed'}">${statusMap[order.status] || 'Завершен'}</span></div><div class="order-history-details"><div class="order-detail-item"><span>Сумма заказа:</span><span class="order-total-amount">${order.total.toLocaleString()} ₽</span></div><div class="order-detail-item"><span>Товаров:</span><span>${order.items.length}</span></div></div><div class="order-history-items"><h4>Состав заказа:</h4>${order.items.map(item => `<div class="order-item-row"><div class="order-item-info"><span class="order-item-emoji">${this.getProductImage(item.productId, false)}</span><span>${item.productName}</span></div><div class="order-item-quantity">${item.quantity} × ${item.price.toLocaleString()} ₽</div><div class="order-item-total">${item.total.toLocaleString()} ₽</div></div>`).join('')}</div><div class="order-history-footer"><div class="order-reorder-btn"><button class="btn-secondary reorder-btn" data-order-id="${order.id}">Повторить заказ</button></div></div></div>`; }); container.innerHTML = html; container.querySelectorAll('.reorder-btn').forEach(btn => btn.addEventListener('click', (e) => { const orderId = e.target.getAttribute('data-order-id'); this.reorderFromHistory(orderId, userId); })); }, 500); }
    
    reorderFromHistory(orderId, userId) { const userPurchases = JSON.parse(localStorage.getItem(`fitness_purchases_${userId}`)) || []; const orderItems = userPurchases.filter(p => p.orderId === orderId); if (orderItems.length === 0) { this.showNotification('Не удалось найти заказ для повторения', true); return; } this.cart = []; orderItems.forEach(item => { for (let i = 0; i < item.quantity; i++) this.addToCart(item.productId); }); this.showNotification('Товары из заказа добавлены в корзину!'); setTimeout(() => window.location.href = 'cart.html', 1500); }
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('shop.html') || window.location.pathname.includes('cart.html') || window.location.pathname.includes('order-history.html')) {
        window.shopManager = new ShopManager();
        if (window.location.pathname.includes('order-history.html')) setTimeout(() => { if (window.shopManager) window.shopManager.displayOrderHistory('ordersHistoryList'); }, 500);
    }
});