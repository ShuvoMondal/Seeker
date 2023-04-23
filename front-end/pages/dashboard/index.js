import {useState, useEffect} from 'react';
import { Container,Button } from 'react-bootstrap';

import Search from '@/components/ui/Search';
import Header from '@/components/ui/Header';
import JobCard from '@/components/jobs/JobCard';
import Spinner from '@/components/ui/Spinner';
import JobItem from '../../components/jobs/JobItem';

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { initAuth } from '@/firebaseSetup/firebaseApp';

const Dashboard = props => {
        
    const [query, setQuery] = useState('')
    console.warn(query);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) {
        return <Spinner></Spinner>;
    }

    if (!user) {
        router.push("/");
    }



    return (
        <Container fluid className='container-fluid overflow-hidden'>
        <Header signOut={() => auth.signOut()}/>
        <Search getQuery={(q)=> setQuery(q)}/>
        <JobItem/>
        {/* <CharactersCard isLoading={isLoading} items={items}/> */}
      </Container>
    )
}

export default Dashboard

