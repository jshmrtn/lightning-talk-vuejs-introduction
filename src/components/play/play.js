import template from './play.html';
import './play.scss';

export default {
    name: 'play',
    template: template,
    props: {
        channelName: {
            type: String,
            required: true,
        },
    },
    data: function () {
        return {
            playChannel: this.$socket.channel(this.channelName),
            playState: 'idle',
            givenAnswer: null,
            answerIsCorrect: null,
            question: {
                question: null,
                answers: [],
            },
        };
    },
    mounted () {
        this._joinPlayChannel();
    },
    beforeDestroy () {
        this._leavePlayChannel();
    },
    methods: {

        answerQuestion(answer) {
            if (this.givenAnswer) {
                return;
            }
            this.givenAnswer = answer;
            this.playChannel
                .push('answer', answer)
                .receive('ok', ({ correct }) => {
                    this.answerIsCorrect = correct;
                    this.playState = 'idle';
                });
        },

        getQuestion() {
            this.givenAnswer = null;
            this.answerIsCorrect = null;
            this.playChannel
                .push('ask')
                .receive('ok', (question) => {
                    this._startQuestion(question);
                });
        },

        _startQuestion (question) {
            this.playState = 'question';
            this.question = question;
        },

        _joinPlayChannel () {

            this.playChannel
                .join();

            this.playChannel.on('timeout', () => {
                this.playState = 'over';
            });

        },

        _leavePlayChannel () {

            this.playChannel
                .leave();

        },
    },
};
