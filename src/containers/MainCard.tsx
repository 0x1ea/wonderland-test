import { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useAccount, useNetwork } from "wagmi";
import SendCard from "./SendSection";
import "../styles/MainCard.css";

const MainCard = () => {
  const { state, addRecipient } = useContext(AppContext);
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (chain?.id === 5 && isConnected) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [chain, isConnected]);

  return (
    <>
      <div className="card-container">
        <h1 className="card-title">React Challenge</h1>

        <p>Recipient/Target Address:</p>
        <input
          placeholder="0x123..."
          value={state.recipient}
          onChange={(event) => {
            addRecipient(event.target.value);
          }}
        />
        {showButton ? (
          <div>
            <SendCard tokenName="USDC" />
            <SendCard tokenName="DAI" />
          </div>
        ) : (
          ""
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
