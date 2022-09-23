import { useContext } from "react";
import AppContext from "../context/AppContext";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import ActionButton from "../components/ActionButton";
import "../styles/SendSection.css";

const SendCard = (props: { tokenName: string | number }) => {
  const { state, addAmount } = useContext(AppContext);
  const { address } = useAccount();
  const [txExecuted, setTxExecuted] = useState(false);

  const balance = useContractRead({
    addressOrName: state[props.tokenName].address,
    contractInterface: state[props.tokenName].abi,
    functionName: "balanceOf",
    args: address,
  });

  const allowance = useContractRead({
    addressOrName: state[props.tokenName].address,
    contractInterface: state[props.tokenName].abi,
    functionName: "allowance",
    args: [address, state.recipient],
  });

  useEffect(() => {
    balance.refetch();
    allowance.refetch();
  }, [txExecuted]);

  return (
    <>
      <h1>Send {props.tokenName}:</h1>
      <h2>
        Your balance:{" "}
        {ethers.utils.formatUnits(
          balance.data || 0,
          state[props.tokenName].decimals
        )}
      </h2>
      <h2>
        Allowance:{" "}
        {ethers.utils.formatUnits(
          allowance.data || 0,
          state[props.tokenName].decimals
        )}
      </h2>
      <p>Amount of {props.tokenName} to transfer or approve:</p>
      <input
        placeholder="0.0"
        value={state.amount}
        onChange={(event) => {
          addAmount(parseFloat(event.target.value));
        }}
      />
      {state.amount > 0 &&
      state.amount <
        parseFloat(
          ethers.utils.formatUnits(
            balance.data || 0,
            state[props.tokenName].decimals
          )
        ) ? (
        <div className="buttons-section">
          <ActionButton
            setTxExecuted={setTxExecuted}
            tokenName={props.tokenName}
            action="approve"
            args={[
              state.recipient,
              ethers.utils.parseUnits(
                state.amount.toString(),
                state[props.tokenName].decimals
              ),
            ]}
          />
          <ActionButton
            setTxExecuted={setTxExecuted}
            tokenName={props.tokenName}
            action="transfer"
            args={[
              state.recipient,
              ethers.utils.parseUnits(
                state.amount.toString(),
                state[props.tokenName].decimals
              ),
            ]}
          />
        </div>
      ) : (
        <div className="wait-button">
          {state.amount >=
          parseFloat(
            ethers.utils.formatUnits(
              balance.data || 0,
              state[props.tokenName].decimals
            )
          ) ? (
            <p>Insufficient balance</p>
          ) : (
            <p>Type some {props.tokenName}</p>
          )}
        </div>
      )}
    </>
  );
};

export default SendCard;
