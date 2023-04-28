import axios from "./axios"

export const getPractitioner = (practitionerId: string | undefined = "") => {
  return axios.get("/practitioner/" + practitionerId)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}