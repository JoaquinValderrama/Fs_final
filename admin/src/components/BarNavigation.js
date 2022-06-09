import {Navbar,Container,Nav} from "react-bootstrap"
import {Link} from "react-router-dom"
import '../App.css'

export default function Navigation() {
  return (
    <Navbar className="bg-main"  expand="lg" variant="dark" >
    <Container>
      <Navbar.Brand>
        CitasOnline
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar"/>
    <Navbar.Collapse id="navbar">
      <Nav className="me-auto">
        <Link className="nav-link" to="/">
         Pacientes
        </Link>
        <Link className="nav-link" to="/medico">
          Médicos
        </Link>
        <Link className="nav-link" to="/especialidad">
          Especialidades
        </Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
