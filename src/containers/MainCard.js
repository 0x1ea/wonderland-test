import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { useAccount, useNetwork, useContractRead } from "wagmi"
import SendCard from "./SendSection"

const MainCard = () => {
  const [recipientAddress, setRecipientAddress] = useState()
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const [showButton, setShowButton] = useState(false)
  const [isValidAddress, setIsValidAddress] = useState(false)

  useEffect(() => {
    if (chain?.id === 5 && isConnected && isValidAddress) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [chain, isConnected, isValidAddress])

  return (
    <>
      <div className="bg-zinc-900  max-w-screen-sm sm:mx-auto rounded-xl mx-4 mb-4">
        <h1 className="font-sans font-semibold text-xl md:text-3xl mt-12 text-start pb-2 py-2 px-4">
          React Challenge
        </h1>
        <div className="p-4">
          <p>Recipient/Target Address:</p>
          <input
            className="text-white bg-slate-800 w-full text-md my-1 rounded-md text-right py-1 px-2"
            placeholder="0x123..."
            value={recipientAddress}
            onChange={(event) => {
              setRecipientAddress(event.target.value)
              setIsValidAddress(
                ethers.utils.isAddress(event.target.value) && event.target.value.length === 42
              )
            }}
          />
          {showButton ? (
            <div>
              <SendCard tokenName="USDC" recipient={recipientAddress} />
              <SendCard tokenName="DAI" recipient={recipientAddress} />
            </div>
          ) : (
            <div className="bg-[#ff494a] flex z-10 rounded-lg font-sans text-lg justify-center place-items-center shadow-md  font-bold h-16 mt-6 px-4 md:my-full">
              {!isValidAddress ? <p>Type a valid account</p> : <p>Connect to Goerli network</p>}
            </div>
          )}
        </div>
        <p className="font-sans text-base pb-4 md:col-start-2 p-4 my-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia erat tortor, eget
          auctor libero bibendum sit amet. Mauris ut eleifend sapien.
        </p>
      </div>
    </>
  )
}

export default MainCard
