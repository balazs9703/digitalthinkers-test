import Head from 'next/head'
import Link from 'next/link'

export default function Cocktail() {
  return (
    <div >
      <Head>
        <title>Digitaltinkers Cocktail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/cocktail">Cocktail</Link>
    </div>
  )
}
