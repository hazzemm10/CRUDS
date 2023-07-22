var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var tableRow = document.getElementById("box");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var products = [];

if (localStorage.getItem("productss") != null) {
  products = JSON.parse(localStorage.getItem("productss"));
  displayProduct(products);
}

function addProduct() {
//   if (nameRegex() == true && priceRegex() == true) 
    var product = {
      pName: productName.value,
      pPrice: productPrice.value,
      pCategory: productCategory.value,
      pdesc: productDesc.value,
     };
    products.push(product);
    localStorage.setItem("productss", JSON.stringify(products));
    displayProduct(products);
    clearForm();
  }
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function displayProduct(arr) {
  var box = ``;
  for (var i = 0; i < arr.length; i++) {
    box += `<tr><td>${i + 1}</td>
        <td>${arr[i].pName}</td>
        <td>${arr[i].pPrice}</td>
        <td>${arr[i].pCategory}</td>
        <td>${arr[i].pdesc}</td>
        <td> <button onclick="updateProduct(${i})" type="button" class="btn btn-primary">Update</button> </td>
        <td>  <button onclick="deleteProduct(${i})" type="button" class="btn btn-danger">Delete</button>          </td>
        </tr>`;
  }
  tableRow.innerHTML = box;
}

function deleteProduct(productIndex) {
  products.splice(productIndex, 1);
  localStorage.setItem("productss", JSON.stringify(products));
  displayProduct(products);
}

function searchProduct(term) {
  var matchedProduct = [];
  for (var i = 0; i < products.length; i++) {
    if (products[i].pName.toLowerCase().includes(term.toLowerCase()) == true) {
      matchedProduct.push(products[i]);
    }
  }

  displayProduct(matchedProduct);
}
var globalIndex;
function updateProduct(i) {
  globalIndex = i;
  updateBtn.classList.replace("d-none", "d-block");
  addBtn.classList.add("d-none");
  productName.value = products[i].pName;
  productPrice.value = products[i].pPrice;
  productCategory.value = products[i].pCategory;
  productDesc.value = products[i].pdesc;
}

function finalUpdate() {
  for (var i = 0; i < products.length; i++) {
    products[globalIndex].pName = productName.value;
    products[globalIndex].pPrice = productPrice.value;
    products[globalIndex].pCategory = productCategory.value;
    products[globalIndex].pdesc = productDesc.value;
  }
  localStorage.setItem("productss", JSON.stringify(products));
  displayProduct(products);
  clearForm();
}

// function nameRegex() {
//   var regex = /^[A-Z][a-z]{4}$/;
//   if (regex.test(productName.value) == true) return true;
//   else {
//     alert("error");
//     return false;
//   }
// }
// function priceRegex() {
//   var regex = /^[0-9]{4}$/;
//   if (regex.test(productPrice.value) == true) return true;
//   else {
//     alert("error");
//     return false;
//   }
// }
