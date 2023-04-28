import axios from "./axios"

export const getQuestionnaire = (questionnaireId: string | undefined = "") => {
  return axios.get("/questionnaire/" + questionnaireId)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}