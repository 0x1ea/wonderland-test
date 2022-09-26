import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import useContracts from "../hooks/useContracts";
import "../styles/ActionButton.css";

const ActionButton = (props: {
  tokenName: string | number;
  action: any;
  args: any;
}) => {
  const { state } = useContext(AppContext);

  const { contractWrite, contractWait, setTxOngoing } = useContracts(
    props.tokenName,
    props.action,
    props.args
  );

  return (
    <>
      <button
        className="action-button"
        onClick={() => {
          setTxOngoing(true);
          contractWrite.writeAsync?.().catch(() => setTxOngoing(false));
        }}
        disabled={state.txOngoing}
      >
        <p className="text-button">
          {contractWrite.status === "idle" &&
            `${props.action.toUpperCase()} ${props.tokenName}`}
          {contractWrite.status === "loading" && "Wating approval..."}
          {contractWrite.status === "error" &&
            `${props.action.toUpperCase()} ${props.tokenName}`}
          {contractWait.status === "loading" && "Waiting confirmation..."}
          {contractWait.status === "success" && "Transaction success!"}
        </p>
      </button>
    </>
  );
};

export default ActionButton;
