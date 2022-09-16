var result;
var id=0;
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

         <button  class="btn btn-primary" onClick="addToCart(${id})"  >Add to cart</button>
        </div>
        
      </div>`;
   
     id++;

})




document.getElementById("d").innerHTML=data2;

}

var store=document.getElementsByClassName("card-img-top");
console.log(store);

var tableData="";
// ids.add(id);
function addToCart(id){

console.log(result.products[id].title , result.products[id].price);
var title=result.products[id].title;
var price=result.products[id].price;
var image=result.products[id].thumbnail;


  if(ids.has(id)){
    alert("Item is already taken");
    return;
  }


tableData+=`<tr><td><img src="${image}" width="50%" height="50"></td><td>${title}</td><td><input type="number" value="1" style="width:34px"></td><td>${price}</td><td><i class="fa-sharp fa-solid fa-trash"></i></td></tr>`;
ids.add(id);



document.getElementById("foot").innerHTML=tableData;


}




