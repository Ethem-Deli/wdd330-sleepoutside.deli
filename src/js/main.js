import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const listElement = document.querySelector(".product-list");

//const productList = new ProductList("Tents", dataSource, element);
//productList.init();
const myList = new ProductList('tents', dataSource, listElement);
myList.init();