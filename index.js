var result;
var id;
var cartCost = document.getElementById("cart-cost");
var storeApi=[];
var items = document.getElementById("items");
var count_items = 0;
var getQuantityItems=document.getElementById("itemsquantity");
var count_quantity=0;




const getData = async () => {
  const data = await fetch("https://dummyjson.com/products");
  result = await data.json();
  console.log(result.products);
  storeApi=result.products;
  console.log("storeapi",storeApi);
  show(storeApi);
};

getData();

const ids = new Set(); // set for checking ids
function show(products) {
  var data2 = "";

  id=1;
products.map((value)=>{
    data2 += ` <div class="d-inline-block col-lg-3 card"   id=${id} style="width:18rem;">
    <img class="card-img-top" src=${value.thumbnail} width="100%" height="200">
  
    <div class="card-body">
    <h5 class="card-title">${value.title}</h5>
   
      <p class="card-text">${value.description}</p>
      <p class="card-price"><b>$ </b>${value.price}</p>
      <p class="card-rating" style="background:skyblue;width:110px;border-radius:5px;"><b>Rating: </b>${value.rating}<i style="color:yellow;" class="fa-solid fa-star"></i></p>

     <button class="btn btn-primary add-to" onclick="addToCart(${id})"  >Add to cart</button>
    </div>
    
  </div>`;

    id++;

  });
  document.getElementById("d").innerHTML = data2;
}



// document.querySelector('.add-to').addEventListener('hover',()=>{
//   document.querySelector('.add-to').classList.remove("btn-primary");
//   document.querySelector('.add-to').classList.add("btn-warning");
//   console.log("Hover");
// })









var store = document.getElementsByClassName("card-img-top");
console.log(store);

var tableData = "";

var delR = 0;

var totalCost = 0;

var quantity;

var storeQuanity;

// generating ids
var qt = 100;
var pt = 200;
function addToCart(id) {

  var title = storeApi[id].title;
  var price = storeApi[id].price;
  var image = storeApi[id].thumbnail;

  if (ids.has(id)) {
    alert("Item is already taken");
    return;
  }

  count_quantity++;
  getQuantityItems.innerText=count_quantity;

  console.log(result.products[id].title, result.products[id].price);

  var tab = $("#foot");

  var resu = `<tr><td><img src="${image}" width="75%" height="50"></td><td>${title}</td><td><a href="#"><i class="fa-solid fa-minus fa-2x" onclick="msg(${qt},${price},${pt})" ></i></a><input type="numbers" value="1" style="width:64px"  id=${qt}  min="1" disabled><a href="#"><i class="fa-solid fa-plus fa-2x" onclick="msg2(${qt},${price},${pt})"></i></a></td><td id=${pt}>${price}</td><td ><i class="fa-sharp fa-solid fa-trash" class="delCart" onclick="delRow(${qt},${id},${price})"></i></td></tr>`;

  tab.append(resu);
  var qty = document.getElementById(qt);
  qt++;
  pt++;
  items.innerText = ++count_items;

  storeQuanity = qty.value;
  totalCost += price * parseInt(storeQuanity);
  cartCost.innerText = totalCost;

  console.log(totalCost);

  ids.add(id);

  delR++;
}

function msg(val, p, q) {
  if (document.getElementById(val).value == 1) {
    return;
  }

  count_quantity--;
  getQuantityItems.innerText=count_quantity;

  var y = document.getElementById(val).value;
  totalCost -= p * parseInt(y);
  document.getElementById(val).value = --y;
  var z = document.getElementById(q);
  z.innerText = p * parseInt(y);
  totalCost += p * parseInt(y);
  cartCost.innerText = totalCost;
  console.log("sub");
}

function msg2(val, p, q) {
  count_quantity++;
  getQuantityItems.innerText=count_quantity;
  var y = document.getElementById(val).value;
  totalCost -= p * parseInt(y);
  document.getElementById(val).value = ++y;

  var z = document.getElementById(q);
  z.innerText = p * parseInt(y);
  totalCost += p * parseInt(y);
  cartCost.innerText = totalCost;
}

var table = document.getElementById("foot");

function delRow(v, mainId, price) {
  var y = document.getElementById(v).value;
  ids.delete(mainId);
  items.innerText = --count_items;


  


  for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[4].onclick = function () {
      console.log(v);
      index = this.parentElement.rowIndex;
      table.deleteRow(index);
      count_quantity-=y;
      getQuantityItems.innerText=count_quantity;
      totalCost -= price * parseInt(y);
      console.log(totalCost);
      cartCost.innerText = totalCost;
    };
  }
}


let title=[];
const input=document.querySelector("#searchlist");
const inpelement=document.querySelector("#inp");

const data2 = async () => {
  const data = await fetch("https://dummyjson.com/products");
 const  result = await data.json();
  title=result.products.map((x)=>x.title);
  loadData(title,input)
  console.log(title);
};


function loadData(data,element){
  if(data){
    element.innerHTML = "";
    let innerElement="";
    data.forEach((item)=>{
      innerElement+=`<li>${item}</li>`;
    })
    element.innerHTML=innerElement;
  }
}


function filterData(data,searchText){
  return data.filter((x)=>x.toLowerCase().includes(searchText.toLowerCase()));

}
data2();

inpelement.addEventListener("input",function(){
 const filterdata= filterData(title,inpelement.value);
loadData(filterdata,input);
})


function sh(){
  $('#delsearch').show();
}




$(document).ready(function () {
  $("#exampleModal").modal({
    backdrop: "static",
    keyboard: false,
  });
});

function takeTotal() {
  sessionStorage.setItem("Total Cost", cartCost.innerText);
}
var filterProducts=[];

function search(val) {
	let filterProducts = result.products.filter((product) =>
		product.title.toLowerCase().includes(val.toLowerCase())
	);
  console.log("filter",filterProducts);
  show(filterProducts);
}

document.getElementById("inp").addEventListener('keyup',(e)=>{
  search(e.target.value);
})


