import { useEffect, useState } from "react"

import { Container, Row, Col, ListGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import { getPatient } from "../../services/api/patient"
import { GLOBALS } from "../../Globals"
import { Chevron } from "../../assets/ChevronIcons"
import { getPatientName } from "../../Util"

export default () => {

    let navigate = useNavigate()
    const [patients, setPatients] = useState<any>([])

    useEffect(() => {
        getPatients()
    }, [])

    const getPatients = async () => {
        await getPatient().then((patients) => {
            let patientList: any = patients.filter((patient: any) =>
                (patient?.generalPractitioner?.find((practitioner: any) => (practitioner.reference == "Practitioner/" + GLOBALS.PRACTITIONER_ID)))
            )
            setPatients(patientList)
        }).catch(() => { })
    }

    if (patients === undefined) return (<></>)
    else
        return (
            <Container>
                <Row>
                    <h2 className="text-center mt-5">Mes patients</h2>
                    <ListGroup className="my-3">
                        {patients.map((patient: any) => {
                            return (
                                <ListGroup.Item
                                    key={patient.id}
                                    className="d-flex justify-content-between lien"
                                    onClick={() => navigate("/patients/" + patient.id)}
                                >
                                    {getPatientName(patient)}
                                    <span className="text-primary"><Chevron /></span>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                    <Col></Col>
                </Row>
            </Container>
        )
}