import BaseModel from "./BaseModel";
import model from "../FirebaseDatabase";

export default class Product extends BaseModel {
  constructor(ref) {
    super(ref);
  }

  async inCludeOptionalFields(products) {
    products = await this.extendTypes(products);
    products = await this.extendBrands(products);
    return products;
  }

  async inCludeOptionalField(product) {
    product = await this.extendType(product);
    product = await this.extendBrand(product);
    return product;
  }

  extendTypes = async products => {
    let types = await model.type.getAll();
    products = products.map(product => {
      types.forEach(type => {
        if (Number(product.typeId) === Number(type.id)) {
          product.type = type;
        }
      });
      return product;
    });
    return products;
  };

  extendType = async product => {
    let type = await model.product.getById(product.typeId);
    product.type = type;
    return product;
  };

  extendBrands = async products => {
    let brands = await model.brand.getAll();

    products = products.map(product => {
      brands.forEach(brand => {
        if (Number(product.brandId) === Number(brand.id)) {
          product.brand = brand;
        }
      });
      return product;
    });
    return products;
  };

  extendBrand = async product => {
    let brand = await model.brand.getById(Number(product.brandId));
    product.brand = brand;
    return product;
  };
}
