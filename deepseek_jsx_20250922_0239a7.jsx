// components/Layout.js
import Head from 'next/head'

export default function Layout({ children, title = 'BusinessFlow - Modern Business Management' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="All-in-one business management platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  )
}