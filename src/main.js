// Import Dependencies
import Vue from 'vue';

// Import Socket Plugin
import socketPlugin from 'src/plugins/socket/socket.plugin';

// Import Root Component
import appComponent from 'components/app/app';

// Vue Dependency Injection
Vue.use(socketPlugin);

// Initialize Vue Application
new Vue({
    el: 'app',
    components: {
        'app': appComponent,
    },
});
