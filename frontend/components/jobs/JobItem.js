import { Col,Card, Row , Badge} from "react-bootstrap"


const JobItem = ({job}) => {
  return (
        <div className="col-lg-6 col-md-4 col-sm-12 mt-4">
            <Card className="shadow-sm rounded">
                <Card.Body>
                    <Card.Text>{job.Location || "N/A"}</Card.Text>
                    <Card.Title><h2>{job.jobTitle || "N/A"}</h2></Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">{job.Company || "N/A"}</Card.Subtitle>
                    <div className="mb-3">
                        <Badge bg="warning" text="dark" className="">{job.PostDate || "N/A"}</Badge>
                        <Badge bg="info" text="dark" className="mx-2">{job.aggrigator_Type || "N/A"}</Badge>
                    </div>
                    <Card.Link href={job.jobUrl || ''} target="_blank">Apply Now</Card.Link>
                </Card.Body>
            </Card>
        </div>
  )
}

export default JobItem