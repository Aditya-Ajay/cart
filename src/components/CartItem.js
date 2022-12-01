import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { open } from "../features/modal/modalSlice";
import {
  clear,
  remove,
  increase,
  decrease,
  calculate,
} from "../features/cart/cartSlice";
import { ChevronDown, ChevronUp } from "../icon";

const CartItem = () => {
  const cart = useSelector((state) => state.cart.cartItem);
  const amount = useSelector((state) => state.cart.amount);
  const dispatch = useDispatch();
  const { total } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(calculate());
  }, [cart]);

  return (
    <section className="cart">
      <header>
        <h1>YOUR BAG DETAILS</h1>
      </header>
      {!amount ? (
        <h4 style={{ marginLeft: "4rem", marginTop: "5rem" }}>
          THERE IS NOTHING TO SHOW IN YOUR BAG 😢
        </h4>
      ) : (
        <section className="cart">
          <div>
            {cart.map((e) => {
              const { id, price, title, img, amount } = e;
              return (
                <article className="cart-item">
                  <img src={img} alt="productItems" />
                  <div>
                    <h4>{title}</h4>
                    <h4>{price}</h4>
                    <button
                      className="remove-btn"
                      onClick={() => {
                        dispatch(remove({ id }));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <div>
                    <button
                      className="amount-btn"
                      onClick={() => {
                        dispatch(increase(id));
                      }}
                    >
                      <ChevronUp />
                    </button>
                    <p className="amount">{amount}</p>
                    <button
                      className="amount-btn"
                      onClick={() => {
                        if (amount === 1) {
                          dispatch(remove({ id }));
                        }

                        dispatch(decrease(id));
                      }}
                    >
                      <ChevronDown />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <footer>
            <hr />
            <div className="cart-total">
              <h4 style={{ marginTop: "1rem" }}>
                Total <span>{total}</span>
              </h4>
            </div>
            <button
              className="btn clear-btn"
              onClick={() => {
                dispatch(open());
              }}
            >
              CLEAR BUTTON
            </button>
          </footer>
        </section>
      )}
    </section>
  );
};

export default CartItem;
