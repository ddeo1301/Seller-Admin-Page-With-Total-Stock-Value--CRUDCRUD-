var sum = 0;

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/86b2c950d47b4036af544b3824fb5278/stockvalue")
       .then((Response) => {
          for(var i = 0; i < Response.data.length; i++){
             showUserOnScreen(Response.data[i]);
          }
        //   for(var i = 0; i < Response.data.length; i++){
        //     sum = sum + parseInt(obj.sellPrice[i]);
        //   }
          console.log(Response);
       })
       .catch((error) => {
         console.log(error);
       })
})

function sellerAdminPage(event){
    event.preventDefault();

    const sellPrice = event.target.sellingPrice.value;
    const nameOfProduct = event.target.productName.value;

    const obj = {
        sellPrice,
        nameOfProduct
    }

   sum = sum + parseInt(obj.sellPrice);

    axios.post("https://crudcrud.com/api/86b2c950d47b4036af544b3824fb5278/stockvalue", obj)
         .then((Response) => {
            showUserOnScreen(Response.data);
            console.log(Response);
         })
         .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + `<h4>Something Went Wrong </h4>`;
            console.log(err);
         })
}

function showUserOnScreen(obj){
    const parentItem = document.getElementById("totalStockValue");
    const childItem = document.createElement('li');

    const childItem1 = document.createElement('h2');
    childItem1.textContent = 'Products';

    const childItem2 = document.createElement('h5');
    childItem2.textContent = 'Total Value Worth Of Product: Rs' + sum;

    childItem.textContent = obj.sellPrice + ' - ' + obj.nameOfProduct;
    
    parentItem.appendChild(childItem1);
    parentItem.appendChild(childItem);
    parentItem.appendChild(childItem2);

    const deleteButton = document.createElement('input');
    deleteButton.type = "button";
    deleteButton.value = "Delete";
    deleteButton.onclick = () => {
        axios.delete(`https://crudcrud.com/api/86b2c950d47b4036af544b3824fb5278/stockvalue/${obj._id}`)
        .then((response) => {
            parentItem.removeChild(childItem);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    childItem.appendChild(deleteButton);
}