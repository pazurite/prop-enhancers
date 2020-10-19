import Vue from 'vue';
import App from './App';

import propEnhancers from '../src'

Vue.use(propEnhancers)


new Vue({
    render: (h) => h(App),
}).$mount('#app');
