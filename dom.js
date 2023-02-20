
window.addEventListener("DOMContentLoaded", () => {
  var sum = 0;
  axios
    .get("https://crudcrud.com/api/cb3dd8d7887a44609641752355e0d0c8/stockvalue")
    .then((Response) => {
        for (var i = 0; i < Response.data.length; i++) {
            sum = sum + parseInt(Response.data[i].sellPrice);
          }
          console.log(sum);

      for (var i = 0; i < Response.data.length; i++) {
        showUserOnScreen(Response.data[i],sum);
      }
      console.log(Response);
    })
    .catch((error) => {
      console.log(error);
    });
});

function sellerAdminPage(event) {
  event.preventDefault();

  const sellPrice = event.target.sellingPrice.value;
  const nameOfProduct = event.target.productName.value;

  const obj = {
    sellPrice,
    nameOfProduct,
  };

  axios
    .post("https://crudcrud.com/api/cb3dd8d7887a44609641752355e0d0c8/stockvalue",obj)
    .then((Response) => {
      var sum = 0;
      for (var i = 0; i < Response.data.length; i++) {
        sum = sum + parseInt(Response.data[i].sellPrice);
      }
      console.log(sum);
      showUserOnScreen(Response.data,sum);
      console.log(Response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + `<h4>Something Went Wrong </h4>`;
      console.log(err);
    });
}

function showUserOnScreen(obj,num) {
  const parentItem = document.getElementById("listOfProduct");
  const childItem = document.createElement("li");
  const parentItem1 = document.getElementById("total sum");
  parentItem1.textContent = `Total Value Worth Of Product: Rs${num}`;

  childItem.textContent = obj.sellPrice + " - " + obj.nameOfProduct;
  parentItem.appendChild(childItem);

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  deleteButton.onclick = () => {
    axios
      .delete(
        `https://crudcrud.com/api/cb3dd8d7887a44609641752355e0d0c8/stockvalue/${obj._id}`
      )
      .then((response) => {
        parentItem.removeChild(childItem);
        
      })
      .catch((err) => {
        console.log(err);
      });

  };

  childItem.appendChild(deleteButton);
  parentItem.appendChild(childItem);
}
