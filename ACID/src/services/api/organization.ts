import axios from "./axios"

export const getOrganization = (organizationId: string | undefined = "") => {
  return axios.get("/organization/" + organizationId)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}