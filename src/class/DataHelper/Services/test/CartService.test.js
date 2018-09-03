import CartService from '../CartService';

describe('CartServices Testing',() => {
   
    test('can get carts', async () => {
        const carts = await  CartService.getCarts();
        console.log(carts);
        expect(typeof carts).toBe("object");
    });
  
    test('can get cart', async () => {
        const cart = await CartService.getCart(1);
        console.log(cart);
        expect(typeof cart).toBe("object");
    });
  });