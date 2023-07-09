import { Roboto } from 'next/font/google'
import { Header } from "@/components/header/header.component";
import { Menu } from "@/components/menu/menu.component";
import styles from "./mainLayout.module.css";

import '@/styles/globals.css';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})


export default function mainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={roboto.className}>
      <Header></Header>
      <Menu></Menu>
      <section className={styles.wrapper}>
        {children}
      </section>
    </main>
  );
}
