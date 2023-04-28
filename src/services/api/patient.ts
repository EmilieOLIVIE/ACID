import axios from "./axios"

export const getPatient = (patientId: string | undefined = "") => {
  return axios.get("/patient/" + patientId)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}