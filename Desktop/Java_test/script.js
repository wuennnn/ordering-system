
        // JavaScript code
        const menu = document.getElementById('menu');
        const order = document.getElementById('order');
        const totalPrice = document.getElementById('totalPrice');
        let currentTotalPrice = 0;

        menu.addEventListener('click', addToOrder);
        homeMenu.addEventListener('click', addToOrder);
        order.addEventListener('click', removeFromOrder);

        function addToOrder(event) {
            if (event.target.tagName === 'LI') {
                const itemName = event.target.getAttribute('data-name');
                const itemPrice = parseInt(event.target.getAttribute('data-price'));
                const listItem = document.createElement('li');
                listItem.textContent = `${itemName} - $${itemPrice}`;

                const deleteBtn = document.createElement('span');
                deleteBtn.textContent = '刪除';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.setAttribute('data-price', itemPrice);
                
                listItem.appendChild(deleteBtn);
                order.appendChild(listItem);
                
                currentTotalPrice += itemPrice;
                totalPrice.textContent = currentTotalPrice;

                saveOrder();
            }
        }

        function removeFromOrder(event) {
            if (event.target.classList.contains('delete-btn')) {
                const itemPrice = parseInt(event.target.getAttribute('data-price'));
                const listItem = event.target.parentElement;
                order.removeChild(listItem);
                
                currentTotalPrice -= itemPrice;
                totalPrice.textContent = currentTotalPrice;

                saveOrder();
            }
        }
        function saveOrder() {
            const orderItems = [];
            order.querySelectorAll('li').forEach(item => {
                orderItems.push(item.textContent.replace('刪除', '').trim());
            });
            localStorage.setItem('order', JSON.stringify(orderItems));
            localStorage.setItem('totalPrice', currentTotalPrice);
        }

        function loadSavedOrder() {
            const savedOrder = JSON.parse(localStorage.getItem('order'));
            const savedTotalPrice = localStorage.getItem('totalPrice');

            if (savedOrder) {
                savedOrder.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item;
                    
                    const deleteBtn = document.createElement('span');
                    deleteBtn.textContent = '刪除';
                    deleteBtn.classList.add('delete-btn');
                    const itemPrice = parseInt(item.split(' - $')[1]);
                    deleteBtn.setAttribute('data-price', itemPrice);
                    
                    listItem.appendChild(deleteBtn);
                    order.appendChild(listItem);
                });

                currentTotalPrice = parseInt(savedTotalPrice);
                totalPrice.textContent = currentTotalPrice;
            }
        }


          function checkout() {
            window.location.href = 'confirmation.html';
        }

        function showHome() {
            document.getElementById('homeScreen').style.display = 'block';
            document.getElementById('categoryMenu').style.display = 'none';
        }

        function showCategoryMenu() {
            document.getElementById('homeScreen').style.display = 'none';
            document.getElementById('categoryMenu').style.display = 'block';
        }

        function showCategory(category) {
            const items = document.querySelectorAll('#menu li');
            items.forEach(item => {
                if (item.getAttribute('data-category') === category) {
                    item.style.display = 'list-item';
                }
                else {
                    item.style.display = 'none';
                }
            });
        }

        function searchMenu() {
            const searchTerm = document.getElementById('searchBox').value.toLowerCase();
            const items = document.querySelectorAll('#menu li');
            const homeItems = document.querySelectorAll('#homeMenu li');
            items.forEach(item => {
                if (item.getAttribute('data-name').toLowerCase().includes(searchTerm)) {
                    item.style.display = 'list-item';
                } else {
                    item.style.display = 'none';
                }
            });
            homeItems.forEach(homeItem => {
                if (homeItem.getAttribute('data-name').toLowerCase().includes(searchTerm)) {
                    homeItem.style.display = 'list-item';
                } else {
                    homeItem.style.display = 'none';
                }
            });
        }

        

        // Initialize view
        showHome();
        loadSavedOrder();