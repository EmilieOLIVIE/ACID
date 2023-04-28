/**
 * Format diagnostic report data
 * to match FHIR DiagnosticReport resource
 * @param carePlan
 * @param performerId
 * @returns 
 */
export const formatCarePlan = (carePlan: any, performerId: string): any => {
    let observation = {
        ...carePlan,
        author: {
            reference: "Practitioner/" + performerId,
        }
    }

    return observation
}

