import { Result } from "ethers/lib/utils";
import { ethers } from "ethers";

const TokenData = (props: {
  decimals: string | number;
  tokenName: string | number;
  allowance: Result | undefined;
  balance: Result | undefined;
}) => {
  return (
    <>
      <h1>Send {props.tokenName}:</h1>
      <h2>
        Your balance:{" "}
        {ethers.utils.formatUnits(props.balance || 0, props.decimals)}
      </h2>
      <h2>
        Allowance:{" "}
        {ethers.utils.formatUnits(props.allowance || 0, props.decimals)}
      </h2>
      <p>Amount of {props.tokenName} to transfer or approve:</p>
    </>
  );
};

export default TokenData;
