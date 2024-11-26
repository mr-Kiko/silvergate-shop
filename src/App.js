import React, { useState } from "react";
import "./App.css";
import image1 from "../src/images/silverBar1.jpeg";
import image2 from "../src/images/silverBar2.jpeg";
import image3 from "../src/images/silverBar3.jpeg";
import image4 from "../src/images/silverBar4.jpeg";
import image5 from "../src/images/silverBar5.jpeg";
import pkg1 from "../src/images/pkg1.jpeg";
import pkg2 from "../src/images/pkg2.jpeg";
import pkg3 from "../src/images/pkg3.jpeg";
import pkg4 from "../src/images/pkg4.jpeg";
import pkg5 from "../src/images/pkg5.jpeg";

function App() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 50,
      imageUrl: image1,
      describe: "hello world",
    },
    {
      id: 2,
      name: "Product 2",
      price: 30,
      imageUrl: image2,
      describe: "This is a bad product.",
    },
    {
      id: 3,
      name: "Product 3",
      price: 40,
      imageUrl: image3,
      describe: "This is a good product.",
    },
    {
      id: 4,
      name: "Product 4",
      price: 60,
      imageUrl: image4,
      describe: "This is a bad product.",
    },
    {
      id: 5,
      name: "Product 5",
      price: 20,
      imageUrl: image5,
      describe: "This is a good product.",
    },
  ];

  const packagingOptions = [
    {
      id: 1,
      name: "Package Option 1",
      price: 10,
      imageUrl: pkg1,
      describe: "Package with extra items.",
    },
    {
      id: 2,
      name: "Package Option 2",
      price: 15,
      imageUrl: pkg2,
      describe: "Special pack for more value.",
    },
    {
      id: 3,
      name: "Package Option 3",
      price: 12,
      imageUrl: pkg3,
      describe: "Affordable package with essential items.",
    },
    {
      id: 4,
      name: "Package Option 4",
      price: 20,
      imageUrl: pkg4,
      describe: "Premium package with extra features.",
    },
    {
      id: 5,
      name: "Package Option 5",
      price: 25,
      imageUrl: pkg5,
      describe: "Exclusive package with limited edition items.",
    },
  ];

  const [cart, setCart] = useState({});
  const [openCard, setOpenCard] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showPackaging, setShowPackaging] = useState(null); // برای ذخیره محصولی که روی آن کلیک شده

  // Add product to cart
  const addToCart = (id, price, name) => {
    setCart((prevCart) => {
      const newQuantity = prevCart[id] ? prevCart[id].quantity + 1 : 1;
      const updatedCart = {
        ...prevCart,
        [id]: {
          quantity: newQuantity,
          price,
          name,
        },
      };
      // Show the invoice when the first item is added
      if (!showInvoice) {
        setShowInvoice(true);
      }
      return updatedCart;
    });
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[id];
      // Hide invoice if the cart is empty
      if (Object.keys(updatedCart).length === 0) {
        setShowInvoice(false);
      }
      return updatedCart;
    });
  };

  // Toggle product details view
  const toggleCard = (id) => {
    setOpenCard((prevCard) => (prevCard === id ? null : id));
  };

  // Toggle packaging options visibility
  const togglePackaging = (id) => {
    setShowPackaging(showPackaging === id ? null : id);
  };

  // Calculate total price and quantity in the cart
  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const totalQuantity = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="background">
      <div className="text-container">
        <h1 className="title">SilverGate</h1>
        <p className="subtitle">Quality products for you</p>
      </div>
      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <div className="card-main" onClick={() => toggleCard(product.id)}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="card-image"
              />
              <h2 className="card-title">{product.name}</h2>
              <p className="card-desc">Details: {product.describe}</p>
            </div>
            <div
              className={`card-details ${
                openCard === product.id ? "open" : ""
              }`}
            >
              {openCard === product.id ? (
                <>
                  <p className="card-price">Price: ${product.price}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() =>
                      addToCart(product.id, product.price, product.name)
                    }
                  >
                    Add to Cart
                  </button>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => togglePackaging(product.id)}
                  >
                    Packaging Options
                  </button>
                </>
              ) : null}
            </div>
            <div className="centerize">
              <div className="packaging-container">
                {showPackaging === product.id &&
                  openCard === product.id &&
                  packagingOptions.map((pkg) => (
                    <div key={pkg.id} className="packaging-card">
                      <div
                        className="packaging-main"
                        onClick={() => addToCart(pkg.id, pkg.price, pkg.name)}
                      >
                        <img
                          src={pkg.imageUrl}
                          alt={pkg.name}
                          className="card-image"
                        />
                        <h2 className="card-title">{pkg.name}</h2>
                        <p className="card-desc">Details: {pkg.describe}</p>
                        <p className="card-price">Price: ${pkg.price}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showInvoice && (
        <div className={`invoice ${showInvoice ? "open" : ""}`}>
          <div className="invoice-header">
            <h2 className="invoice-title">Invoice</h2>
            <p className="invoice-date">Date: 10 Dec 2022</p>
          </div>

          <div className="invoice-body">
            <div className="invoice-products">
              {Object.entries(cart).map(([id, item]) => (
                <div className="invoice-product" key={id}>
                  <div className="product-name">{item.name}</div>
                  <div className="product-quantity">x{item.quantity}</div>
                  <div className="product-price">
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="invoice-summary">
              <div className="summary-item">
                <span>Total Items:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="summary-item">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Tax (10%):</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="invoice-footer">
            <button className="checkout-button">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
