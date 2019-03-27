Vue.component('field-fieldtype', {

    mixins: [Fieldtype],

    template: `
        <div class="template-fieldtype-wrapper">
            <div v-if="loading" class="loading loading-basic">
                <span class="icon icon-circular-graph animation-spin"></span> {{ translate('cp.loading') }}
            </div>
            <div v-if="!loading">
                <input type="hidden" :name="name" v-model="data">
                <div class="flex flex-wrap">
                    <div class="w-1/2 xl:w-1/3">
                        <div class="mr-1">
                            <div class="select select-full" :class="{ 'select--active': fieldsetActive }" :data-content="fieldsetLabel">
                                <select v-model="fieldset" tabindex="0" @focus="fieldsetActive = true" @blur="fieldsetActive = false" @change="changeFields">
                                    <option v-for="(key, value) in fieldsets" :value="key">{{ value }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2 xl:w-1/3">
                        <div class="ml-1">
                            <div class="select select-full" :class="{ 'select--active': fieldActive }" :data-content="fieldLabel">
                                <select v-model="field" tabindex="0" @focus="fieldActive = true" @blur="fieldActive = false" @change="updateData">
                                    <option v-for="(key, value) in fields" :value="key">{{ value }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,

    data () {
        return {
            field: null,
            fields: {},
            fieldActive: false,
            fieldset: null,
            fieldsets: {},
            fieldsetActive: false,
            loading: true
        }
    },

    computed: {
        savedFieldset () {
            if (this.data) {
                return this.data.split('|')[0]
            }
        },
        savedField () {
            if (this.data) {
                return this.data.split('|')[1]
            }
        },
        fieldsetLabel () {
            return this.fieldset ? this.fieldsets[this.fieldset] : 'Choose a Fieldset'
        },
        fieldLabel () {
            return this.field ? this.fields[this.field] : 'Choose a Field'
        },
        fieldsetField () {
            if (this.fieldset && this.field) {
                return this.fieldset + '|' + this.field
            } else {
                return ''
            }
        }
    },

    methods: {
        info () {
            console.log(this.data)
        },

        getFieldsets () {
            var url = cp_url('fieldsets-json')

            this.$http.get(url, function(data) {
                var fieldsets = {}

                _.each(data.items, function(fieldset) {
                    fieldsets[fieldset.uuid] = fieldset.title
                })

                this.fieldsets = fieldsets
                this.loading = false
            })
        },

        changeFields() {
            if (this.fieldset) {
                this.field = null
                this.getFields()
            }
        },

        getFields () {
            if (this.fieldset) {
                var url = cp_url('fieldsets-json/' + this.fieldset)

                this.$http.get(url, function(data) {
                    var fields = {}

                    _.forEach(data.sections, function (section) {
                        _.forEach(section.fields, function (field, key) {
                            fields[key] = field.display
                        })
                    })

                    this.fields = fields
                })

                this.updateData()
            }
        },

        updateData () {
            this.data = this.fieldsetField
        }
    },

    ready () {
        if (this.savedFieldset && this.savedField) {
            this.fieldset = this.savedFieldset
            this.field = this.savedField
        }
        this.getFieldsets()
        this.getFields()
    }

});
