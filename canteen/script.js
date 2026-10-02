const foods=[
{name:"Samosa",price:10,img:"https://i.pinimg.com/736x/36/ee/b2/36eeb26d2a8f06a1d5ca997cd78db820.jpg"},
{name:"Puri Chole",price:50,img:"https://i.pinimg.com/736x/1d/79/15/1d79150a609f6746e08d6b77004c9bd3.jpg"},
{name:"Samosa Chola",price:20,img:"https://i.pinimg.com/736x/f9/96/73/f9967357741a2a89ac43600032adea63.jpg"},
{name:"French Fries",price:50,img:"https://i.pinimg.com/1200x/99/9b/fc/999bfc3c4672ce0553a9ca4c7fe1a87c.jpg"},
{name:"Chilli Patato",price:70,img:"https://i.pinimg.com/736x/48/9a/bb/489abb29b2d64369cf19d5109b39a918.jpg"},
{name:"Chai",price:10,img:"https://i.pinimg.com/1200x/b6/a2/3e/b6a23ebf87a70916a8a33f76bfaa8e60.jpg"},
{name:"Noodles",price:50,img:"https://i.pinimg.com/736x/ac/e1/30/ace1309df3647bd066b9890809d4bc4d.jpg"},
{name:"Pasta",price:40,img:"https://i.pinimg.com/1200x/97/da/b7/97dab7c64c03d85164e28a86a3f83ae3.jpg"},
{name:"Sandwich",price:50,img:"https://i.pinimg.com/736x/ce/d6/ce/ced6ce367d5bf2597d56db08b852cf1d.jpg"},
{name:"Fried Rice",price:50,img:"https://i.pinimg.com/1200x/d1/7d/83/d17d83ad035257900fdbcc4effe8d939.jpg"},
{name:"Bread Pakoda",price:20,img:"https://i.pinimg.com/1200x/8c/e1/c3/8ce1c34e6dc8a314e2b6a4a9cce5f438.jpg"},
{name:"Maggie",price:40,img:"https://i.pinimg.com/1200x/ad/81/0d/ad810d0600a5105abc2cb3bd266cf1c0.jpg"},
];

let cart=JSON.parse(localStorage.getItem("cart"))||[];

function save(){
localStorage.setItem("cart",JSON.stringify(cart));
updateCount();
}

/* load menu */
function loadMenu(){
let m=document.getElementById("menu");

foods.forEach(f=>{
m.innerHTML+=`
<div class="card">
<img src="${f.img}">
<div class="info">
<h3>${f.name}</h3>
<p>₹${f.price}</p>
<button onclick="addToCart('${f.name}',${f.price})">Add +</button>
</div>
</div>`;
});

updateCount();
}

function searchFood(val){
document.querySelectorAll(".card").forEach(c=>{
c.style.display=c.innerText.toLowerCase().includes(val.toLowerCase())?"block":"none";
});
}

function addToCart(name,price){
let item=cart.find(i=>i.name===name);
if(item) item.qty++;
else cart.push({name,price,qty:1});
save();
}

function updateCount(){
let c=document.getElementById("count");
if(c) c.innerText=cart.length;
}

/* cart page */
function loadCart(){
let t=document.getElementById("cartTable");
let total=0;

cart.forEach((it,i)=>{
let sub=it.qty*it.price;
total+=sub;

let r=t.insertRow();

r.insertCell(0).innerText=it.name;
r.insertCell(1).innerHTML=`<button onclick="changeQty(${i},-1)">-</button>${it.qty}<button onclick="changeQty(${i},1)">+</button>`;
r.insertCell(2).innerText="₹"+it.price;
r.insertCell(3).innerText="₹"+sub;
r.insertCell(4).innerHTML=`<button onclick="deleteItem(${i})">❌</button>`;
});

document.getElementById("grandTotal").innerText="Total ₹"+total;
}

function changeQty(i,val){
cart[i].qty+=val;
if(cart[i].qty<=0) cart.splice(i,1);
save();
location.reload();
}

function deleteItem(i){
cart.splice(i,1);
save();
location.reload();
}

function clearCart(){
cart=[];
save();
location.reload();
}

function placeOrder(){
    fetch("http://127.0.0.1:5000/order", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
})

let table=document.getElementById("tableNo")?.value;

fetch("http://127.0.0.1:5000/order",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({table,cart})
});

localStorage.removeItem("cart");
alert("Order Placed!");
window.location="index.html";
}