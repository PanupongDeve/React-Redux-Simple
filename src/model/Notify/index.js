import { toast, ToastContainer } from 'react-toastify';

class Notify {
    constructor() {
        this.options = this.defaultOptions();
    }

    defaultOptions() {
        return {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        }
    }

    success(msg) {
        return toast.success(msg, this.options)
    }

    error(msg) {
        return toast.success(msg, this.options)
    }

    info(msg) {
        return toast.info(msg, this.options);
    }

    warning(msg) {
        return toast.warning(msg, this.options);
    }

    original(msg) {
        return toast.original(msg, this.options);
    }

    getCombineNotify() {
        return {
            success: this.success,
            error: this.error,
            info: this.info,
            warning: this.warning,
            original: this.original
       } 
    }

    getComponent() {
        return ToastContainer;
    }
}

export default new Notify();


