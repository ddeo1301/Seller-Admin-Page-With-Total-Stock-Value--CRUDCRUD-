//var sum = 0;

window.addEventListener("DOMContentLoaded", () => {
  var sum = 0;
  axios
    .get("https://crudcrud.com/api/b284a2f3cae3482f822088ce106cc7ca/stockvalue")
    .then((Response) => {
        //var sum = 0;
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

  //sum = sum + parseInt(obj.sellPrice);

  axios
    .post("https://crudcrud.com/api/b284a2f3cae3482f822088ce106cc7ca/stockvalue",obj)
    .then((Response) => {
      showUserOnScreen(Response.data);
      console.log(Response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + `<h4>Something Went Wrong </h4>`;
      console.log(err);
    });
    location.reload();
}

function showUserOnScreen(obj,num) {
  const parentItem = document.getElementById("listOfProduct");
  //const parentItem = document.getElementById("totalStockValue");
  const childItem = document.createElement("li");

  // const childItem1 = document.createElement('h2');
  // childItem1.textContent = 'Products';

  //const childItem2 = document.createElement('h5');
//   const item = document.querySelectorAll("#sellingPrice");
//   console.log(item);
//   for (var i = 0; i < item.length; i++) {
//     sum += parseInt(item[i].value);
//   }

  //childItem2.textContent = 'Total Value Worth Of Product: Rs' + sum;
  const parentItem1 = document.getElementById("total sum");
  parentItem1.textContent = `Total Value Worth Of Product: Rs${num}`;

  childItem.textContent = obj.sellPrice + " - " + obj.nameOfProduct;

  // parentItem.appendChild(childItem1);
  parentItem.appendChild(childItem);
  // parentItem.appendChild(childItem2);

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  deleteButton.onclick = () => {
    axios
      .delete(
        `https://crudcrud.com/api/b284a2f3cae3482f822088ce106cc7ca/stockvalue/${obj._id}`
      )
      .then((response) => {
        parentItem.removeChild(childItem);
        //parentItem.removeChild(childItem1);
        //parentItem.removeChild(childItem2);
        //sum -= parseInt(item[item.length-1].value);

        // const item = document.querySelectorAll("#sellingPrice");
        // console.log(item);
        // for (var i = 0; i < item.length; i++) {
        //   sum += parseInt(item[i].value);
        // }
        // parentItem1.textContent = "Total Value Worth Of Product: Rs" + sum;

        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

  };

  childItem.appendChild(deleteButton);
  //parentItem.appendChild(childItem2);
}
