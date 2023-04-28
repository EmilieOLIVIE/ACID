import { useEffect, useState } from "react"

import { Col, Container, Row } from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom'

import { getPatient } from "../../services/api/patient"

import { getQuestionnaireResponseOfCarePlan } from "../../services/api/questionnaire-response"
import { getDiagnosticReportOfCarePlan } from "../../services/api/diagnostic-report"
import { getMedicationRequestOfCarePlan } from "../../services/api/medication-request"
import { Chevron } from "../../assets/ChevronIcons"

import QuestionnaireRecap from "./QuestionnaireRecap"
import Loader from "../render_components/Loader"
import Stepper from "../render_components/Stepper"
import DiagnosticReport from "./DiagnosticReport"
import MedicationRequest from "./MedicationRequest"

import { GLOBALS } from "../../Globals"
import { getCarePlan, putCarePlan } from "../../services/api/care-plan"
import { formatCarePlan } from "../../services/formatters/care-plan"
import { getPatientName, toastSuccess } from "../../Util"

const STEPS = ['Questionnaire', 'Diagnostic', 'Ordonnance']
export default () => {

    let { id } = useParams()
    let navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0)
    const [completed, setCompleted] = useState<{
        [k: number]: boolean
    }>([false, false, false])

    const [carePlan, setCarePlan] = useState<any>({})
    const [patient, setPatient] = useState<any>({})
    const [questionnaireResponse, setQuestionnaireResponse] = useState<any>({})
    const [diagnosticReport, setDiagnosticReport] = useState<any>({})
    const [medicationRequest, setMedicationRequest] = useState<any>({})


    useEffect(() => {
        getConsultationInformation()
    }, [id])

    const getConsultationInformation = async () => {
        fetchCarePlan()
        fetchQuestionnaireResponse()
        fetchDiagnosticReport()
        fetchMedicationRequest()
    }

    const fetchCarePlan = async () => {
        let carePlan = await getCarePlan(id ?? "").catch(() => { })
        let targetedPatient = await getPatient(carePlan?.subject?.reference.split("/")[1]).catch(() => { })

        setCarePlan(carePlan)

        setPatient(targetedPatient)
    }

    const fetchQuestionnaireResponse = async () => {
        await getQuestionnaireResponseOfCarePlan(id ?? "")
            .then((questionnaireResponse: any) => {
                setQuestionnaireResponse(questionnaireResponse[0])
                let newCompleted = completed
                newCompleted[0] = questionnaireResponse[0]?.status === GLOBALS.CARE_PLAN_STATUS.COMPLETED
                setCompleted(newCompleted)        
            })
            .catch(() => { })
    }

    const fetchDiagnosticReport = async () => {
        await getDiagnosticReportOfCarePlan(id ?? "")
            .then((diagnosticReport: any) => {
                setDiagnosticReport(diagnosticReport[0])
                let newCompleted = completed
                newCompleted[1] = diagnosticReport[0].status === "final"
                setCompleted(newCompleted)
            })
            .catch(() => { })
    }

    const fetchMedicationRequest = async () => {
        await getMedicationRequestOfCarePlan(id ?? "")
            .then((medicationRequest: any) => {
                setMedicationRequest(medicationRequest[0])
                let newCompleted = completed
                newCompleted[2] = medicationRequest[0].status === "active"
                setCompleted(newCompleted)
            })
            .catch(() => { })
    }

    const endConsultation = () => {
        carePlan.status = GLOBALS.CARE_PLAN_STATUS.COMPLETED
        putCarePlan(carePlan.id, formatCarePlan(carePlan, GLOBALS.PRACTITIONER_ID))
        .then(() => {
            toastSuccess("Consultation terminée")
            navigate("/consultations")
        })
        .catch(() => {})
    }

    const onClickDeliverDiagnostic = () => {
        handleComplete()
        fetchDiagnosticReport()
    }

    const onClickDeliverMedicationRequest = () => {
        handleComplete()
        fetchMedicationRequest()
    }

    const getNextComponent = () => {
        switch (activeStep) {
            case 0:
                return <QuestionnaireRecap
                    consultationDone={carePlan.status === GLOBALS.CARE_PLAN_STATUS.COMPLETED}
                    questionnaireResponse={questionnaireResponse}
                    onClickEndConsultation={endConsultation}
                />
            case 1:
                return <DiagnosticReport
                    consultationDone={carePlan.status === GLOBALS.CARE_PLAN_STATUS.COMPLETED}
                    patientId={patient.id}
                    diagnosticReport={diagnosticReport}
                    onClickDeliverDiagnostic={onClickDeliverDiagnostic}
                    onClickEndConsultation={endConsultation}
                />
            case 2:
                return <MedicationRequest
                    consultationDone={carePlan.status === GLOBALS.CARE_PLAN_STATUS.COMPLETED}
                    medicationRequest={medicationRequest}
                    patientId={patient.id}
                    onClickDeliverMedicationRequest={onClickDeliverMedicationRequest}
                    onClickEndConsultation={endConsultation}
                />
            default:
                return <div>Erreur</div>
        }
    }

    const totalSteps = () => {
        return STEPS.length
    }

    const completedSteps = () => {
        return Object.keys(completed).length
    }

    const isLastStep = () => {
        return activeStep === totalSteps() - 1
    }

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps()
    }

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                STEPS.findIndex((step, i) => !(i in completed))
                : activeStep + 1
        setActiveStep(newActiveStep)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep - 1)
    }

    const handleStep = (step: number) => () => {
        setActiveStep(step)
    }

    const handleComplete = () => {
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
    }

    const handleReset = () => {
        setActiveStep(0)
        setCompleted({})
    }



    if (!carePlan) return <Loader />

    return (
        <Container>
            <Row className="gy-3 mb-3">
                <Col className="my-5">
                    <h1>Consultation de {getPatientName(patient)} du {questionnaireResponse?.item?.find((item: any) => item.linkId === "dateConsultation")?.answer?.[0]?.valueString}</h1>
                </Col>
                <Col className="text-primary text-end my-5 lien" onClick={() => navigate("/patients/" + carePlan?.subject?.reference.split("/")[1])}>
                    Consulter le profil <Chevron right />
                </Col>
            </Row>
            <Stepper activeStep={activeStep} completed={completed} handleStep={handleStep} steps={STEPS} />
            <div className="px-5">
                {getNextComponent()}
            </div>
        </Container>
    )
}