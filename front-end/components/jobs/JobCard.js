import React from 'react'
import JobItem from './JobItem';
import { Spinner } from '@/components/ui/Spinner';
import { Row, Container } from "react-bootstrap";

const JobCard = ({jobs}) => {
  return (<Container>
            <Row>
                {jobs.map((job) =>(
                    <JobItem key={job.jobId} job={job}></JobItem>
                ))}
            </Row>

        </Container>)
}

export default JobCard
