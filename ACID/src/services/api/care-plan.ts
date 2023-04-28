import axios from "./axios"

export const getCarePlan = (carePlanId: string = "") => {
  return axios.get("/care-plan/" + carePlanId)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}

export const getCarePlanOfPatient = (patientId: string) => {
  return axios.get("/care-plan?subject.reference=Patient/" + patientId)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}

export const putCarePlan = (carePlanId: string, carePlan: any) => {
  return axios.put("/care-plan/" + carePlanId, carePlan)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}