import React, {useState} from 'react'
import {headerSearchSection} from '@/styles/custome.module.css'
import { Container, Card, Form, Button } from 'react-bootstrap'


const Search = ({getQuery}) => {
    
    const [jobTitle, setJobTitle] = useState('');
    const [jobLocation, setJobLocation] = useState('');

    const handleForm = (e) => {
        console.warn(e.target.value);
        setJobTitle(e.target.value);
    }
    const handleForm1= (e) => {
        console.error(e.target.value);
        setJobLocation(e.target.value);
    }
    
    const handleSubmit= (e) => {
        e.preventDefault()
        getQuery({"name":jobTitle,"location":jobLocation});
    }
    
    
    return (
        <>
            <section>
                <div className={headerSearchSection}>
                    <Container>
                        <h1 className='pt-5 pb-3'><b>Find Your Dream Job Here</b></h1>
                        <Card body>
                        <Form className='row' onSubmit={handleSubmit}>
                            <Form.Group className="my-3 col-5" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Job Titile" value={jobTitle} onChange={handleForm} autoFocus />
                            </Form.Group>
                            <Form.Group className="my-3 col-5" controlId="formBasicPassword">
                                <Form.Control type="text" placeholder="Job location" value={jobLocation} onChange={handleForm1} />
                            </Form.Group>
                            <Button variant="primary" type="submit" className='col-1  my-3'>
                                Search
                            </Button>
                        </Form>
                        </Card>
                    </Container>
                </div>
            </section>
        </>
    )
}

export default Search
