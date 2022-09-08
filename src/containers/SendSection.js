import React from "react"
import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { useAccount, useContractRead } from "wagmi"
import contracts from "../constants/contracts.json"
import ActionButton from "../components/ActionButton"

const SendCard = ({ tokenName, recipient }) => {
  const { address } = useAccount()
  const [amount, setAmount] = useState()
  const [txExecuted, setTxExecuted] = useState(false)

  const balance = useContractRead({
    addressOrName: contracts[tokenName].address,
    contractInterface: contracts[tokenName].abi,
    functionName: "balanceOf",
    args: address,
  })

  const allowance = useContractRead({
    addressOrName: contracts[tokenName].address,
    contractInterface: contracts[tokenName].abi,
    functionName: "allowance",
    args: [address, recipient],
  })

  useEffect(() => {
    balance.refetch()
    allowance.refetch()
  }, [txExecuted])

  return (
    <>
      <h1 className="text-lg mt-7 font-semibold">Send {tokenName}:</h1>
      <h2 className="text-md font-light">
        Your balance: {ethers.utils.formatUnits(balance.data || 0, contracts[tokenName].decimals)}
      </h2>
      <h2 className="text-md font-light">
        Allowance: {ethers.utils.formatUnits(allowance.data || 0, contracts[tokenName].decimals)}
      </h2>
      <p className="mt-4">Amount of {tokenName} to transfer or approve:</p>
      <input
        className="text-white bg-slate-800 w-full text-2xl my-1 rounded-md text-right py-1 px-2"
        placeholder="0.0"
        value={amount}
        onChange={(event) => {
          setAmount(event.target.value)
        }}
      />
      {amount > 0 &&
      amount <
        parseFloat(ethers.utils.formatUnits(balance.data || 0, contracts[tokenName].decimals)) ? (
        <div className="grid grid-cols-2 grid-rows-1 md:grid-rows-1 md:grid-cols-2 gap-4">
          <ActionButton
            setTxExecuted={setTxExecuted}
            tokenName={tokenName}
            action="approve"
            args={[
              recipient,
              ethers.utils.parseUnits(amount.toString(), contracts[tokenName].decimals),
            ]}
          />
          <ActionButton
            setTxExecuted={setTxExecuted}
            tokenName={tokenName}
            action="transfer"
            args={[
              recipient,
              ethers.utils.parseUnits(amount.toString(), contracts[tokenName].decimals),
            ]}
          />
        </div>
      ) : (
        <div
          className="bg-[#ff494a] flex z-10 rounded-lg cursor-pointer font-sans text-lg justify-center 
                        place-items-center shadow-md hover:scale-x-101 font-bold h-16 mt-6 px-4 md:my-full w-full"
        >
          {amount >=
          parseFloat(
            ethers.utils.formatUnits(balance.data || 0, contracts[tokenName].decimals)
          ) ? (
            <p>Insufficient balance</p>
          ) : (
            <p>Type some {tokenName}</p>
          )}
        </div>
      )}
    </>
  )
}

export default SendCard
