import App from '../pages/App/App';
import SimpleTable from '../pages/SimpleTable';
import CloundFireStoreTest from '../pages/CloundFireStoreTest';

const routes = [
    { path: '/', name: 'CloundFireStoreTest', component: CloundFireStoreTest },
    { path: '/table', name: 'SimpleTable' , component: SimpleTable }
];

export default routes;