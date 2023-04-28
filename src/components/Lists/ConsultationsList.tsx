import { Container, Row, Col, ListGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import { GLOBALS } from "../../Globals"
import { getCarePlan, getCarePlanOfPatient } from "../../services/api/care-plan"
import { getPatient } from "../../services/api/patient"
import { Chevron } from "../../assets/ChevronIcons"

export default ({ patientId }: { patientId: string | null }) => {

    let navigate = useNavigate()
    const [consultations, setConsultations] = useState<any>([])
    const [patients, setPatients] = useState<any>([])

    useEffect(() => {
        getConsultations()
        getPatients()
    }, [])

    const getConsultations = async () => {
        let carePlans = []
        if (patientId) carePlans = await getCarePlanOfPatient(patientId).catch(() => { })
        else carePlans = await getCarePlan().catch(() => { })
        setConsultations(carePlans)
    }

    const getPatients = async () => {
        let patientsList = []
        patientsList = await getPatient().catch(() => { })
        setPatients(patients)
    }

    return (
        <Container>
            <Row>
                {patientId ?
                    <h3 className="text-center mt-5">À venir </h3>
                    : <h2 className="text-center mt-5">Consultations en attente </h2>
                }
                <Col>
                    <ListGroup className="my-3">
                        {consultations
                            .filter((consultation: any) => consultation?.status === GLOBALS.CARE_PLAN_STATUS.ACTIVE)
                            .length > 0 ?
                            consultations
                                .filter((consultation: any) => consultation?.status === GLOBALS.CARE_PLAN_STATUS.ACTIVE)
                                .map((consultation: any) => {
                                    return (
                                        <ListGroup.Item
                                            key={consultation.id}
                                            className="d-flex justify-content-between listItem"
                                            onClick={() => navigate("/consultations/" + consultation.id)}
                                        >
                                            <span>Consultation de {consultation.subject.display} du {new Date(consultation.created).toLocaleDateString()}</span>
                                            <span><Chevron right /></span>

                                        </ListGroup.Item>
                                    )
                                })
                            : <p className="text-center">Aucune consultation en attente</p>
                        }
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                {patientId ?
                    <h3 className="text-center mt-5">Passées </h3>
                    : <h2 className="text-center mt-5">Consultations passées </h2>
                }
                <Col>
                    <ListGroup className="my-3">
                        {consultations
                            .filter((consultation: any) => consultation?.status === GLOBALS.CARE_PLAN_STATUS.COMPLETED)
                            .length > 0 ?
                            consultations
                                .filter((consultation: any) => consultation?.status === GLOBALS.CARE_PLAN_STATUS.COMPLETED)
                                .map((consultation: any) => {
                                    return (
                                        <ListGroup.Item
                                            key={consultation.id}
                                            className="d-flex justify-content-between listItem"
                                            onClick={() => navigate("/consultations/" + consultation.id)}
                                        >
                                            <span>Consultation de {consultation.subject.display} du {new Date(consultation.created).toLocaleDateString()}</span>
                                            <span className="text-primary"><Chevron right /></span>
                                        </ListGroup.Item>
                                    )
                                })
                            : <p className="text-center">Aucune consultation passée</p>
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}