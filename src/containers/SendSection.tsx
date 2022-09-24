import { useContext } from "react";
import { ethers } from "ethers";
import AppContext from "../context/AppContext";
import ActionButton from "../components/ActionButton";

const SendCard = (props: {
  tokenName: string | number;
  amount: number;
  balance: ethers.utils.Result | undefined;
  decimals: number;
}) => {
  const { state } = useContext(AppContext);

  return (
    <>
      {props.amount > 0 &&
      props.amount <=
        parseFloat(
          ethers.utils.formatUnits(props.balance || 0, props.decimals)
        ) ? (
        <div className="buttons-section">
          <ActionButton
            tokenName={props.tokenName}
            action="approve"
            args={[
              state.recipient,
              ethers.utils.parseUnits(props.amount.toString(), props.decimals),
            ]}
          />
          <ActionButton
            tokenName={props.tokenName}
            action="transfer"
            args={[
              state.recipient,
              ethers.utils.parseUnits(props.amount.toString(), props.decimals),
            ]}
          />
        </div>
      ) : (
        <div className="wait-button">
          {props.amount >=
          parseFloat(
            ethers.utils.formatUnits(props.balance || 0, props.decimals)
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
