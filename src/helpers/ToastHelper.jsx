import { ToastContainer, toast } from "react-toastify";


export const ToastComp = () => {
    return (
        <ToastContainer
            hideProgressBar={true}
            autoClose={800}
            draggable={false}
            theme="dark"
        />
    )
}

export const toastSuccess = (message) => {
    toast.success(message);
}

export const toastSuccessWithRedirect = (message, redirect) => {
    toast.success(message, {
        onClose: () => {
            redirect();
        }
    });
}

export const toastError = (message) => {
    toast.error(message);
}

export const toastWarning = (message) => {
    toast.warning(message);
}

export const toastInfo = (message) => {
    toast.info(message);
}