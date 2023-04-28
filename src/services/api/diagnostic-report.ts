import axios from "./axios"

export const getDiagnosticReport = (diagnosticReportId: string) => {
  return axios.get("/diagnostic-report/" + diagnosticReportId)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}

export const getDiagnosticReportOfCarePlan = (carePlanId: string) => {
  return axios.get("/diagnostic-report?basedOn.reference=CarePlan/" + carePlanId)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}

export const putDiagnosticReport = (diagnosticReportId: string, diagnosticReport: any) => {
  return axios.put("/diagnostic-report/" + diagnosticReportId, diagnosticReport)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}

export const createDiagnosticReport = (diagnosticReport: any) => {
  return axios.post("/diagnostic-report", diagnosticReport)
    .then(function (response) {
      return response.data
    }).catch(function (error) {
      if (error.response) {
        throw error.response
      }
      throw error
    })
}