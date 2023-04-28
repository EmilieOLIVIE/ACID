import axios from "./axios"

export const getQuestionnaireResponse = (questionnaireResponseId: string | undefined = "") => {
  return axios.get("/questionnaire-response/" + questionnaireResponseId)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}

export const getQuestionnaireResponseOfPatient = (sourceId: string | null = "") => {
  return axios.get("/questionnaire-response?source.reference=Patient/" + sourceId)
  .then(function (response) {
    return response.data
  }).catch(function (error) {
    if (error.response) {
      throw error.response
    }
    throw error
  })
}

export const getQuestionnaireResponseOfCarePlan = (sourceId: string | null = "") => {
  return axios.get("/questionnaire-response?basedOn.reference=CarePlan/" + sourceId)
  .then(function (response) {
    return response.data
  }).catch(function (error) {
    if (error.response) {
      throw error.response
    }
    throw error
  })
}

export const putQuestionnaireResponse = (questionnaireResponseId: string, questionnaireResponse: any) => {
  return axios.put("/questionnaire-response/" + questionnaireResponseId, questionnaireResponse)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}