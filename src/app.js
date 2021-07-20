import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

export default () => {
    const app = new Vue({
        router,
        vuetify,
        render: (h) => h(App),
    });
    return { app, router };
};
