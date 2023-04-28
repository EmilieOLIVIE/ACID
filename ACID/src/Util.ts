import { toast } from 'react-toastify';

/**
 * Set of utility functions
 */
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function getPatientName(patient: any) {
    let fullName = ""
    if(patient.name && patient.name.length > 0) {
        if(patient.name[0].given) fullName = patient.name[0].given
        if(patient.name[0].family) fullName += " " + patient.name[0].family
        return fullName
    }
    else return "Tartempion"
}

export function toastError(message: string | JSX.Element) {
    return toast.error(
        message,
        {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
    )
}

export function toastSuccess(message: string | JSX.Element) {
    return toast.success(
        message,
        {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
    )
}