import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import JsonEditor from '../components/jsonEditor'
import ControlPanel from '../components/controlPanel'
import { fetchJsonData } from './api/api'
import useSWR from 'swr'
import axios from 'axios'
import { useEffect, useState } from 'react'


interface IHomeProps {
  data: JSON
}

interface IHomeState {
}

// const fetcher = (...args:any) => axios.get(args.url).then((data) =>data).catch( (error)=>error)

// const url = 'https://random-data-api.com/api/name/random_name?size=4'

// function jsonData (props:any) {
//   // Here the `fetcher` function will be executed on the client-side.
//   const { data } = useSWR(url, fetcher, { initialData: props.posts })
//   return data
//   // ...
// }

const Home: NextPage<IHomeProps> = ({data}) => {
  //const resp = useSWR(url, fetcher)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <JsonEditor data={data}/>
        <ControlPanel refetchData={()=>{console.log('clicked')}} />
      </main>
    </div>
  )
}

export async function getStaticProps(context : any) {
  const res = await fetch('https://random-data-api.com/api/name/random_name?size=4')
  const json = await res.json()


  return { 
    props: {
      data: json
    }
  }
}

export default Home
