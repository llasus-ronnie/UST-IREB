"use client";
import { signIn, signOut } from 'next-auth/react';
import Home from '../app/home/page'
import Link from 'next/link'


export default function App() {
  return (
    <>
      <Home />
    </>
  );
}