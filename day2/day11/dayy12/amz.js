/* Mini Amazon Clone - script.js
   - Provides product data, search, filters, cart (localStorage) and UI interactions.
*/

const PRODUCTS = [
  { id: 'p1', title: "Wireless Bluetooth Headphones", price: 39.99, rating: 4.4, category: "electronics", img: "https://via.placeholder.com/320x240?text=Headphones", desc: "Comfortable over-ear Bluetooth headphones with long battery life." },
  { id: 'p2', title: "Stainless Steel Water Bottle (1L)", price: 18.5, rating: 4.7, category: "home", img: "https://via.placeholder.com/320x240?text=Water+Bottle", desc: "Keeps beverages cold for 24 hours and hot for 12." },
  { id: 'p3', title: "Smart LED Desk Lamp", price: 29.0, rating: 4.2, category: "electronics", img: "https://via.placeholder.com/320x240?text=Desk+Lamp", desc: "Adjustable brightness and color temperature, touch controls." },
  { id: 'p4', title: "The Modern JavaScript Book", price: 24.99, rating: 4.9, category: "books", img: "https://via.placeholder.com/320x240?text=JS+Book", desc: "A practical guide to modern JavaScript." },
  { id: 'p5', title: "Cotton Crewneck T-Shirt", price: 12.99, rating: 4.1, category: "fashion", img: "https://via.placeholder.com/320x240?text=T-Shirt", desc: "Soft, breathable cotton t-shirt in multiple colors." },
  { id: 'p6', title: "Non-stick Frying Pan 10\"", price: 34.99, rating: 4.5, category: "home", img: "https://via.placeholder.com/320x240?text=Frying+Pan", desc: "Durable non-stick cooking surface with comfortable handle." }
];

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* --- DOM Elements --- */
const productGrid = $('#productGrid');
const searchInput = $('#searchInput');
const searchBtn = $('#searchBtn');
const categorySelect = $('#categorySelect');
const sortSelect = $('#sortSelect');
const cartBtn = $('#cartBtn');
const cartCount = $('#cartCount');
const cartDrawer = $('#cartDrawer');
const overlay = $('#overlay');
const cartItemsEl = $('#cartItems');
const cartSubtotalEl = $('#cartSubtotal');
const closeCart = $('#closeCart');
const clearCartBtn = $('#clearCartBtn');
const checkoutBtn = $('#checkoutBtn');
const productModal = $('#productModal');
const modalClose = $('#modalClose');
const modalBody = $('#modalBody');
const noResults = $('#noResults');

/* --- Cart handling using localStorage --- */
const CART_KEY = 'miniazon_cart_v1';

function readCart(){
  try{
    return JSON.parse(localStorage.getItem(CART_KEY) || '{}');
  }catch(e){
    return {};
  }
}
function writeCart(cartObj){
  localStorage.setItem(CART_KEY, JSON.stringify(cartObj));
  renderCartCount();
}

/* Add product to cart (quantity) */
function addToCart(productId, qty = 1){
  const cart = readCart();
  cart[productId] = (cart[productId] || 0) + qty;
  writeCart(cart);
  showToast('Added to cart');
}

/* Remove product */
function removeFromCart(productId){
  const cart = readCart();
  delete cart[productId];
  writeCart(cart);
  renderCartItems();
}

/* Update quantity */
function updateQty(productId, qty){
  const cart = readCart();
  if(qty <= 0) { delete cart[productId]; }
  else cart[productId] = qty;
  writeCart(cart);
  renderCartItems();
}

/* Cart UI */
function renderCartCount(){
  const cart = readCart();
  const total = Object.values(cart).reduce((s,n)=>s+n,0);
  cartCount.textContent = total;
}

function renderCartItems(){
  const cart = readCart();
  cartItemsEl.innerHTML = '';
  const ids = Object.keys(cart);
  if(ids.length === 0){
    cartItemsEl.innerHTML = `<div class="no-results">Your cart is empty.</div>`;
    cartSubtotalEl.textContent = formatPrice(0);
    return;
  }
  let subtotal = 0;
  ids.forEach(id => {
    const product = PRODUCTS.find(p=>p.id===id);
    const qty = cart[id];
    if(!product) return;
    const line = product.price * qty;
    subtotal += line;

    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <img src="${product.img}" alt="${escapeHtml(product.title)}"/>
      <div style="flex:1">
        <div style="font-weight:700">${escapeHtml(product.title)}</div>
        <div style="margin-top:6px;color:var(--muted)">${formatPrice(product.price)} × ${qty} = <strong>${formatPrice(line)}</strong></div>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button class="link-btn" data-action="decrease" data-id="${id}">−</button>
          <span style="min-width:28px;text-align:center">${qty}</span>
          <button class="link-btn" data-action="increase" data-id="${id}">+</button>
          <button class="link-btn" data-action="remove" data-id="${id}">Remove</button>
        </div>
      </div>
    `;
    cartItemsEl.appendChild(item);
  });
  cartSubtotalEl.textContent = formatPrice(subtotal);

  // attach listeners
  $$('.link-btn[data-action]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = btn.dataset.id;
      const act = btn.dataset.action;
      const cart = readCart();
      const qty = cart[id] || 0;
      if(act === 'increase') updateQty(id, qty+1);
      if(act === 'decrease') updateQty(id, qty-1);
      if(act === 'remove') removeFromCart(id);
    });
  });
}

/* --- Utilities --- */
function formatPrice(num){
  return new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(num);
}
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

/* --- Render product grid --- */
let CURRENT_PRODUCTS = PRODUCTS.slice();

function renderProducts(products){
  productGrid.innerHTML = '';
  if(products.length === 0){
    noResults.classList.remove('hidden');
    return;
  } else {
    noResults.classList.add('hidden');
  }
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img loading="lazy" src="${p.img}" alt="${escapeHtml(p.title)}">
      <div class="product-title">${escapeHtml(p.title)}</div>
      <div class="product-rating">⭐ ${p.rating.toFixed(1)}</div>
      <div class="product-price">${formatPrice(p.price)}</div>
      <div class="card-actions">
        <button class="secondary-btn" data-action="view" data-id="${p.id}">Quick view</button>
        <button class="primary-btn" data-action="add" data-id="${p.id}">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // delegate clicks
  productGrid.querySelectorAll('button[data-action]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      if(action === 'view') openProductModal(id);
      if(action === 'add') addToCart(id,1);
    });
  });
}

/* --- Product modal --- */
function openProductModal(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  productModal.classList.remove('hidden');
  productModal.setAttribute('aria-hidden','false');
  overlay.classList.remove('hidden');

  modalBody.innerHTML = `
    <div class="modal-body" style="display:flex;flex-wrap:wrap">
      <div class="img-col" style="flex:1;min-width:260px">
        <img src="${p.img}" alt="${escapeHtml(p.title)}" style="width:100%;height:auto;border-radius:8px;object-fit:contain"/>
      </div>
      <div class="info-col" style="flex:1;min-width:260px">
        <h2 style="margin:0">${escapeHtml(p.title)}</h2>
        <div style="color:var(--muted);margin-top:6px">Category: ${escapeHtml(p.category)}</div>
        <div style="margin-top:12px;font-size:20px;font-weight:800">${formatPrice(p.price)}</div>
        <div style="margin-top:8px;color:var(--muted)">⭐ ${p.rating.toFixed(1)}</div>
        <p style="margin-top:12px;color:#333">${escapeHtml(p.desc)}</p>
        <div style="display:flex;gap:8px;margin-top:12px">
          <button id="modalAdd" class="primary-btn">Add to cart</button>
          <button id="modalCloseBtn" class="secondary-btn">Close</button>
        </div>
      </div>
    </div>
  `;

  $('#modalAdd').addEventListener('click', ()=>{
    addToCart(p.id, 1);
    closeProductModal();
  });
  $('#modalCloseBtn').addEventListener('click', closeProductModal);
}

function closeProductModal(){
  productModal.classList.add('hidden');
  productModal.setAttribute('aria-hidden','true');
  overlay.classList.add('hidden');
}

/* --- Search / filter / sort logic --- */
function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const priceFilter = $$('input[name="price"]:checked')[0].value;
  const ratingChecks = $$('input[name="rating"]:checked').map(i => Number(i.value));
  let filtered = PRODUCTS.filter(p => {
    const matchesQuery = q === '' || p.title.toLowerCase().includes(q) || (p.desc && p.desc.toLowerCase().includes(q));
    const matchesCategory = category === 'all' || p.category === category;
    let matchesPrice = true;
    if(priceFilter !== 'all'){
      const [min,max] = priceFilter.split('-').map(Number);
      if(max) matchesPrice = p.price >= min && p.price < max;
      else matchesPrice = p.price >= min;
    }
    let matchesRating = true;
    if(ratingChecks.length){
      matchesRating = ratingChecks.some(min => p.rating >= min);
    }
    return matchesQuery && matchesCategory && matchesPrice && matchesRating;
  });

  // Sort
  const sortVal = sortSelect.value;
  if(sortVal === 'price-asc') filtered.sort((a,b)=>a.price-b.price);
  if(sortVal === 'price-desc') filtered.sort((a,b)=>b.price-a.price);
  if(sortVal === 'rating-desc') filtered.sort((a,b)=>b.rating-b.rating);

  CURRENT_PRODUCTS = filtered;
  renderProducts(filtered);
}

/* --- Simple toast --- */
let toastTimer = null;
function showToast(text){
  clearTimeout(toastTimer);
  let el = document.getElementById('miniToast');
  if(!el){
    el = document.createElement('div');
    el.id = 'miniToast';
    el.style.position = 'fixed';
    el.style.right = '18px';
    el.style.bottom = '18px';
    el.style.background = '#111';
    el.style.color = '#fff';
    el.style.padding = '10px 14px';
    el.style.borderRadius = '10px';
    el.style.zIndex = 120;
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.style.opacity = '1';
  toastTimer = setTimeout(()=>{ el.style.opacity='0'; }, 2000);
}

/* --- Event wiring --- */
searchBtn.addEventListener('click', applyFilters);
searchInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') applyFilters(); });
categorySelect.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);
$$('input[name="price"]').forEach(i=>i.addEventListener('change', applyFilters));
$$('input[name="rating"]').forEach(i=>i.addEventListener('change', applyFilters));

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartDrawer);
overlay.addEventListener('click', ()=>{
  closeCartDrawer();
  closeProductModal();
});

clearCartBtn.addEventListener('click', ()=>{
  localStorage.removeItem(CART_KEY);
  renderCartItems();
  renderCartCount();
});

checkoutBtn.addEventListener('click', ()=>{
  showToast('Checkout is not implemented in the demo.');
});

/* Cart drawer open/close */
function openCart(){
  cartDrawer.classList.remove('hidden');
  overlay.classList.remove('hidden');
  cartDrawer.setAttribute('aria-hidden','false');
  renderCartItems();
}
function closeCartDrawer(){
  cartDrawer.classList.add('hidden');
  overlay.classList.add('hidden');
  cartDrawer.setAttribute('aria-hidden','true');
}

/* Modal close */
modalClose.addEventListener('click', closeProductModal);

/* initial render */
renderProducts(PRODUCTS);
renderCartCount();

/* tiny accessibility improvement: close modal/drawer on Escape */
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    closeProductModal();
    closeCartDrawer();
  }
});

/* On page load, optionally prefill from query param for search (nice touch) */
(function prefillFromURL(){
  const params = new URLSearchParams(location.search);
  if(params.get('q')) {
    searchInput.value = params.get('q');
    applyFilters();
  }
})();
