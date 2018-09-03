import ReduxSweetAlert, { swal, reducer, close } from 'react-redux-sweetalert';

class SweetAlert {

    getComponent() {
        return ReduxSweetAlert;
    };

    getActions() {
        return {swal, close};  
    }

    getReducer() {
        return reducer;
    }

    getOptions() {
        const options = {}
        const success = {
            title: 'Success',
            type: 'success',
            customClass: 'btnSuccess'
          }
          options.success = success
          return options;
    }
}


export default new SweetAlert();