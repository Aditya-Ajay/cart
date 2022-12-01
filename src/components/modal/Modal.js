import React from "react";
import { useDispatch } from "react-redux";
import { clear } from "../../features/cart/cartSlice";
import { close } from "../../features/modal/modalSlice";
const Modal = () => {
  const dispatch = useDispatch();
  return (
    <aside className="modal-container">
      <div className="modal">
        WANT TO REMOVE ALL ITEMS FROM THE SHOPPING CART ?
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(clear());
              dispatch(close());
            }}
          >
            CONFIRM
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => {
              dispatch(close());
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
