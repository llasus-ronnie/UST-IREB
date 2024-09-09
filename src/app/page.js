"use client";
import { signIn, signOut } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../app/home/page";
import Head from "next/head";
import Link from "next/link";

export default function App() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
}
