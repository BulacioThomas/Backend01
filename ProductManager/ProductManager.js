import fs from "fs";

class ProductManager {
  constructor() {
    this.patch = "./products.txt";
    this.products = [];
  }
  static id = 0;

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(newProduct);

    await fs.promises.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let res = await fs.promises.readFile(this.patch, "utf-8");
    return JSON.parse(res);
  };

  getProducts = async () => {
    let res2 = await this.readProducts();
    return console.log(res2);
  };

  getProductsById = async (id) => {
    let res3 = await this.readProducts();
    if (!res3.find((product) => product.id === id)) {
      console.log("The product does not exist");
    } else {
      console.log(res3.find((product) => product.id === id));
    }
  };

  deleteProducts = async (id) => {
    let res3 = await this.readProducts();
    let filterRes3 = res3.filter((products) => products.id != id);
    await fs.promises.writeFile(this.patch, JSON.stringify(filterRes3));
    console.log("the product was disposed of correctly");
  };

  updateProducts = async ({ id, ...product }) => {
    await this.deleteProducts(id);
    let productOld = await this.readProducts();
    let productModified = [{ id, ...product }, ...productOld];
    await fs.promises.writeFile(this.patch, JSON.stringify(productModified));
  };
}

const productManager = new ProductManager();

// productManager.addProduct(
//   "Jabon",
//   "Jabon de baño",
//   500,
//   "https://previews.123rf.com/images/begemot_30/begemot_301109/begemot_30110900042/10683452-pedazo-de-jab%C3%B3n-de-tocador-en-un-fondo-blanco.jpg",
//   10,
//   10
// );
// productManager.addProduct(
//   "Toalla",
//   "Toalla de mano",
//   800,
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-kqCfRgJdzwdoe69GxtbMOy7Gt1Mm_icL0QzhUf3vXk2WF4Q9S35tU7oZG9J3Q__RJLc&usqp=CAU",
//   20,
//   20
// );
// productManager.addProduct(
//   "Tomate",
//   "Tomate para ensalada",
//   900,
//   "https://jumboargentina.vtexassets.com/arquivos/ids/339429/Tomate-Redondo-Grande-Por-Kg-1-236726.jpg?v=636393043636870000",
//   30,
//   30
// );

// productManager.getProducts();
// productManager.getProductsById(1);
// productManager.deleteProducts(2);

productManager.updateProducts({
  title: "Toalla",
  description: "toalla de mano",
  price: 400,
  thumbnail:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-kqCfRgJdzwdoe69GxtbMOy7Gt1Mm_icL0QzhUf3vXk2WF4Q9S35tU7oZG9J3Q__RJLc&usqp=CAU",
  code: 20,
  stock: 20,
  id: 1,
});
