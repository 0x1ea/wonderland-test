import { useContext } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import AppContext from "../context/AppContext";

const useContracts = (tokenName: string | number, action: any, args: any) => {
  const { state, setTxOngoing } = useContext(AppContext);
  const { config } = usePrepareContractWrite({
    addressOrName: state[tokenName].address,
    contractInterface: state[tokenName].abi,
    functionName: action,
    args: args,
  });

  const contractWrite = useContractWrite(config);

  const contractWait = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    onSuccess() {
      setTxOngoing(false);
    },
    onError() {
      setTxOngoing(false);
    },
  });

  return {
    contractWrite,
    contractWait,
    setTxOngoing,
  };
};

export default useContracts;
