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

const Dashboard = props => {
        
    const [query, setQuery] = useState('')
    // const [isLoading, setIsLoading] = useState(true)
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

    const jobs = [
        {
            "jobId": 1,
            "jobTitle": "Data Science Analyst",
            "Company": "JPMorgan Chase Bank, N.A.",
            "Location":"Mumbai, Maharashtra",
            "PostDate":"1 day ago",
            "Summary":"",
            "jobUrl":"https://in.indeed.com/rc/clk?jk=b529d58933c7b31e&fccid=c46d0116f6e69eae&vjs=3",
            "aggrigator_Type":"indeed"
        },
        {
            "jobId": 2,
            "jobTitle": "Junior Data Scientist",
            "Company": "Analytos            ",
            "Location":"",
            "Salary":"",
            "PostDate":"",
            "Summary":"",
            "jobUrl":"https://www.naukri.com/job-listings-junior-data-scientist-analytos-kolkata-mumbai-new-delhi-hyderabad-secunderabad-pune-chennai-bangalore-bengaluru-0-to-2-years-221118500005",
            "aggrigator_Type":"naukri"
        },
        {
            "jobId": 3,
            "jobTitle": "Machine Learning",
            "Company": "Youth Fusion",
            "Location":"Mumbai, Maharashtra",
            "Salary":"",
            "PostDate":"6 days ago",
            "Summary":"",
            "jobUrl":"https://in.indeed.com/company/Youth-Fusion/jobs/Machine-Learning-Engineer-ff1385288008dce1?fccid=399318776a10694f&vjs=3",
            "aggrigator_Type":"indeed",
        }
    ]


    return (
        <Container fluid className='container-fluid overflow-hidden'>
        <Header signOut={() => auth.signOut()}/>
        <Search getQuery={(q)=> setQuery(q)}/>
        <JobCard jobs={jobs}/>
        {/* <JobCard isLoading={isLoading} jobs={jobs}/> */}
        {/* <CharactersCard isLoading={isLoading} items={items}/> */}
      </Container>
    )
}

export default Dashboard

