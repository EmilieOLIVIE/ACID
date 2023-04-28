import { useState } from "react"

import Select from "react-select"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"

import { createMedicationRequest } from "../../services/api/medication-request"
import { formatMedicationRequest } from "../../services/formatters/medication-request"
import { toastError, toastSuccess } from "../../Util"
import { GLOBALS } from "../../Globals"

type MedicationRequestProps = {
    consultationDone: boolean
    medicationRequest: any
    patientId: string
    onClickDeliverMedicationRequest: () => void
    onClickEndConsultation: () => void
}

export default ({ consultationDone, medicationRequest, patientId, onClickDeliverMedicationRequest, onClickEndConsultation }: MedicationRequestProps) => {

    let { id } = useParams()
    const [medication, setMedication] = useState<any>(
        medicationRequest ?
            {
                value: medicationRequest?.medicationCodeableConcept?.coding?.[0]?.code,
                label: medicationRequest?.medicationCodeableConcept?.coding?.[0]?.display
            }
            : null
    )
    const [dosage, setDosage] = useState<string>(medicationRequest?.dosageInstruction?.[0]?.text)

    const deliverMedication = async () => {
        await createMedicationRequest(
            formatMedicationRequest(
                id ?? "",
                patientId,
                GLOBALS.PRACTITIONER_ID,
                medication.value,
                medication.label,
                dosage
            )
        )
            .then(() => {
                toastSuccess("Ordonnance rendue")
                onClickDeliverMedicationRequest()
            })
            .catch((error) => toastError(error))
    }

    return (
        <>
            {consultationDone && !medicationRequest ?
                <div className="text-center">Aucune ordonnance n'a été produite.</div> :
                <>
                    <Row className="gy-3 mb-3">
                        <h2 className="text-center">Ordonnance</h2>
                        <h3 className="text-center">Médicament</h3>
                        <Select
                            className="select"
                            defaultValue={medication}
                            isDisabled={consultationDone || medicationRequest}
                            onChange={(option) => setMedication(option)}
                            options={GLOBALS.MEDICATIONS}
                            placeholder="Sélectionnez un médicament"
                        />
                        <h3 className="text-center">Posologie</h3>
                        <Form.Control as="textarea"
                            placeholder="3 comprimés par jour. Renouvelable 2 fois."
                            defaultValue={dosage}
                            disabled={consultationDone || medicationRequest}
                            rows={3}
                            onChange={(e) => setDosage(e.target.value)}
                        />
                    </Row>
                    <Row className="gy-3 mb-3">
                        <Col xs="12" className="text-center">
                            <Button
                                hidden={consultationDone || medicationRequest}
                                onClick={() => deliverMedication()}
                            >
                                Délivrer l'ordonnance
                            </Button>
                        </Col>
                        <Col xs="12" className="text-center">
                            <Button variant="success" hidden={consultationDone} onClick={onClickEndConsultation}>Terminer la consultation</Button>
                        </Col>
                    </Row>
                </>
            }
        </>
    )
}