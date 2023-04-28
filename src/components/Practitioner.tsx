import { useEffect, useState } from "react"

import { Button, Col, Container, Row } from "react-bootstrap"
import { useParams } from 'react-router-dom'

import { getPractitioner } from "../services/api/practitioner"
import { Chevron } from "../assets/ChevronIcons"

import ConsultationsList from "./Lists/ConsultationsList"
import Loader from "./render_components/Loader"
import { GLOBALS } from "../Globals"
import { getOrganization } from "../services/api/organization"

export default () => {

    const [practitioner, setPractitioner] = useState<any>({})
    const [organization, setOrganization] = useState<any>({})

    useEffect(() => {
        getPractitionerInfo()
    }, [])

    /**
     * Fetches the practitioner's info from the API
     */
    const getPractitionerInfo = async () => {
        let practitionerInfo = await getPractitioner(GLOBALS.PRACTITIONER_ID).catch(() => { })
        setPractitioner(practitionerInfo)

        let organization = await getOrganization(practitionerInfo.qualification[0].issuer.reference.split('/')[1]).catch(() => { })
        setOrganization(organization)
    }

    if (!practitioner.id) return <Loader />

    return (
        <Container>
            <Row className="gy-3 mb-3">
                <div className="text-center">
                    <h1>{practitioner?.name?.[0]?.['prefix']?.[0] + " " + practitioner?.name?.[0]?.['given'][0] + " " + practitioner?.name?.[0]?.['family']}</h1>
                </div>
                <h3 className="text-center">Identité</h3>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Nom</span>
                        <span>{practitioner?.name?.[0]?.['family']}</span>
                    </div>
                </Col>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Prénom</span>
                        <span>{practitioner?.name?.[0]?.['given'][0]}</span>
                    </div>
                </Col>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Date de naissance</span>
                        <span>{new Date(Date.parse(practitioner.birthDate)).toLocaleDateString()}</span>
                    </div>
                </Col>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Sexe</span>
                        <span>{practitioner?.gender === 'female' ? 'Femme' : 'Homme'}</span>
                    </div>
                </Col>
                <h3 className="text-center">Contact</h3>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Téléphone</span>
                        <span>{practitioner?.telecom?.find((element: any) => element.system === "phone")?.value}</span>
                    </div>
                </Col>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Email</span>
                        <span>{practitioner?.telecom?.find((element: any) => element.system === "email")?.value}</span>
                    </div>
                </Col>
                <h3 className="text-center">Adresse</h3>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Rue</span>
                        <span>{practitioner?.address?.find((element: any) => element.use === "work")?.line}</span>
                    </div>
                </Col>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Ville</span>
                        <span>{practitioner?.address?.find((element: any) => element.use === "work")?.city}</span>
                    </div>
                </Col>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Code postal</span>
                        <span>{practitioner?.address?.find((element: any) => element.use === "work")?.postalCode}</span>
                    </div>
                </Col>
                <h3 className="text-center">Autres</h3>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Langues parlées</span>
                        <span>{practitioner?.communication?.map((element: any) => element?.text).join(", ")}</span>
                    </div>
                </Col>
            </Row>
            <Row className="gy-3 mb-3">
                <h2 className="text-center">Organisation</h2>
                <Col xs="12">
                    <div className="border rounded d-flex justify-content-between py-2 px-3">
                        <span>Name</span>
                        <span>{organization?.name}</span>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}