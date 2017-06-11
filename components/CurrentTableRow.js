Vue.component('current-table-row', {
    props: ['version', 'releaseDate', 'isLTS'],
    template: '#current-table-row-template',

    computed: {
        activeSupportUntil: function() {
            if (this.releaseDate === null) {
                return null;
            }

            return this.isLTS ?
                this.releaseDate.clone().add(2, 'years') :
                this.releaseDate.clone().add(6, 'months');
        },

        securitySupportUntil: function() {
            if (this.releaseDate === null) {
                return null;
            }

            return this.isLTS ?
                this.releaseDate.clone().add(3, 'years') :
                this.releaseDate.clone().add(1, 'year');
        },

        hasActiveSupport: function() {
            if (this.releaseDate === null) {
                return null;
            }

            return this.activeSupportUntil.isAfter();
        },

        hasSecuritySupport: function() {
            if (this.releaseDate === null) {
                return null;
            }

            return this.securitySupportUntil.isAfter();
        },

        isUnreleased: function() {
            return this.releaseDate === null;
        }
    }
});