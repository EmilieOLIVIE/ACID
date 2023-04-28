import { useState } from "react";

import { Col, Container, Modal, Nav, Row } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";

import Header from './render_components/Header';
import Practitioner from "./Practitioner";


export default () => {

    let location = useLocation();

    const [darkMode, setDarkMode] = useState<boolean>(false)
    const [showAccount, setShowAccount] = useState<boolean>(false)

    /**
     * Extract active tab from location
     * @returns 
     */
    const getNavItemFromLocation = () => {
        let suffix = location.pathname.split("/")[1]
        return suffix === "" ? "consultations" : suffix
    }

    return (
        <Container fluid className={darkMode ? "darkmode" : ""}>
            <div className="shadow-navbar">
                <Header
                    changeDarkMode={() => setDarkMode((prevState) => (!prevState))}
                    openAccount={() => setShowAccount((prevState) => (!prevState))}
                />
                <Row className='justify-content-center'>
                    <Col >
                        <Nav id="navbar" className="w-50 mx-auto" activeKey={getNavItemFromLocation()} variant="tabs" justify>
                            <Nav.Item>
                                <Nav.Link as={Link} to='consultations' eventKey='consultations'>Consultations</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to='patients' eventKey='patients'>Patients</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </div>
            <div className="content">
                <Outlet />
                <Modal show={showAccount} onHide={() => setShowAccount(false)}>
                    <Modal.Header closeButton className={darkMode ? "bg-dark text-light" : ""}>
                        <Modal.Title>Praticien</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={darkMode ? "bg-dark text-light" : ""}>
                        <Practitioner />
                    </Modal.Body>
                </Modal>

            </div>
        </Container>
    )
}