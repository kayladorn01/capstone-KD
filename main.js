let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'pink pallet',
        tag: 'pinkpallet.jpeg',
        price: 400,
        inCart: 0
    },
    {
        name: 'Rosé Blush',
        tag: 'roseblush.jpeg',
        price: 300,
        inCart: 0
    },
    {
        name: 'nude concealer',
        tag: 'nudeconcealer.jpeg',
        price: 350,
        inCart: 0
    },
    {
        name: 'liquid liner',
        tag: 'liquidliner.jpeg',
        price: 180,
        inCart: 0
    },

]

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

//adding item to local storage
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}


//function to count each item in cart & display number in ion icon
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}

//calculating total cost in local storage
function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    console.log('my cartCost is', cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else{
    localStorage.setItem('totalCost', product.price);
    }
    let alertTotal = cartCost + product.price
    alert("your total is R "+ alertTotal)
}
function saveData(){
    var input = document.getElementById('coupon').value;
    localStorage.setItem('coupon', input);
}
//opening delivery form details
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function alertMe(){
    document.getElementById("myForm").style.display="none"
    alert("thank you!! delivery will take 3-5 days.")
}
        //alert order number 
        function rGen () {
            let rNum = (Math.floor(Math.random() * 25))
            alert("ORDER SUCCESSFUL!! your order number is: " + rNum)
        }

//calculating total including vat of all item in cart
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    let coupon = localStorage.getItem("coupon")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    if(coupon == "KD20"){
        cartCost = parseInt(cartCost)-20;
    }
    let total =parseInt(cartCost) * 0.15 + parseInt(cartCost);
    cartCost= total. toFixed(2);
    carCost = cartCost.toString();
//displaying items in cart , product , price & product name
    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
                <img src="./images/${item.tag}">
                <span>${item.name}</span>
            </div>
            <div class="quantity">
            x<span>${item.inCart}</span>
            </div>
            <div class="total">
                R${item.inCart * item.price}.00
            </div>
            `;
        });


//total in cart + buttons for collection or delivery & form for delivery
        productContainer.innerHTML += `
        <form action="" id="frm">
        <ul>
        <li>
            <strong>Shipping</strong>
            <label><input type="radio" value="1" name="delivery_plugin" onclick="updateTotal()" /> Delivery (R100.00)</label>
            <label><input type="radio" value="0" name="delivery_plugin" onclick="updateTotal()" /> Collection</label>
        </ul>
    </form>
        <button class="open-button" onclick="openForm()">Delivery details</button>

        <div class="form-popup" id="myForm">
            <form action="/action_page.php" class="form-container">
            <h1>Delivery Details</h1>
        
            <label for="name"><b>Name</b></label>
            <input type="text" placeholder="Enter full name" name="name" required>
        
            <label for="add"><b>Address</b></label>
            <input type="text" placeholder="Enter home address" name="add" required>
        
            <a href="cart.html"><button type="submit" onclick="alertMe()"class="btn">Continue</button></a>
            <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
            </form>
        </div>
            <h4 class="basketTotalTitle">
            Basket Total: 
            </h4>
            <h4 class="basketTotal">
            <div class="taxes">
            <em>Plus VAT: </em><span class="amount">@ 15%</span>
            </div>
                R${cartCost}
            </h4>`
    }
    
}

function updateTotal() {
    let cartCost = localStorage.getItem('totalCost')
    total = parseInt(cartCost);
    total += frm.delivery_plugin.value * 100;
    localStorage.setItem('totalCost',total)
    displayCart()
}

onLoadCartNumbers();
displayCart()
updateTotal();






        
