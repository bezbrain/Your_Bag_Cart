import { data } from "../phonesData";
import Footer from "./Footer";
import { FaCartPlus, FaAngleUp, FaAngleDown } from "react-icons/fa";
import "../interface.css";
import { useEffect, useState, useReducer } from "react";

const ACTIONS = {
  CLEAR: "clear",
  REMOVE: "remove",
  INCREASE_COUNT: "increment",
  DECREASE_COUNT: "decrease",
};

const defaultState = {
  product: data,
  sum: 0,
  itemNumber: 0,
};

const reducer = (currState, action) => {
  if (action.type === ACTIONS.CLEAR) {
    return (currState = []);
  } else if (action.type === ACTIONS.REMOVE) {
    return currState.filter((each) => each.id !== action.payload.id);
  } else if (action.type === ACTIONS.INCREASE_COUNT) {
    return currState.map((each) => {
      if (each.id === action.payload.id) {
        return { ...each, count: each.count + 1 };
      }
      return each;
    });
  } else if (action.type === ACTIONS.DECREASE_COUNT) {
    return currState.map((each) => {
      if (each.id === action.payload.id) {
        if (each.count === 0) {
          return each.filter((each) => each.id !== action.payload.id);
        }
        return {
          ...each,
          count: each.count - 1,
        };
      }
      return each;
    });
  }
};

/*=========*/
// The Component
const Interface = () => {
  const [toggleFooter, setToggleFooter] = useState(true);
  const [emptiedCart, setEmptiedCart] = useState(false);

  const [initState, dispatch] = useReducer(reducer, defaultState);

  // Dynamically sum the total amount
  // const totalAmount = initState.reduce((acc, item) => {
  //   let convert = Number(item.price);
  //   return acc + convert;
  // }, 0);

  // To clear cart
  const handleClear = () => {
    dispatch({ type: ACTIONS.CLEAR });
    setToggleFooter(false);
    setEmptiedCart(true);
  };

  // To remove each item clicked
  const handleRemove = (index) => {
    dispatch({ type: ACTIONS.REMOVE, payload: { id: index } });
  };

  // Clear all and bring out the statement "is currently empty" when the last remove btn is clicked
  useEffect(() => {
    if (initState.length === 0) {
      setToggleFooter(false);
      setEmptiedCart(true);
    }
  }, [initState]);

  const handleIncrease = (index) => {
    dispatch({ type: ACTIONS.INCREASE_COUNT, payload: { id: index } });
  };

  const handleDecrease = (index) => {
    dispatch({ type: ACTIONS.DECREASE_COUNT, payload: { id: index } });
  };

  return (
    <>
      <header>
        <div className="header-con">
          <h2>UseReducer</h2>
          <FaCartPlus className="cart" />
          <div className="cart-count">{initState.itemNumber}</div>
        </div>
      </header>
      <section className="body-section">
        <h1>Your Bag</h1>
        {emptiedCart && <p className="cart-emptied">is currently empty</p>}

        {initState.product.map((each) => {
          const { id, img, brand, price, count } = each;
          return (
            <div className="phones-con" key={id}>
              <img src={img} alt="" />
              <article>
                <h3>{brand}</h3>
                <p>${price}</p>
                <p onClick={() => handleRemove(id)}>remove</p>
              </article>
              <div className="counter">
                <FaAngleUp
                  className="angle-up"
                  onClick={() => handleIncrease(id)}
                />
                <p>{count}</p>
                <FaAngleDown
                  className="angle-down"
                  onClick={() => handleDecrease(id)}
                />
              </div>
            </div>
          );
        })}

        {toggleFooter && (
          <Footer clearBtn={handleClear} total={initState.sum} />
        )}
      </section>
    </>
  );
};

export default Interface;
