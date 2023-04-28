import { GLOBALS } from "../../Globals"
import { getRandomInt } from "../../Util"

export const formatMedicationRequest = (
    carePlanId: string | null,
    patientId: string,
    practitionerId: string,
    medicineCode: string,
    medicineLabel: string,
    dosageInstruction: any
): any => {
    let medicationRequest = {
        resourceType: "MedicationRequest",
        identifier: [
            {
                use: "official",
                type: {
                    text: "Medication Request"
                },
                value: "MedicationRequest" + getRandomInt(100000000, 999999999).toString(),
                system: "http://www.alliance4u.io",
                period: GLOBALS.PERIOD_OF_USE,
                assigner: GLOBALS.ORGANIZATION_REFERENCE
            },
        ],
        status: "active",
        intent: "order",
        priority: "routine",
        medicationCodeableConcept: {
            coding: [
                {
                    system: "http://snomed.info/sct",
                    code: medicineCode,
                    display: medicineLabel
                }
            ]
        },
        basedOn: [
            {
                reference: "CarePlan/" + carePlanId,
            }
        ],
        subject: {
            reference: "Patient/" + patientId,
        },
        autoredOn: new Date().toISOString(),
        requester:
        {
            reference: "Practitioner/" + practitionerId,
        },
        dosageInstruction: [
            {
                text: dosageInstruction,
            }
        ],
    }

    return medicationRequest

}