const menu = document.getElementById('menu');
const homeMenu = document.getElementById('homeMenu');
const order = document.getElementById('order');
const orderList = document.getElementById('orderList');
const totalPrice = document.getElementById('totalPrice');
let currentTotalPrice = 0;

homeMenu.addEventListener('click', addToOrder);
orderList.addEventListener('click', removeFromOrder);


function addToOrder(event) {
    if (event.target.tagName === 'LI') {
        const itemName = event.target.getAttribute('data-name');
        const itemPrice = parseInt(event.target.getAttribute('data-price'), 10);
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `${itemName} - $${itemPrice}`;
        
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = ' 刪除';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.setAttribute('data-price', itemPrice);
        
        listItem.appendChild(deleteBtn);
        orderList.appendChild(listItem);

        currentTotalPrice += itemPrice;
        totalPrice.textContent = currentTotalPrice;

        saveOrder();
        
    }
}

function removeFromOrder(event) {
    if (event.target.classList.contains('delete-btn')) {
        const itemPrice = parseInt(event.target.getAttribute('data-price'), 10);
        const listItem = event.target.parentElement;
        orderList.removeChild(listItem);
        
        currentTotalPrice -= itemPrice;
        totalPrice.textContent = currentTotalPrice;

        saveOrder();
        
    }
}

function saveOrder() {
    const orderItems = [];
    orderList.querySelectorAll('li').forEach(item => {
        orderItems.push(item.textContent.replace(' 刪除', '').trim());
    });
    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('customerPhone').value; // 修改此处的 ID 为 customerPhone
    
    localStorage.setItem('order', JSON.stringify(orderItems));
    localStorage.setItem('totalPrice', currentTotalPrice);
    localStorage.setItem('customerName', customerName);
    localStorage.setItem('customerPhone', phoneNumber); // 修改此处的 localStorage 键为 'customerPhone'
}

function loadSavedOrder() {
    const savedOrder = JSON.parse(localStorage.getItem('order'));
    const savedTotalPrice = localStorage.getItem('totalPrice');

    if (savedOrder) {
        savedOrder.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = item;
            
            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = ' 刪除';
            deleteBtn.classList.add('delete-btn');
            const itemPrice = parseInt(item.split(' - $')[1]);
            deleteBtn.setAttribute('data-price', itemPrice);
            
            listItem.appendChild(deleteBtn);
            orderList.appendChild(listItem);
        });

        currentTotalPrice = parseInt(savedTotalPrice, 10);
        totalPrice.textContent = currentTotalPrice;
    }
}

function checkout() {
    window.location.href = 'confirmation.html';
}

function showHome() {
    document.getElementById('homeScreen').style.display = 'block';
    document.getElementById('foodMenu').style.display = 'none';
    document.getElementById('orderSummary').style.display = 'none';
}

function showOrder() {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('foodMenu').style.display = 'none';
    document.getElementById('orderSummary').style.display = 'block';
}

function showCategory(category) {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('orderSummary').style.display = 'none';
    document.getElementById('foodMenu').style.display = 'block';

    const items = document.querySelectorAll('#menu .list-group-item');
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        item.style.display = itemCategory === category ? '' : 'none';
    });
}

function searchMenu() {
    const searchBox = document.getElementById('searchBox');
    const filter = searchBox.value.toLowerCase();
    const items = document.querySelectorAll('#homeMenu .list-group-item, #menu .list-group-item');

    items.forEach(item => {
        const itemName = item.dataset.name.toLowerCase();
        if (itemName.includes(filter)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
function updateOrderScreen() {
    const orderList = document.getElementById('orderList');
    const totalOrderPrice = document.getElementById('totalOrderPrice');
    orderList.innerHTML = '';
    let currentTotalOrderPrice = 0;
    order.querySelectorAll('li').forEach(item => {
        const orderItem = document.createElement('li');
        orderItem.textContent = item.textContent.replace(' 刪除', '');
        orderList.appendChild(orderItem);
        const itemPrice = parseInt(item.textContent.split(' - $')[1]);
        currentTotalOrderPrice += itemPrice;
    });
    totalOrderPrice.textContent = currentTotalOrderPrice;
}

document.addEventListener('DOMContentLoaded', () => {
    loadSavedOrder();
    showHome();
});



/* 初始化页面
showHome();
loadSavedOrder();
*/