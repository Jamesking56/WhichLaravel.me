require('./versions');
import Vue from 'vue';
require('./components/CurrentTableRow');
require('./calendar');

new Vue({
    el: '.container',
    data: function() {
        return {
            versions: window.versions
        };
    },
});
