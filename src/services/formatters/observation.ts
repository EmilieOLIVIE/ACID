import { GLOBALS } from "../../Globals"
import { getRandomInt } from "../../Util"

/**
 * Format observation data
 * to match FHIR Observation resource
 * @param performerId 
 * @param patientId 
 * @param conclusion 
 * @returns 
 */
export const formatObservation = (questionnaireResponseId: string, performerId: string, patientId: string, conclusion: string): any => {
    let observation = {
        resourceType: "Observation",
        identifier: [
            {
                use: "official",
                type: {
                    text: "Observation"
                },
                value: "Observation" + getRandomInt(100000000, 999999999).toString(),
                system: "http://www.alliance4u.io",
                period: GLOBALS.PERIOD_OF_USE,
                assigner: GLOBALS.ORGANIZATION_REFERENCE
            },
        ],
        derivedFrom: [
            {
                reference: "QuestionnaireResponse/" + questionnaireResponseId,
            }
        ],
        //Random
        code: {
            coding: [
                {
                  "system": "http://www.alliance4u.io",
                  "code": "123456789",
                  "display": "Observation"
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
        valueString: conclusion,
    }

    return observation
}

