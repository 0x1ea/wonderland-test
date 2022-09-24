import { useState } from "react";
import initialState from "../utils/initialState";

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addUsdcAmount = (payload: string) => {
    setState({
      ...state,
      usdcAmount: payload,
    });
  };

  const addDaiAmount = (payload: string) => {
    setState({
      ...state,
      daiAmount: payload,
    });
  };

  const setRecipient = (payload: string) => {
    setState({
      ...state,
      recipient: payload,
    });
  };

  const setTxOngoing = (payload: boolean) => {
    setState({
      ...state,
      txOngoing: payload,
    });
  };

  const setShowButton = (payload: boolean) => {
    setState({
      ...state,
      showButton: payload,
    });
  };

  return {
    state,
    addUsdcAmount,
    setShowButton,
    addDaiAmount,
    setRecipient,
    setTxOngoing,
  };
};

export default useInitialState;
