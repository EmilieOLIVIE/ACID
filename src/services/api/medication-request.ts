import axios from "./axios"

export const getMedicationRequest = (medicationrequestId: string) => {
  return axios.get("/medication-request/" + medicationrequestId)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}

export const getMedicationRequestOfCarePlan = (questionnaireId: string) => {
  return axios.get("/medication-request?basedOn.reference=CarePlan/" + questionnaireId)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}

export const putMedicationRequest = (medicationrequestId: string, medicationrequest: any) => {
  return axios.put("/medication-request/" + medicationrequestId, medicationrequest)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}

export const createMedicationRequest = (medicationrequest: any) => {
  return axios.post("/medication-request", medicationrequest)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}