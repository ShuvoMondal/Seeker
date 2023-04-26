import {useState, useEffect} from 'react';
import { Container,Button } from 'react-bootstrap';

import Search from '@/components/ui/Search';
import Header from '@/components/ui/Header';
import JobCard from '@/components/jobs/JobCard';
import Spinner from '@/components/ui/Spinner';

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { initAuth } from '@/firebaseSetup/firebaseApp';
import { getDatabase, onValue, ref } from 'firebase/database';

const Dashboard = props => {
    
    const db = getDatabase();
    const [query, setQuery] = useState({})
    const [jobs, setJobs] = useState([])
    console.log(query)
    useEffect(()=> {
        const jobsRef = ref(db, 'jobs-data/');
        onValue(jobsRef, (snapshot)=>{
            const data = snapshot.val();
            const searchJob = (job) =>{
                if(query.name && query.location){
                    return job.jobTitle.toLowerCase().includes(query.name.toLowerCase()) && job.Location.toLowerCase().includes(query.location.toLowerCase());
                }
                else if(query.name){
                    return job.jobTitle.toLowerCase().includes(query.name.toLowerCase())
                }
                if(query.location){
                    return job.Location.toLowerCase().includes(query.location.toLowerCase());
                }
                return job.jobTitle.includes(query.name) || job.Location.includes(query.location);
            }
            if(data){
                const newJobs = Object.keys(data).map(key=>({
                    id:key,
                    ...data[key]
                }));
                const result = newJobs.filter(searchJob);
                console.log(result);
                setJobs(result)
            }
        });
    },[query]);

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
        <JobCard jobs={jobs}/>
      </Container>
    )
}

export default Dashboard

