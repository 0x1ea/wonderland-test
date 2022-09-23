import { useContext } from "react";
import AppContext from "../context/AppContext";
import {
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
} from "wagmi";
import "../styles/ActionButton.css";

const ActionButton = (props: {
  tokenName: string | number;
  action: any;
  args: any;
  setTxExecuted: (arg0: boolean) => void;
}) => {
  const { state } = useContext(AppContext);

  const { config } = usePrepareContractWrite({
    addressOrName: state[props.tokenName].address,
    contractInterface: state[props.tokenName].abi,
    functionName: props.action,
    args: props.args,
  });
  const contractWrite = useContractWrite(config);

  const contractWait = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    onSuccess() {
      props.setTxExecuted(true);
      setTimeout(() => {
        props.setTxExecuted(false);
      }, 1000);
    },
  });

  return (
    <>
      <div
        className="action-button"
        onClick={() => {
          contractWrite.write?.();
        }}
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
      </div>
    </>
  );
};

export default ActionButton;
