var result;
var id=0;
var cartCost=document.getElementById("cart-cost");
var storeQuanity;
var items=document.getElementById("items");
var count_items=0;
const getData=async()=>{

    
    const data=await fetch("https://dummyjson.com/products");
     result= await data.json();
   console.log(result.products);
    show(result);
   
}


getData();

const ids=new Set();           // set for checking ids
function show(result){

    var data2="";

result.products.map((value)=>{
    data2+=` <div class="card d-inline-block col-lg-3"   id=${id}  style="width: 18rem";>
        <img class="card-img-top" src=${value.thumbnail} width="100%" height="200">
        <div class="card-body"><h5 class="card-title">${value.title}</h5>
          <p class="card-text">${value.description}</p>
          <p class="card-price"><b>Rs </b>${value.price}</p>

         <button  class="btn btn-primary add-to" onClick="addToCart(${id})"  >Add to cart</button>
        </div>
        
      </div>`;
   
     id++;

})




document.getElementById("d").innerHTML=data2;

}

var store=document.getElementsByClassName("card-img-top");
console.log(store);

var tableData="";

var delR=0;

 var totalCost=0;
// var quantity=parseInt(document.getElementById("quantity").value);
// console.log("Quantity",quantity);
var quantity;


// var qB=document.getElementById("upd");
// qB.addEventListener('click',()=>{
//   updateCart(q,p,r)
//   {
//     var c=document.getElementById("up");
//     // c.value=q*p;
//     // totalCost=0;
//     // totalCost+=c.value;
//     r=0;
//     r+=q*p;
//     c.innerText=q*p;
//     cartCost.innerText=r;
//   }
// })




function addToCart(id){


var title=result.products[id].title;
var price=result.products[id].price;
var image=result.products[id].thumbnail;

// function calTotalCost(qtty,price){
//   quantity=qtty;
// totalCost+=(price)*parseInt(quantity);  

// }

// console.log(price);
// console.log(quantity);'


  if(ids.has(id)){
    alert("Item is already taken");
    return;
  }

  console.log(result.products[id].title , result.products[id].price);

var tab=$('#foot');
var qt=1;
var resu=`<tr><td><img src="${image}" width="75%" height="50"></td><td>${title}</td><td><a href="#"><i class="fa-solid fa-minus fa-2x" id="dec" ></i></a><input type="numbers" value="1" style="width:64px"  id="quantity"  min="1"><a href="#"><i class="fa-solid fa-plus fa-2x" id="inc"></i></a></td><td id="up">${price}</td><td ><i class="fa-sharp fa-solid fa-trash" class="delCart" onClick="delRow(${id},${price})"></i></td></tr>`;

tab.append(resu);
items.innerText=++count_items
var qty=document.getElementById("quantity");
//var qty2=document.getElementById("quantity");



var dec=document.getElementById("dec");
var inc=document.getElementById("inc");


dec.addEventListener('click',()=>{

if(qty.value==1){
   return;
}
   qty.value--;
   console.log("sub");
 
})


inc.addEventListener('click',()=>{
qty.value++;
console.log("addd");
})












// var qty=document.getElementById("quantity").value;
storeQuanity=qty.value;
totalCost+=(price)*parseInt(storeQuanity);
 cartCost.innerText=totalCost;

 //updateCart(storeQuanity,price,totalCost);

ids.add(id);


delR++;

}




var table=document.getElementById("foot");


function delRow(mainId,price){
  ids.delete(mainId);
  items.innerText=--count_items;
  for(var i = 0; i < table.rows.length; i++)
  {
      table.rows[i].cells[4].onclick = function()
      {
          
              index = this.parentElement.rowIndex;
              table.deleteRow(index);
              totalCost-=(price)*parseInt(storeQuanity);
             cartCost.innerText=totalCost;

           
     
      };
      
  }
}


  console.log("Item deleted");






$(document).ready(function () {
  $('#exampleModal').modal({
         backdrop: 'static',
         keyboard: false
  })
 });


