import { useContext, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";

import SendCard from "./SendSection";
import AppContext from "../context/AppContext";
import useToken from "../hooks/useToken";
import TokenData from "../components/TokenData";
import RecipientInput from "../components/RecipientInput";
import "../styles/MainCard.css";

const MainCard = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { state, addUsdcAmount, addDaiAmount, setShowButton } =
    useContext(AppContext);

  const { daiBalance, daiAllowance, usdcBalance, usdcAllowance } = useToken(
    address,
    state.recipient
  );

  useEffect(() => {
    if (
      chain?.id === 5 &&
      isConnected &&
      ethers.utils.isAddress(state.recipient) &&
      state.recipient.length === 42
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }

    daiBalance.refetch();
    usdcBalance.refetch();
    daiAllowance.refetch();
    usdcAllowance.refetch();
  }, [chain, isConnected, state.recipient, state.txOngoing]);

  return (
    <>
      <div className="card-container">
        <RecipientInput />
        {state.showButton && (
          <div>
            <TokenData
              tokenName={"DAI"}
              decimals={18}
              balance={daiBalance.data}
              allowance={daiAllowance.data}
            />
            <input
              placeholder="0.0"
              value={state.daiAmount}
              type="number"
              onChange={(event) => {
                addDaiAmount(parseFloat(event.target.value));
              }}
            />
            <SendCard
              tokenName="DAI"
              amount={state.daiAmount}
              balance={daiBalance.data}
              decimals={18}
            />

            <TokenData
              tokenName={"USDC"}
              decimals={6}
              balance={usdcBalance.data}
              allowance={usdcAllowance.data}
            />
            <input
              placeholder="0.0"
              value={state.usdcAmount}
              type="number"
              onChange={(event) => {
                addUsdcAmount(parseFloat(event.target.value));
              }}
            />
            <SendCard
              tokenName="USDC"
              amount={state.usdcAmount}
              balance={usdcBalance.data}
              decimals={6}
            />
          </div>
        )}
        <p className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          lacinia erat tortor, eget auctor libero bibendum sit amet. Mauris ut
          eleifend sapien.
        </p>
      </div>
    </>
  );
};

export default MainCard;
