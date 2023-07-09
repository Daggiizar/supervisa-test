import { Roboto } from 'next/font/google'

import styles from './page.module.css';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <main className={`${styles.main} ${roboto.className}`}>
    </main>
  )
}
