import { GLOBALS } from "../../Globals"
import { getRandomInt } from "../../Util"

/**
 * Format diagnostic report data
 * to match FHIR DiagnosticReport resource
 * @param performerId 
 * @param patientId 
 * @param conclusion 
 * @returns 
 */
export const formatDiagnosticReport = (serviceRequestId: string, performerId: string, patientId: string, conclusion: string): any => {
    let observation = {
        resourceType: "DiagnosticReport",
        identifier: [
            {
                use: "official",
                type: {
                    text: "DiagnosticReport"
                },
                value: "DiagnosticReport" + getRandomInt(100000000, 999999999).toString(),
                system: "http://www.alliance4u.io",
                period: GLOBALS.PERIOD_OF_USE,
                assigner: GLOBALS.ORGANIZATION_REFERENCE
            },
        ],
        basedOn: [
            {
                reference: "CarePlan/" + serviceRequestId,
            }
        ],
        //Random
        code: {
            coding: [
                {
                  "system": "http://www.alliance4u.io",
                  "code": "123456789",
                  "display": "DiagnosticReport"
                }
              ]
        },
        status: "final",
        subject: {
            reference: "Patient/" + patientId,
        },
        effectiveDateTime: new Date().toISOString(),
        issued: new Date().toISOString(),
        performer: [
            {
                reference: "Practitioner/" + performerId,
            }
        ],
        resultsInterpreter: [
            {
                reference: "Practitioner/" + performerId,
            }
        ],
        conclusion: conclusion,
    }

    return observation
}

