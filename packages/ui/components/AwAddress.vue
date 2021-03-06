<template>
    <div class="relative">
        <AwInput v-bind="$attrs" v-model="search" autocomplete="off" />

        <!-- suggestions -->
        <AwDropdown
            class="w-full z-10"
            :show="!!suggestions.length"
            close-on-action
        >
            <AwDropdownButton
                icon="location"
                v-for="place in suggestions"
                :key="place.place_id"
                @click="select(place)"
            >
                <AwIcon name="location" class="flex-shrink-0 mr-1" />
                {{ place.description }}
            </AwDropdownButton>

            <!-- branding -->
            <img
                class="block my-2 mx-auto"
                aria-hidden="true"
                src="https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png"
                alt=""
            />
        </AwDropdown>

        <!-- places service needs a container to init -->
        <div ref="place"></div>
    </div>
</template>

<script>
import gmMixin from '../mixins/google-maps'

export default {
    name: 'AwAddress',

    mixins: [gmMixin],

    props: {
        queryOptions: {
            type: Object,
            default: null
        }
    },

    data() {
        return {
            autocomplete: null,
            placesService: null,
            sessionToken: null,
            suggestions: [],
            placeDescription: '',
            place: null
        }
    },

    computed: {
        search: {
            get() {
                return this.placeDescription
            },

            set(text) {
                this.placeDescription = text

                if (!this.autocomplete) return

                if (!text) {
                    this._resetSearch()
                    return
                }

                this._query(text)
            }
        }
    },

    mounted() {
        this.$nextTick(this.init)
    },

    methods: {
        async init() {
            if (!this.isGmInited()) {
                await this.gmInit()
            }

            this.autocomplete = new window.google.maps.places.AutocompleteService()
            this.placesService = new window.google.maps.places.PlacesService(
                this.$refs.place
            )

            if (this.placeDescription) {
                this._query(this.placeDescription)
            }
        },

        _query(input) {
            if (!this.sessionToken) {
                this.sessionToken = new window.google.maps.places.AutocompleteSessionToken()
            }

            this.autocomplete.getPlacePredictions(
                {
                    ...this.queryOptions,
                    sessionToken: this.sessionToken,
                    input
                },
                this._setSuggestions
            )
        },

        _setSuggestions(data) {
            this.suggestions = data || []
        },

        _resetSearch() {
            this.suggestions = []
            this.sessionToken = null
        },

        _formatAddressResponse(details) {
            if (details && details.address_components) {
                const response = {}

                details.address_components.forEach(({ long_name, types }) => {
                    response[types[0]] = long_name
                })

                response.location = details.geometry.location

                return response
            }

            return null
        },

        select(place) {
            if (!place || !place.place_id) {
                this.place = null
                this.placeDescription = ''
                return
            }

            this.placesService.getDetails(
                {
                    placeId: place.place_id,
                    sessionToken: this.sessionToken
                },
                details => {
                    this.place = details
                    this.placeDescription = details.formatted_address
                    this._resetSearch()
                    this.$emit('input', this._formatAddressResponse(details))
                }
            )
        }
    }
}
</script>
