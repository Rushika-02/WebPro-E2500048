// Cart functionality
document.addEventListener("DOMContentLoaded", function () {
    // Mobile navbar functionality
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');

    if (bar) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
        });
    }

    if (close) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    }

    // Cart management
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Add to cart functionality in shop page
    const addToCartButtons = document.querySelectorAll('.cart');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach((btn, index) => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent product page navigation when clicking cart icon
                
                // Get product information from the parent element
                const productDiv = this.closest('.pro');
                const productImg = productDiv.querySelector('img').src;
                const productName = productDiv.querySelector('h5').textContent;
                const productPrice = productDiv.querySelector('h4').textContent.replace('$', '');
                
                // Check if product already exists in cart
                const existingProduct = cart.find(item => item.name === productName);
                
                if (existingProduct) {
                    existingProduct.quantity += 1;
                    existingProduct.subtotal = existingProduct.quantity * existingProduct.price;
                } else {
                    // Add to cart array
                    cart.push({
                        id: Date.now() + index,
                        img: productImg,
                        name: productName,
                        price: parseFloat(productPrice),
                        quantity: 1,
                        subtotal: parseFloat(productPrice)
                    });
                }
                
                // Save to localStorage
                saveCart();
                
                // Show confirmation feedback
                showToast('Item added to cart!');
            });
        });
    }

    // Handle quantity changes in cart page
    const quantityInputs = document.querySelectorAll('#cart input[type="number"]');
    if (quantityInputs.length > 0) {
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                const row = this.closest('tr');
                const productName = row.querySelector('td:nth-child(3)').textContent;
                const price = parseFloat(row.querySelector('td:nth-child(4)').textContent.replace('$', ''));
                const quantity = parseInt(this.value);
                const subtotalCell = row.querySelector('td:last-child');
                
                // Update subtotal display
                const subtotal = price * quantity;
                subtotalCell.textContent = `$${subtotal}`;
                
                // Update cart object
                const product = cart.find(item => item.name === productName);
                if (product) {
                    product.quantity = quantity;
                    product.subtotal = subtotal;
                    saveCart();
                }
                
                // Update cart totals
                updateCartTotals();
            });
        });
    }

    // Remove item from cart
    const removeButtons = document.querySelectorAll('#cart .far.fa-times-circle');
    if (removeButtons.length > 0) {
        removeButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const row = this.closest('tr');
                const productName = row.querySelector('td:nth-child(3)').textContent;
                
                // Remove from cart array
                cart = cart.filter(item => item.name !== productName);
                
                // Remove row from table
                row.remove();
                
                // Save updated cart
                saveCart();
                
                // Update totals
                updateCartTotals();
            });
        });
    }

    // Apply coupon button
    const couponButton = document.querySelector('#coupon button');
    if (couponButton) {
        couponButton.addEventListener('click', function() {
            const couponInput = document.querySelector('#coupon input');
            const couponCode = couponInput.value.trim();
            
            if (couponCode === 'SAVE20') {
                // Apply 20% discount
                applyCouponDiscount(0.2);
                showToast('Coupon applied: 20% off!');
            } else if (couponCode) {
                showToast('Invalid coupon code');
            }
        });
    }

    // Proceed to checkout button
    const checkoutButton = document.querySelector('#Subtotal button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length > 0) {
                alert('Proceeding to checkout!');
                // Here you would typically redirect to a checkout page
            } else {
                showToast('Your cart is empty');
            }
        });
    }

    // Helper functions
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        // Update cart icon with item count
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartIcon = document.querySelector('#navbar li a[href="cart.html"] i, #mobile a[href="cart.html"] i');
        
        if (cartIcon && cartCount > 0) {
            // Create or update cart count badge
            let badge = document.querySelector('.cart-count');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-count';
                cartIcon.parentNode.appendChild(badge);
            }
            badge.textContent = cartCount;
        }
    }

    function showToast(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Show and then remove after delay
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    }

    function updateCartTotals() {
        const subtotalElement = document.querySelector('#Subtotal table tr:first-child td:last-child');
        const totalElement = document.querySelector('#Subtotal table tr:last-child td:last-child');
        
        if (subtotalElement && totalElement) {
            const cartTotal = cart.reduce((total, item) => total + item.subtotal, 0);
            subtotalElement.textContent = `$${cartTotal.toFixed(2)}`;
            totalElement.textContent = `$${cartTotal.toFixed(2)}`;
        }
    }

    function applyCouponDiscount(discountRate) {
        const totalElement = document.querySelector('#Subtotal table tr:last-child td:last-child');
        if (totalElement) {
            const subtotal = cart.reduce((total, item) => total + item.subtotal, 0);
            const discountedTotal = subtotal * (1 - discountRate);
            totalElement.textContent = `$${discountedTotal.toFixed(2)}`;
            
            // Add discount row if it doesn't exist
            const discountRow = document.querySelector('#Subtotal table tr.discount-row');
            if (!discountRow) {
                const newRow = document.createElement('tr');
                newRow.className = 'discount-row';
                newRow.innerHTML = `
                    <td>Discount</td>
                    <td>-$${(subtotal * discountRate).toFixed(2)}</td>
                `;
                const shippingRow = document.querySelector('#Subtotal table tr:nth-child(2)');
                shippingRow.after(newRow);
            } else {
                discountRow.querySelector('td:last-child').textContent = `-$${(subtotal * discountRate).toFixed(2)}`;
            }
        }
    }

    // Initialize cart page if we're on it
    if (window.location.pathname.includes('cart.html')) {
        loadCartItems();
        updateCartTotals();
    }

    function loadCartItems() {
        const cartTableBody = document.querySelector('#cart tbody');
        if (cartTableBody) {
            // Clear existing items (demo items from HTML)
            cartTableBody.innerHTML = '';
            
            // Add items from cart array
            if (cart.length === 0) {
                cartTableBody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 30px;">
                            Your cart is empty. <a href="shop.html">Continue shopping</a>
                        </td>
                    </tr>
                `;
            } else {
                cart.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><a href=""><i class="far fa-times-circle"></i></a></td>
                        <td><img src="${item.img}" alt=""></td>
                        <td>${item.name}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td><input type="number" value="${item.quantity}" min="1"></td>
                        <td>$${item.subtotal.toFixed(2)}</td>
                    `;
                    cartTableBody.appendChild(row);
                });
                
                // Re-attach event listeners for the newly created elements
                const newQuantityInputs = cartTableBody.querySelectorAll('input[type="number"]');
                newQuantityInputs.forEach(input => {
                    input.addEventListener('change', function() {
                        const row = this.closest('tr');
                        const productName = row.querySelector('td:nth-child(3)').textContent;
                        const price = parseFloat(row.querySelector('td:nth-child(4)').textContent.replace('$', ''));
                        const quantity = parseInt(this.value);
                        const subtotalCell = row.querySelector('td:last-child');
                        
                        const subtotal = price * quantity;
                        subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
                        
                        const product = cart.find(item => item.name === productName);
                        if (product) {
                            product.quantity = quantity;
                            product.subtotal = subtotal;
                            saveCart();
                        }
                        
                        updateCartTotals();
                    });
                });
                
                const newRemoveButtons = cartTableBody.querySelectorAll('.far.fa-times-circle');
                newRemoveButtons.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        const row = this.closest('tr');
                        const productName = row.querySelector('td:nth-child(3)').textContent;
                        
                        cart = cart.filter(item => item.name !== productName);
                        row.remove();
                        saveCart();
                        updateCartTotals();
                        
                        if (cart.length === 0) {
                            cartTableBody.innerHTML = `
                                <tr>
                                    <td colspan="6" style="text-align: center; padding: 30px;">
                                        Your cart is empty. <a href="shop.html">Continue shopping</a>
                                    </td>
                                </tr>
                            `;
                        }
                    });
                });
            }
        }
    }
});