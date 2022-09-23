import { useState } from "react";
import initialState from "../utils/initialState";

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addDaiBalance = (payload: any) => {
    setState({
      ...state,
      daiBalance: payload,
    });
  };

  const addUsdcBalance = (payload: any) => {
    setState({
      ...state,
      usdcBalance: payload,
    });
  };

  const addAmount = (payload: any) => {
    setState({
      ...state,
      amount: payload,
    });
  };

  const addRecipient = (payload: any) => {
    setState({
      ...state,
      recipient: payload,
    });
  };
  // const removeFromCart = (payload) => {
  //   setState({
  //     ...state,
  //     cart: state.cart.filter((items) => items.id !== payload.id),
  //   });
  // };

  // const addToBuyer = (payload) => {
  //   setState({
  //     ...state,
  //     buyer: [...state.buyer, payload],
  //   });
  // };

  // const addNewOrder = (payload) => {
  //   setState({
  //     ...state,
  //     orders: [...state.orders, payload],
  //   });
  // };

  return {
    addDaiBalance,
    addUsdcBalance,
    addAmount,
    addRecipient,
    // removeFromCart,
    // addToBuyer,
    // addNewOrder,
    state,
  };
};

export default useInitialState;
