import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
// const pizzaData = [
//   {
//     name: "Focaccia",
//     ingredients: "Bread with italian olive oil and rosemary",
//     price: 6,
//     photoName: "pizzas/focaccia.jpg",
//     soldOut: false,
//   },
//   {
//     name: "Pizza Margherita",
//     ingredients: "Tomato and mozarella",
//     price: 10,
//     photoName: "pizzas/margherita.jpg",
//     soldOut: false,
//   },
//   {
//     name: "Pizza Spinaci",
//     ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
//     price: 12,
//     photoName: "pizzas/spinaci.jpg",
//     soldOut: false,
//   },
//   {
//     name: "Pizza Funghi",
//     ingredients: "Tomato, mozarella, mushrooms, and onion",
//     price: 12,
//     photoName: "pizzas/funghi.jpg",
//     soldOut: false,
//   },
//   {
//     name: "Pizza Salamino",
//     ingredients: "Tomato, mozarella, and pepperoni",
//     price: 15,
//     photoName: "pizzas/salamino.jpg",
//     soldOut: true,
//   },
//   {
//     name: "Pizza Prosciutto",
//     ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
//     price: 18,
//     photoName: "pizzas/prosciutto.jpg",
//     soldOut: false,
//   },
// ];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Menu() {
  return (
    <div>
      <Pizza
        name="Pizza Margherita"
        photoName="pizzas/margherita.jpg"
        ingrediants="Cheese, Butter, and pepperoni"
        price={113}
      />
      <Pizza
        name="Pizza Funghi"
        photoName="pizzas/funghi.jpg"
        ingrediants="Tomato, mozarella, and pepperoni"
        price={11}
      />
      <Pizza
        name="Pizza Salamino"
        photoName="pizzas/salamino.jpg"
        ingrediants="Tomato, mozarella, and pepperoni"
        price={15}
      />
    </div>
  );
}

function Pizza(props) {
  console.log("Props", props);
  return (
    <div className="pizza">
      <img src={props.photoName} alt={props.name} />
      <div>
        <h1>{props.name}</h1>
        <p>{props.ingrediants}</p>
        <span>{props.price}</span>
      </div>
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>Fast Pizza React Co.</h1>
    </header>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log("isOpen", isOpen);
  return (
    <footer className="footer">
      {new Date().toLocaleDateString()}We are Open Now
    </footer>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<App />);
