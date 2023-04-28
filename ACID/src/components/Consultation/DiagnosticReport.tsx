import { useState } from "react"

import { Button, Col, Form, Row } from "react-bootstrap"
import { useParams } from 'react-router-dom'

import { createDiagnosticReport } from "../../services/api/diagnostic-report"
import { formatDiagnosticReport } from "../../services/formatters/diagnostic-report"
import { toastError, toastSuccess } from "../../Util"
import { GLOBALS } from "../../Globals"

type DiagnosticReportProps = {
    consultationDone: boolean
    diagnosticReport: any
    patientId: string
    onClickDeliverDiagnostic: () => void
    onClickEndConsultation: () => void
}

export default ({ diagnosticReport, consultationDone, patientId, onClickDeliverDiagnostic, onClickEndConsultation }: DiagnosticReportProps) => {

    let { id } = useParams()
    const [diagnostic, setDiagnostic] = useState<string>(diagnosticReport?.conclusion)

    const deliverDiagnostic = async () => {
        await createDiagnosticReport(
            formatDiagnosticReport(id ?? "", GLOBALS.PRACTITIONER_ID, patientId, diagnostic)
        )
            .then(() => {
                toastSuccess("Diagnostic rendu")
                onClickDeliverDiagnostic()
            })
            .catch((error) => toastError(error))
    }

    return (<>
        {consultationDone && !diagnosticReport ?
            <div className="text-center">Aucun diagnostic n'a été posé.</div> :
            <>
                <Row className="gy-3 mb-3">
                    <h2 className="text-center">Conclusion</h2>
                    <Form.Control
                        as="textarea"
                        disabled={consultationDone || diagnosticReport}
                        rows={3}
                        onChange={(e) => setDiagnostic(e.target.value)} defaultValue={diagnostic}
                        placeholder="Patient fortement dénutri." />
                </Row>
                <Row className="gy-3 mb-3">
                    <Col xs="12" className="text-center">
                        <Button hidden={consultationDone || diagnosticReport} onClick={() => deliverDiagnostic()}>Rendre la conclusion</Button>
                    </Col>
                    <Col xs="12" className="text-center">
                        <Button variant="success" hidden={consultationDone} onClick={onClickEndConsultation}>Terminer la consultation</Button>
                    </Col>
                </Row>
            </>
        }
    </>)
}