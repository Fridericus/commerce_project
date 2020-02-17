export const state = () => ({
  // State
  cart: [],
  cartLength: 0,
  shippingPrice: 0,
  shippingEstimatedDelivery: ""
});

export const actions = {
  // Checks to see if the product already exists in the users cart. If not adds it, if so increments it.
  addProductToCart({state, commit}, product) {
    const cartProduct = state.cart.find(prod => prod._id === product._id);
    if(!cartProduct) {
      commit("pushProductToCard", product);
    }else{
      commit("incrementProduct", cartProduct);
    }
    commit("incrementCartLength");
  },
  updateQty({state, commit}, product, qty){
    commit("changeQty", {product, qty});
  }
}

export const mutations = {
  pushProductToCard(state, product){
    product.quantity = 1;
    state.cart.push(product);
  },

  incrementProduct(state, product){
    ["apple", "orange", "mango"]
    product.quantity ++;
    let indexOfProduct = state.cart.indexOf(product);
    state.cart.splice(indexOfProduct, 1, product);
  },

  incrementCartLength(state){
    state.cartLength = 0;
    if (state.cart.length > 0){
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    }
  },

  changeQty(state, {product, qty}){
    let cartProduct = state.cart.find(prod => prod._id === product.id);
    cartProduct.quantity = qty;
    state.cartLength = 0;

    if (state.cart.length > 0){
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    }
    let indexOfProduct = state.cart.indexOf(cartProduct);
    state.cart.splice(indexOfProduct, 1, cartProduct);
  },

  removeProduct(state, product){
    state.cartLength -= product.quantity;
    let indexOfProduct = state.cart.indexOf(product);
    state.cart.splice(indexOfProduct, 1);
  },
  setShipment(state, {price, estimatedDelivery}) {
    state.shippingPrice = price;
    state.shippingEstimatedDelivery = estimatedDelivery;
  },
  clearCart(state){
    state.cart = [];
    state.cartLength = 0;
    state.shippingPrice = 0;
    state.shippingEstimatedDelivery = "";
  }
};

export const getters = {
  getCartLength(state) {
    return state.cartLength;
  },
  getCart(state) {
    return state.cart;
  },
  getCartTotalPrice(state) {
    let total = 0;
    state.cart.map(product => {
      total += product.price * product.quantity;
    });
    return total;
  },
  getCartTotalPriceWithShipping(state) {
    let total = 0;
    state.cart.map(product => {
      total += product.price * product.quantity;
    });
    return total + state.shippingPrice;
  },
  getEstimatedDelivery(state) {
    return state.shippingEstimatedDelivery;
  }
};