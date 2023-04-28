import { Button, Container, Form, Navbar } from "react-bootstrap";

import { Logo } from '../../assets/LogoIcon'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type HeaderProps = {
    changeDarkMode: () => void
    openAccount: () => void
}

export default ({ changeDarkMode, openAccount }: HeaderProps) => {

    return (
        <Navbar>
            <Container fluid>
                <Navbar.Collapse className="justify-content-between mb-5">
                    <Navbar.Brand className="headerLogo" href="/">
                        <Logo />
                    </Navbar.Brand>
                    <h1>ACID consultation tool</h1>

                    <div className="d-flex">
                        <Form className="d-flex me-2">
                            <span className="me-2">&#x263C;</span>
                            <Form.Check
                                type="switch"
                                id="dark-theme"
                                label=" &#9789;"
                                onChange={(e) => changeDarkMode()}
                            />
                        </Form>
                        <div className="lien"
                            onClick={openAccount}
                        >
                            <AccountCircleIcon />
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}