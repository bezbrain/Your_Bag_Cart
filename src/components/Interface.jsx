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
  itemNumber: 0,
  sum: 0,
};

const reducer = (currState, action) => {
  if (action.type === ACTIONS.CLEAR) {
    return { ...currState, product: [] };
  } else if (action.type === ACTIONS.REMOVE) {
    return {
      ...currState,
      product: currState.product.filter(
        (each) => each.id !== action.payload.id
      ),
    };
  } else if (action.type === ACTIONS.INCREASE_COUNT) {
    return {
      ...currState,
      product: currState.product.map((each) => {
        if (each.id === action.payload.id) {
          return { ...each, count: each.count + 1 };
        }
        return each;
      }),
    };
  } else if (action.type === ACTIONS.DECREASE_COUNT) {
    return {
      ...currState,
      product: currState.product
        .map((each) => {
          if (each.id === action.payload.id) {
            if (each.count === 0) {
              return null;
            }
            return {
              ...each,
              count: each.count - 1,
            };
          }
          return each;
        })
        .filter((each) => each.count !== 0),
    };
  }
};

/*=========*/
// The Component
const Interface = () => {
  const [toggleFooter, setToggleFooter] = useState(true);
  const [emptiedCart, setEmptiedCart] = useState(false);

  const [initState, dispatch] = useReducer(reducer, defaultState);

  // Dynamically sum the total amount
  const sumTotal = initState.product
    .map((each) => {
      let convert = each.count * Number(each.price);
      return (initState.sum = convert);
    })
    .reduce((acc, curr) => acc + curr, 0);

  // Dynamically aggregating the cart number
  const aggCount = initState.product
    .map((each) => {
      return (initState.itemNumber = each.count);
    })
    .reduce((acc, curr) => acc + curr, 0);

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
    if (initState.product.length === 0) {
      setToggleFooter(false);
      setEmptiedCart(true);
      // dispatch({ type: ACTIONS.CLEAR });
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
          <div className="cart-count">{aggCount}</div>
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
          <Footer clearBtn={handleClear} total={sumTotal.toFixed(2)} />
        )}
      </section>
    </>
  );
};

export default Interface;
