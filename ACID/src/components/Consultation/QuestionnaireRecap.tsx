import { useEffect, useState } from "react"

import { Button, Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"

import { getQuestionnaireResponseOfCarePlan } from "../../services/api/questionnaire-response"

import { GLOBALS } from "../../Globals"
import Loader from "../render_components/Loader"

type QuestionnaireRecapProps = {
    consultationDone: boolean
    questionnaireResponse: any
    onClickEndConsultation: () => void
}

export default ({ consultationDone, questionnaireResponse, onClickEndConsultation }: QuestionnaireRecapProps) => {

    const getRelevantInfo = (infoName: string, valueType: string) => {
        return questionnaireResponse?.item?.find((item: any) => item.linkId === infoName)?.answer?.[0][valueType]
    }

    if (!questionnaireResponse) return <Loader />

    return (<>
        <Row className="gy-3 mb-3">
            <h2 className="text-center mt-5">Motif de la consultation</h2>
            <Col xs="12">
                <div className="border rounded d-flex justify-content-between py-2 px-3">
                    <span>Type de consultation</span>
                    <span>{getRelevantInfo("motifConsultation", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_CODING)?.display}</span>
                </div>
            </Col>
            <Col xs="12">
                <div className="border rounded d-flex justify-content-between py-2 px-3">
                    <span>Date de la consultation</span>
                    <span>{getRelevantInfo("dateConsultation", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_STRING)}</span>
                </div>
            </Col>
            <h2 className="text-center mt-5">Données cliniques</h2>
            <Col xs="12">
                <div className="border rounded d-flex justify-content-between py-2 px-3">
                    <span>Poids actuel</span>
                    <span>{getRelevantInfo("poidsActuel", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_DECIMAL)}kg</span>
                </div>
            </Col>
            <Col xs="12">
                <div className="border rounded d-flex justify-content-between py-2 px-3">
                    <span>Poids cible</span>
                    <span>{getRelevantInfo("poidsCible", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_DECIMAL)}kg</span>
                </div>
            </Col>
            <Col xs="12">
                <div className="border rounded d-flex justify-content-between py-2 px-3">
                    <span>Tension artérielle</span>
                    <span>{getRelevantInfo("tensionArterielleDiastolique", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_DECIMAL)}
                        /{getRelevantInfo("tensionArterielleSystolique", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_DECIMAL)}
                    </span>
                </div>
            </Col>
            <Col xs="12">
                <div className="border rounded d-flex justify-content-between py-2 px-3">
                    <span>Température corporelle</span>
                    <span>{getRelevantInfo("temperatureCorporelle", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_DECIMAL)}°C</span>
                </div>
            </Col>
            <Col xs="12">
                <div className="border rounded d-flex justify-content-between py-2 px-3">
                    <span>Fréquence cardiaque</span>
                    <span>{getRelevantInfo("frequenceCardiaque", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_INTEGER)} BPM</span>
                </div>
            </Col>
            <Col xs="12">
                <div className="border rounded d-flex justify-content-between py-2 px-3">
                    <span>Fréquence respiratoire</span>
                    <span>{getRelevantInfo("frequenceRespiratoire", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_INTEGER)} CPM</span>
                </div>
            </Col>
            <h2 className="text-center mt-5">Questions comportementales</h2>
            <Col xs="12">
                <div className="border rounded py-2 px-3 d-flex justify-content-between">
                    <span>Changement de régime depuis la dernière consultation</span>
                    <span>{getRelevantInfo("changementRegime", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_BOOLEAN) ? "Oui" : "Non"}</span>
                </div>
            </Col>
            <Col xs="12">
                <div className="border rounded d-flex justify-content-between py-2 px-3">
                    <span>Ménopause</span>
                    <span>{getRelevantInfo("menopause", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_BOOLEAN) ? "Oui" : "Non"}</span>
                </div>
            </Col>
            <Col xs="12">
                <div className="border rounded d-flex justify-content-between py-2 px-3">
                    <span>Fumeur</span>
                    <span>{getRelevantInfo("fumeur", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_BOOLEAN) ? "Oui" : "Non"}</span>
                </div>
            </Col>
            <Col xs="12">
                <div className="border rounded d-flex justify-content-between py-2 px-3">
                    <span>Activité physique depuis la dernière consultation</span>
                    <span>{getRelevantInfo("activitePhysique", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_BOOLEAN) ? "Oui" : "Non"}</span>
                </div>
            </Col>
            <Col xs="12">
                <div className="border rounded py-2 px-3">
                    <div className="d-flex justify-content-between">
                        <span>Autres remarques</span>
                        <span>{getRelevantInfo("autresRemarques", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_STRING) ? "Oui" : "Non"}</span>
                    </div>
                    {getRelevantInfo("autresRemarques", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_STRING) ?
                        <div className="border rounded p-2 mt-2">
                            <span>{getRelevantInfo("autresRemarques", GLOBALS.QUESTIONNAIRE_VALUES.VALUE_STRING)}</span>
                        </div>
                        : null
                    }
                </div>
            </Col>
        </Row>
        <Row className="gy-3 mb-3">
            <Col xs="12" >
                <div className="d-flex justify-content-center">
                    <Button variant="success" hidden={consultationDone} onClick={onClickEndConsultation}>Terminer la consultation</Button>
                </div>
            </Col>
        </Row>
    </>
    )
}