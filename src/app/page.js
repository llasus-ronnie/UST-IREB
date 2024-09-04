"use client";
import { signIn, signOut } from 'next-auth/react';
import SignInOption from './signinoption/page';
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <SignInOption />
    </>
  );
}