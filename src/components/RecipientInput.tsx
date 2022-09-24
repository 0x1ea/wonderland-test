import { useContext } from "react";
import AppContext from "../context/AppContext";

function RecipientInput() {
  const { state, setRecipient } = useContext(AppContext);

  return (
    <>
      <h1 className="card-title">React Challenge</h1>
      <p>Recipient/Target Address:</p>
      <input
        value={state.recipient}
        placeholder="0x123..."
        type="text"
        onChange={(e) => {
          setRecipient(e.target.value);
        }}
      />
    </>
  );
}

export default RecipientInput;
