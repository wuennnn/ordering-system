
        // JavaScript code
        const menu = document.getElementById('menu');
        const order = document.getElementById('order');
        const totalPrice = document.getElementById('totalPrice');
        let currentTotalPrice = 0;

        menu.addEventListener('click', addToOrder);

        function addToOrder(event) {
            if (event.target.tagName === 'LI') {
                const itemName = event.target.getAttribute('data-name');
                const itemPrice = parseInt(event.target.getAttribute('data-price'));
                const listItem = document.createElement('li');
                listItem.textContent = `${itemName} - $${itemPrice}`;
                order.appendChild(listItem);
                currentTotalPrice += itemPrice;
                totalPrice.textContent = currentTotalPrice;
            }
        }

        function checkout() {
            alert(`你的訂單總價格為 $${currentTotalPrice} 元。謝謝！`);
            // 在這裡你可以添加進一步處理訂單的代碼，比如提交到後端處理。
        }
  