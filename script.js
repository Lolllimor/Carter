const items = [
  {
    name: 'Waffle',
    description: 'Waffle with Berries',
    img: '/assets/images/image-waffle-desktop.jpg',
    price: '6.50',
  },
  {
    name: 'Crème Brûlée ',
    description: 'Vanilla Bean Crème Brûlée',
    img: '/assets/images/image-creme-brulee-desktop.jpg',
    price: '7.00',
  },
  {
    name: 'Macaron',
    description: 'Macaron Mix of Five',
    img: '/assets/images/image-macaron-desktop.jpg',
    price: '6.50',
  },
  {
    name: 'Tiramisu',
    description: 'Classic Tiramisu',
    img: '/assets/images/image-tiramisu-desktop.jpg',
    price: '6.50',
  },
  {
    name: 'Baklava',
    description: 'Pistachio Baklava',
    img: '/assets/images/image-baklava-desktop.jpg',
    price: '6.50',
  },
  {
    name: 'Pie',
    description: 'Lemon Meringue Pie',
    img: '/assets/images/image-meringue-desktop.jpg',
    price: '6.50',
  },
  {
    name: 'Cake',
    description: 'Red Velvet Cake',
    img: '/assets/images/image-cake-desktop.jpg',
    price: '6.50',
  },
  {
    name: 'Brownie',
    description: 'Salted Caramel Brownie ',
    img: '/assets/images/image-brownie-desktop.jpg',
    price: '6.50',
  },
  {
    name: 'Panna Cotta',
    description: 'Vanilla Panna Cotta ',
    img: '/assets/images/image-panna-cotta-desktop.jpg',
    price: '6.50',
  },
];

const itemsHTML = items
  .map(
    (item, idx) =>
      `<div class="dessertDiv"> 
  <div class="imageStyle">
  <img src="${item.img}" alt="${item.name}" class="imageStyle"/>
  <button class="addToCart gadd"> 
  <div class="innerbtndiv">
  <img src="/assets/images/icon-add-to-cart.svg"/> 
  <p class="addP">Add to cart</p>
  </div>
  </button>
  </div>
  <div class="label"><p class="category">${item.name}</p>
  <p class="descript">${item.description}</p>
  <p class="price">$${item.price}</p>
  </div>
  </div>`
  )
  .join('');

document.querySelector('.items').innerHTML = itemsHTML;

const order = [];

document.querySelectorAll('.addToCart').forEach((button, idx) => {
  button.addEventListener('click', () => {
    const exist = order.find((i) => i.name === items[idx].name);
    if (!exist) {
      order.push({ ...items[idx], quantity: 1 });
    }

    button.classList.remove('addToCart');
    button.classList.add('counter');
    button.innerHTML = `
      <div class="counter">
      <div class="circleAdd">
      <img src="/assets/images/icon-decrement-quantity.svg" class="decrement" data-index="${idx}"/>
      </div>
     <span class="quantity">${
       typeof exist?.quantity === 'number' && exist?.quantity > 0
         ? exist.quantity
         : 1
     }</span>
        <div class="circleAdd">
         <img src="/assets/images/icon-increment-quantity.svg" class="increment" data-index="${idx}"/>
         </div>
      
      </div>`;

    // Add event listeners for increment and decrement buttons
    const decrementButton = button.querySelector('.decrement');
    const incrementButton = button.querySelector('.increment');

    decrementButton.addEventListener('click', () => updateQuantity(idx, -1));
    incrementButton.addEventListener('click', () => updateQuantity(idx, 1));
  });
});

function updateQuantity(idx, change) {
  const item = order.find((item) => item.name === items[idx].name);
  if (item && item.quantity > 0) {
    item.quantity += change;

    // Update the displayed quantity
    // document.querySelector(`.counter .quantity`).innerText = item.quantity;

    console.log(`Updated order:`, order);
  } else {
    console.log('first');
    order.splice(order.indexOf(idx), 1);

    console.log(order);
    // Reset the button to "Add to Cart"
    const button = document.querySelectorAll('.addToCart')[idx];
    console.log(idx);
    button.innerHTML = `
        <button class="addToCart gadd"> 
        <img src="/assets/images/icon-add-to-cart.svg"/> 
        <p class="addP">Add to cart</p>
        </button>`;

    button.classList.remove('counter');
    button.classList.add('addToCart');
  }
}
