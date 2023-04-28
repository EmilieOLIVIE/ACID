/**
 * Set of global variables
 */
export const GLOBALS = {
    // The API URL is the URL of the API server.
    URL: "https://fhir.alliance4u.io/api/",

    //Ids of unchanging resources
    PATIENT_ID: "007", //Patient ID of twin group
    PRACTITIONER_ID: "6321f0ead83022001917f14e", //Practitioner ID of our own group
    QUESTIONNAIRE_ID: "6322c934256fb300187f6e7c", //Questionnaire ID of our own group
    MEDICATION_ID: "6322d9e776c6f7001a59728c", //Medication ID of our own group
   
    QUESTIONNAIRE_VALUES: {
        VALUE_CODING: "valueCoding",
        VALUE_DATE: "valueDate",
        VALUE_INTEGER: "valueInteger",
        VALUE_STRING: "valueString",
        VALUE_BOOLEAN: "valueBoolean",
        VALUE_DECIMAL: "valueDecimal",
    },

    //Reference of the organization of our own group
    ORGANIZATION_REFERENCE: {
        reference: "Organization/6322d84f76c6f7001a59728a",
        type: "Organization",
        text: "ACID"
    },
    //Period of use of the resources
    PERIOD_OF_USE: {
        start: "2022-09-14",
        end: "2022-10-14"
    },

    CARE_PLAN_STATUS: {
        ACTIVE: "active",
        COMPLETED: "completed"
    },

    //Medications based on SNOMED registry
    MEDICATIONS : [
        {
            value: "90332006",
            label: "Paracétamol"
        },
        {
            value: "763158003",
            label: "Produit thérapeutique"
        },
        {
            value: "10632007",
            label: "Multivitamines"
        },
        {
            value: "74226000",
            label: "Vitamine K"
        },
        {
            value: "63822004",
            label: "Vitamine E"
        },
        {
            value: "11563006",
            label: "Vitamine D"
        }
    ]
}