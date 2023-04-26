import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap'

import LoginCard from '@/components/login/LoginCard';
import Spinner from '@/components/ui/Spinner';

import { initAuth, initFirebase } from "@/firebaseSetup/firebaseApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

// import CharactersCard from './components/characters/CharactersCard';

const Home = () => {

  initFirebase();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (user) {
    router.push("/dashboard");
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };


  return (
    <Container fluid className='container-fluid overlfow-hidden'>
      <LoginCard signInCall={() => signIn()}/>
    </Container>
  );
}

export default Home;