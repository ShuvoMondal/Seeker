import React from 'react'
import { Nav, Navbar, NavDropdown,Container } from 'react-bootstrap'

const Header = ({signOut}) => {

  const handleSubmit= (e) => {
    signOut();
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><b>Seeker</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" active>Find Jobs</Nav.Link>
            {/* <Nav.Link href="#link">Profile</Nav.Link> */}
            <Nav.Link onClick={handleSubmit} className='btn btn-danger text-light ms-5'>SignOut</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header