const form = document.querySelector('.ticket-form');
const ticketTypeElement = document.getElementById('ticket-type');
const quantityElement = document.getElementById('quantity');
const cartItemsElement = document.getElementById('cart-items');
const summaryTotalPriceElement = document.getElementById('summary-total-price');
const clearCartButton = document.getElementById('clear-cart-btn');
const checkoutButton = document.getElementById('checkout-btn');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const ticketType = ticketTypeElement.value;
  const quantity = parseInt(quantityElement.value);

  if (isNaN(quantity) || quantity <= 0) {
    alert('Пожалуйста, введите корректное количество билетов.');
    return;
  }

  if (quantity > 10) {
    alert('Вы можете купить только до 10 билетов.');
    return;
  }

  const price = calculateTicketPrice(ticketType, quantity);

  addToCart(ticketType, quantity, price);
  updateCartSummary();
  form.reset();
});

clearCartButton.addEventListener('click', function() {
  clearCart();
});

checkoutButton.addEventListener('click', function() {
  checkout();
});

function calculateTicketPrice(ticketType, quantity) {
  let price = 0;

  if (ticketType === 'adult') {
    price = 500;
  } else if (ticketType === 'child') {
    price = 250;
  } else if (ticketType === 'family') {
    price = 350;
  }

  return price * quantity;
}

function addToCart(ticketType, quantity, price) {
  const cartItemRow = document.createElement('tr');
  cartItemRow.innerHTML = `
    <td>${getTicketTypeLabel(ticketType)}</td>
    <td>${quantity}</td>
    <td>${price}</td>
  `;
  cartItemsElement.appendChild(cartItemRow);
}

function updateCartSummary() {
  const cartRows = cartItemsElement.querySelectorAll('tr');
  let total = 0;

  cartRows.forEach(function(row) {
    const priceCell = row.querySelector('td:nth-child(3)');
    const price = parseFloat(priceCell.textContent);
    total += price;
  });

  summaryTotalPriceElement.textContent = '₽' + total.toFixed(2);
}

function getTicketTypeLabel(ticketType) {
  if (ticketType === 'adult') {
    return 'Взрослый билет';
  } else if (ticketType === 'child') {
    return 'Детский билет';
  } else if (ticketType === 'family') {
    return 'Семейный билет';
  }

  return '';
}

function clearCart() {
  cartItemsElement.innerHTML = '';
  updateCartSummary();
}

function checkout() {
  if (cartItemsElement.children.length === 0) {
    alert('Ваша корзина пуста. Пожалуйста, добавьте билеты перед оформлением заказа.');
    return;
  }

  const totalPrice = parseFloat(summaryTotalPriceElement.textContent.replace('₽', ''));
  alert('Заказ оформлен! Общая стоимость: ₽' + totalPrice.toFixed(2));
  clearCart();
}