var result;
var id=0;
var cartCost=document.getElementById("cart-cost");

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

var quantity;





var storeQuanity;

// generating ids
var qt=100;
var pt=200;
function addToCart(id){

var title=result.products[id].title;
var price=result.products[id].price;
var image=result.products[id].thumbnail;




  if(ids.has(id)){
    alert("Item is already taken");
    return;
  }

  console.log(result.products[id].title , result.products[id].price);

var tab=$('#foot');


var resu=`<tr><td><img src="${image}" width="75%" height="50"></td><td>${title}</td><td><a href="#"><i class="fa-solid fa-minus fa-2x" onclick="msg(${qt},${price},${pt})" ></i></a><input type="numbers" value="1" style="width:64px"  id=${qt}  min="1" disabled><a href="#"><i class="fa-solid fa-plus fa-2x" onclick="msg2(${qt},${price},${pt})"></i></a></td><td id=${pt}>${price}</td><td ><i class="fa-sharp fa-solid fa-trash" class="delCart" onclick="delRow(${qt},${id},${price})"></i></td></tr>`;

tab.append(resu);
var qty=document.getElementById(qt);
qt++;
pt++;
items.innerText=++count_items


storeQuanity=qty.value;
totalCost+=(price)*parseInt(storeQuanity);
 cartCost.innerText=totalCost;
 console.log(totalCost);



ids.add(id);

delR++;

}


function msg(val,p,q){
    if(document.getElementById(val).value==1){
        return;
     }
   
        var y=document.getElementById(val).value;
        totalCost-=p*parseInt(y);
        document.getElementById(val).value=--y;
    var z=document.getElementById(q);
    z.innerText=p*(parseInt(y));
        totalCost+=(p)*parseInt(y);
        cartCost.innerText=totalCost;
        console.log("sub");
    
}

function msg2(val,p,q){

var y=document.getElementById(val).value;
totalCost-=p*parseInt(y);
document.getElementById(val).value=++y;

var z=document.getElementById(q);
z.innerText=p*(parseInt(y));
totalCost+=(p)*parseInt(y);
 cartCost.innerText=totalCost;





}



var table=document.getElementById("foot");


function delRow(v,mainId,price){
  var y=document.getElementById(v).value;
  ids.delete(mainId);
  items.innerText=--count_items;
  for(var i = 0; i < table.rows.length; i++)
  {
      table.rows[i].cells[4].onclick = function()
      {
          console.log(v);
              index = this.parentElement.rowIndex;
              table.deleteRow(index);
             
              totalCost-=(price)*parseInt(y);
              console.log(totalCost);
             cartCost.innerText=totalCost;

           
     
      };
      
  }
}







$(document).ready(function () {
  $('#exampleModal').modal({
         backdrop: 'static',
         keyboard: false
  })
 });

