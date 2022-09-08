import React from "react"
import Header from "../containers/Header"
import MainCard from "../containers/MainCard"
import Head from "next/head"

const Home = () => {
  return (
    <div>
      <Head>
        <title>Wonderland React Challenge</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <MainCard />
    </div>
  )
}

export default Home
