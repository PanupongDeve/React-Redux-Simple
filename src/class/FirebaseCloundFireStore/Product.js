import BaseModel from './BaseModel';
import model from '../FirebaseCloundFireStore';

export default class Product extends BaseModel {
    constructor(collection) {
        super(collection);
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
            if (product.type_documentId === type.documentId) {
              product.type = type;
            }
          });
          return product;
        });
        return products;
      };
    
      extendType = async product => {
        let type = await model.product.getByDocumentId(product.type_documentId);
        product.type = type;
        return product;
      };
    
      extendBrands = async products => {
        let brands = await model.brand.getAll();
    
        products = products.map(product => {
          brands.forEach(brand => {
            if (product.brand_documentId === brand.documentId) {
              product.brand = brand;
            }
          });
          return product;
        });
        return products;
      };
    
      extendBrand = async product => {
        let brand = await model.brand.getByDocumentId(product.brand_documentId);
        product.brand = brand;
        return product;
      };
} 