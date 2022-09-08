import { useRouter } from 'next/router'
import { setState } from '@/helpers/store'
import {useEffect, useState} from 'react'
import Header from '@/config'
import Dom from '@/components/layout/dom'
import '@/styles/index.css'
import dynamic from 'next/dynamic'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: true,
})

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()

  useEffect(() => {
    setState({ router })
  }, [router])

  return (
    <>
        <Header title={pageProps.title} />
        <Dom>
          <Component {...pageProps} />
        </Dom>
        {Component?.R3F && <LCanvas>{Component.R3F(pageProps)}</LCanvas>}
    </>
  )
}

export default App
