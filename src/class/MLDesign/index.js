import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class MLDesign {

    getComponent() {
        const component = {
            Paper,
            Grid
        }

        return component;
    }

    getWithStyles() {
        return withStyles
    }

}

export default new MLDesign();






