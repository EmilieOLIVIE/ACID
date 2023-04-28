import { useEffect, useState } from "react"

import { Button, Col, Container, Row } from "react-bootstrap"
import { useParams } from 'react-router-dom'

import { getPatient } from "../services/api/patient"
import { Chevron } from "../assets/ChevronIcons"

import ConsultationsList from "./Lists/ConsultationsList"
import Loader from "./render_components/Loader"
import { getPatientName } from "../Util"

export default () => {

    let { id } = useParams()

    const [patient, setPatient] = useState<any>({})

    useEffect(() => {
        getPatientInfo()
    }, [id])

    /**
     * Fetches the patient's info from the API
     */
    const getPatientInfo = async () => {
        let patientInfo = await getPatient(id).catch(() => { })
        setPatient(patientInfo)
    }

    if (!patient.id) return <Loader />

    return (
        <Container>
            <Row className="gy-3 mb-3">
                <Col className="text-primary my-5 lien" onClick={() => window.history.back()}>
                    <Chevron left /> Retour
                </Col>
                <div className="text-center">
                    <h1>{getPatientName(patient)}</h1>
                </div>
                <h3 className="text-center">Identité</h3>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Nom</span>
                        <span>{patient?.name?.[0]?.['family']}</span>
                    </div>
                </Col>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Prénom</span>
                        <span>{patient?.name?.[0]?.['given'][0]}</span>
                    </div>
                </Col>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Date de naissance</span>
                        <span>{new Date(Date.parse(patient.birthDate)).toLocaleDateString()}</span>
                    </div>
                </Col>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Sexe</span>
                        <span>{patient?.gender === 'female' ? 'Femme' : 'Homme'}</span>
                    </div>
                </Col>
                <h3 className="text-center">Contact</h3>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Téléphone</span>
                        <span>{patient?.telecom?.find((element: any) => element.system === "phone")?.value}</span>
                    </div>
                </Col>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Email</span>
                        <span>{patient?.telecom?.find((element: any) => element.system === "email")?.value}</span>
                    </div>
                </Col>
                <h2 className="text-center">Consultations</h2>
                <ConsultationsList patientId={patient.id} />
            </Row>
        </Container>
    )
}