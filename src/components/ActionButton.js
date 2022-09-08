import React from "react"
import contracts from "../constants/contracts.json"
import { useContractWrite } from "wagmi"
import { useWaitForTransaction } from "wagmi"

const ActionButton = ({ tokenName, setTxExecuted, action, args }) => {
  const contractWrite = useContractWrite({
    addressOrName: contracts[tokenName].address,
    contractInterface: contracts[tokenName].abi,
    functionName: action,
    args: args,
  })

  const contractWait = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    onSuccess() {
      setTxExecuted(true)
      setTimeout(() => {
        setTxExecuted(false)
      }, 1000)
    },
  })

  return (
    <>
      <div
        className="flex z-10 rounded-lg bg-blue-500 cursor-pointer font-sans sm:text-base md:text-lg justify-center place-items-center shadow-md hover:scale-101 font-bold mx-auto h-16 mt-6 w-full"
        onClick={() => {
          contractWrite.writeAsync().catch((error) => console.log(error.message))
        }}
      >
        <p>
          {contractWrite.status === "idle" && `${action.toUpperCase()} ${tokenName}`}
          {contractWrite.status === "loading" && "Wating approval..."}
          {contractWrite.status === "error" && `${action.toUpperCase()} ${tokenName}`}
          {contractWait.status === "loading" && "Waiting confirmation..."}
          {contractWait.status === "success" && "Transaction success!"}
        </p>
      </div>
    </>
  )
}

export default ActionButton
