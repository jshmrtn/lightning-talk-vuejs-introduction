import playComponent from 'components/play/play';
import template from './app.html';
import './app.scss';

export default {
    name: 'app',
    template: template,
    components: {
        play: playComponent,
    },
    beforeMount () {
        this.$socket.connect();
    },
    beforeDestroy () {
        this.$socket.disconnect();
    },
};
