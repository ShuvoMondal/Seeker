import { Button,Card } from 'react-bootstrap'
import {mainSection} from '@/styles/custome.module.css'

const LoginCard = ({signInCall}) => {

  const handleSubmit= (e) => {
    signInCall();
  }


  return (
    <section className='position-relative overflow-hidden'>
      <div className={mainSection}>
        <h1 className='text-center py-5 position-absolute top-50'>Seeker</h1>
        <Card className='position-absolute top-50 end-50 ' style={{ width: '18rem'}}>
          <Card.Body>
            <Card.Title><h2>Login</h2></Card.Title>
            <Button onClick={handleSubmit} variant="danger">Google</Button>
          </Card.Body>
        </Card>
      </div>
    </section>
  )
}

export default LoginCard  