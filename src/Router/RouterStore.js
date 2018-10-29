import App from '../pages/App/App';
import SimpleTable from '../pages/SimpleTable';
import CloundFireStoreTest from '../pages/CloundFireStoreTest';
import TwiloChatClient from '../pages/TwiloChatClient';

const routes = [
    { path: '/', name: 'CloundFireStoreTest', component: CloundFireStoreTest },
    { path: '/table', name: 'SimpleTable' , component: SimpleTable },
    { path: '/Chat', name: 'TwiloChatClient' , component: TwiloChatClient }
];

export default routes;