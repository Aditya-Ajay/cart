import React from "react";
import { useEffect } from "react";
import { getCartItems } from "./features/cart/cartSlice";
import { useSelector } from "react-redux";
import CartItem from "./components/CartItem";
import Modal from "./components/modal/Modal";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.cart.isLoading);
  const modalValue = useSelector((state) => state.modal.value);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (loading) {
    return <div className="loading">LOADING ...</div>;
  }

  return (
    <div>
      {modalValue && <Modal />}
      <Navbar />
      <CartItem />
    </div>
  );
};

export default App;
