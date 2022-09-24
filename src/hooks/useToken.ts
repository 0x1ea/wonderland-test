import { contracts } from "../utils/constants/contracts";
import { useContractRead } from "wagmi";

const useToken = (address: string | undefined, recipient: string) => {
  const daiBalance = useContractRead({
    addressOrName: contracts.DAI.address,
    contractInterface: contracts.DAI.abi,
    functionName: "balanceOf",
    args: address,
  });

  const daiAllowance = useContractRead({
    addressOrName: contracts.DAI.address,
    contractInterface: contracts.DAI.abi,
    functionName: "allowance",
    args: [address, recipient],
  });

  const usdcBalance = useContractRead({
    addressOrName: contracts.USDC.address,
    contractInterface: contracts.USDC.abi,
    functionName: "balanceOf",
    args: address,
  });

  const usdcAllowance = useContractRead({
    addressOrName: contracts.USDC.address,
    contractInterface: contracts.USDC.abi,
    functionName: "allowance",
    args: [address, recipient],
  });

  return {
    daiBalance,
    daiAllowance,
    usdcBalance,
    usdcAllowance,
  };
};

export default useToken;
