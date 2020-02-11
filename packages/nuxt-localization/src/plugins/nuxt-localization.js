import Vue from 'vue'
import { pathOr, isEmpty, compose, uniq } from 'rambdax'
import CancelToken from 'axios/lib/cancel/CancelToken'
import isCancel from 'axios/lib/cancel/isCancel'
import AwTranslationBlock from '@awes-io/nuxt-localization/src/components/AwTranslationBlock.vue'
import AwTranslationNav from '@awes-io/nuxt-localization/src/components/AwTranslationNav.vue'

AwTranslationBlock.computed._config = function() {
    return { textLimit: parseInt('<%=options.textLimit%>') }
}

AwTranslationNav.computed._config = function() {
    return { route: '<%=options.route%>' }
}

const PAGE_DEFAULT = parseInt('<%=options.pagination.page.default%>')
const LIMIT_DEFAULT = parseInt('<%=options.pagination.limit.default%>')
const LOADING_TIMEOUT = 200 //ms

let loadingTimeout = null

const getData = pathOr(
    JSON.parse('<%=JSON.stringify(options.data.default)%>'),
    '<%=options.data.response%>'
)

const getErrors = pathOr(
    JSON.parse('<%=JSON.stringify(options.errors.default)%>'),
    ['response.data', '<%=options.errors.response%>'].filter(Boolean).join('.')
)

const translationsModule = {
    state: () => ({
        translations: [],
        search: '',
        pagination: {
            page: PAGE_DEFAULT,
            limit: LIMIT_DEFAULT,
            total: 0
        },
        isLoading: false,
        saveRequest: null
    }),

    getters: {
        translations: pathOr({}, 'translations'),

        isEmpty: compose(isEmpty, pathOr({}, 'translations')),

        requestParams: state => {
            const params = {}

            params['<%=options.pagination.page.request%>'] =
                state.pagination.page
            params['<%=options.pagination.limit.request%>'] =
                state.pagination.limit

            if (state.search) {
                params['<%=options.search.request%>'] = state.search
            }

            return params
        },

        pagination: state => ({
            ...state.pagination,
            limits: uniq([state.pagination.limit, 15, 25, 50])
        }),

        paginationLimitDefault: () =>
            parseInt('<%=options.pagination.limit.default%>'),

        isLoading: state => state.isLoading,

        isSaving: state => !!state.saveRequest
    },

    mutations: {
        SET_TRANSLATIONS(state, data) {
            state.translations = data
        },

        UPDATE_TRANSLATION(state, data) {
            const index = state.translations.findIndex(
                ({ id }) => id === data.id
            )

            if (index !== -1) {
                state.translations.splice(index, 1, data)
            }
        },

        SET_PAGINATION_FROM_RESPONSE(state, data) {
            state.pagination = {
                page: pathOr(
                    PAGE_DEFAULT,
                    '<%=options.pagination.page.response%>',
                    data
                ),
                limit: pathOr(
                    LIMIT_DEFAULT,
                    '<%=options.pagination.limit.response%>',
                    data
                ),
                total: pathOr(0, '<%=options.pagination.total.response%>', data)
            }
        },

        SET_PARAMS_FROM_QUERY(state, query) {
            Vue.set(
                state.pagination,
                'page',
                pathOr(PAGE_DEFAULT, 'page', query)
            )
            Vue.set(
                state.pagination,
                'limit',
                pathOr(LIMIT_DEFAULT, 'limit', query)
            )
            state.search = pathOr('', 'search', query)
        },

        TOGGLE_LOADING(state, isLoading = false) {
            state.isLoading = isLoading
            clearTimeout(loadingTimeout)
            loadingTimeout = null
        },

        TOGGLE_SAVING(state, isSaving = false) {
            if (isSaving) {
                state.saveRequest = CancelToken.source()
            } else if (state.saveRequest) {
                state.saveRequest.cancel()
                state.saveRequest = null
            }
        }
    },

    actions: {
        FETCH({ getters, commit }) {
            if (loadingTimeout === null) {
                loadingTimeout = setTimeout(() => {
                    commit('TOGGLE_LOADING', true)
                }, LOADING_TIMEOUT)
            }

            return this.$axios
                .get('<%=options.endpoint%>', {
                    params: getters.requestParams
                })
                .then(({ data }) => {
                    commit('SET_TRANSLATIONS', getData(data))
                    commit('SET_PAGINATION_FROM_RESPONSE', data)

                    return data
                })
                .finally(() => {
                    commit('TOGGLE_LOADING', false)
                })
        },

        ADD({ commit }, data) {
            loadingTimeout = setTimeout(() => {
                commit('TOGGLE_LOADING', true)
            }, LOADING_TIMEOUT)

            return this.$axios
                .post('<%=options.endpoint%>', data)
                .catch(e => {
                    throw getErrors(e)
                })
                .finally(() => {
                    commit('TOGGLE_LOADING', false)
                })
        },

        UPDATE({ state, getters, commit }, data) {
            if (getters.isSaving) {
                commit('TOGGLE_SAVING', false)
            }

            commit('TOGGLE_SAVING', true)

            return this.$axios
                .request({
                    method: 'patch',
                    url: '<%=options.endpoint%>/' + data.id,
                    data,
                    cancelToken: state.saveRequest.token
                })
                .catch(e => {
                    if (!isCancel(e)) {
                        throw getErrors(e)
                    }
                })
                .finally(() => {
                    commit('UPDATE_TRANSLATION', data)
                    commit('TOGGLE_SAVING', false)
                })
        },

        REMOVE({ commit, dispatch }, id) {
            loadingTimeout = setTimeout(() => {
                commit('TOGGLE_LOADING', true)
            }, LOADING_TIMEOUT)

            return this.$axios
                .delete('<%=options.endpoint%>/' + id)
                .catch(e => {
                    commit('TOGGLE_LOADING', false)
                    throw getErrors(e)
                })
                .finally(dispatch('FETCH'))
        }
    },

    namespaced: true
}

export default function({ store }) {
    Vue.component('AwTranslationBlock', AwTranslationBlock)
    Vue.component('AwTranslationNav', AwTranslationNav)

    store.registerModule('awesIoTranslations', translationsModule)
}