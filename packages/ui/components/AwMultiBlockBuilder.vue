<template>
    <div @keydown.enter="_onEnterKeydown">
        <div
            v-for="(model, index) in models"
            :key="model.id || `new-block-${index}`"
            :class="{ 'mt-4': index > 0 }"
        >
            <!-- block title -->
            <slot
                name="title"
                v-bind="{
                    title,
                    iteration: index + 1,
                    collection,
                    model,
                    collectionCount,
                    remove
                }"
            >
                <!-- `<h5>{title} #{iteration} <button>Remove {title}</button></h5>` -->
                <h5 class="flex items-center draggable">
                    <span>
                        {{
                            $t('AwMultiBlockBuilder.title', {
                                title,
                                iteration: index + 1
                            })
                        }}
                    </span>
                    <AwButton
                        icon="close"
                        theme="icon"
                        :text="$t('AwMultiBlockBuilder.remove')"
                        @click="remove(model)"
                    />
                </h5>
            </slot>

            <!-- block content -->
            <slot
                v-bind="{
                    model,
                    remove
                }"
            />
        </div>

        <!-- add button -->
        <div class="mt-4" v-if="collectionCount < max">
            <slot name="add" v-bind="{ collection, title, add }">
                <!-- `<button>+ Add {title}</button>` -->
                <AwLink class="text-sm font-bold uppercase" @click="add">
                    {{ $t('AwMultiBlockBuilder.add', { title }) }}
                </AwLink>
            </slot>
        </div>

        <!-- save button -->
        <slot name="save" v-bind="{ collectionChanged, collection }">
            <!-- `<button>Save</button>` -->
            <div class="mt-8">
                <AwButton :disabled="buttonDisabled" @click="collection.save()">
                    {{ $t('AwMultiBlockBuilder.save') }}
                </AwButton>
            </div>
        </slot>
    </div>
</template>

<script>
import { equals, prop, isNil, clone } from 'rambdax'
import { validateBySchema } from '../assets/js/component'
import exterNextFieldMixin from '../mixins/enter-next-field'

/**
 * Serves for VueMC collection visualization. Pass the collection to `collection` prop, and form fields that you need to default slot.
 *
 * ```vue
 * <AwMultiBlockBuilder title="Manager" :collection="managers">
 *    <template #default="{ model }">
 *      <AwInput
 *         v-model="model.first_name"
 *         :error="model.errors.first_name"
 *         label="First name"
 *       />
 *    </template>
 *  </AwMultiBlockBuilder>
 *  ```
 */
export default {
    name: 'AwMultiBlockBuilder',

    mixins: [exterNextFieldMixin],

    props: {
        /**
         * VueMC collection object
         */
        collection: {
            type: Object,
            required: true,
            validator: validateBySchema({
                fetch: 'function',
                save: 'function',
                add: 'function',
                remove: 'function',
                models: 'array'
            })
        },

        /**
         * Title, added to block heading and buttons
         */
        title: {
            type: String,
            default: ''
        },

        /**
         * Max number of items, the add button hides if value is reached
         */
        max: {
            type: Number,
            default: Infinity
        },

        /**
         * Fetch collection immediately when component mounted
         */
        fetch: Boolean
    },

    data() {
        return {
            modelsSnapshot: []
        }
    },

    computed: {
        models() {
            return this.collection.models
        },

        currentModels() {
            return this.models.map(prop('_attributes'))
        },

        collectionCount() {
            return this.models.length
        },

        collectionChanged() {
            return !equals(this.modelsSnapshot, this.currentModels)
        },

        collectionRequest() {
            return this.collection.saving || this.collection.loading
        },

        buttonDisabled() {
            return !this.collectionChanged || this.collectionRequest
        }
    },

    watch: {
        collection: {
            handler(newCollection, oldCollection) {
                if (oldCollection) {
                    this._removeCollectionListener(
                        'fetch',
                        this.fetchListener,
                        oldCollection
                    )
                    this._removeCollectionListener(
                        'save',
                        this.saveListener,
                        oldCollection
                    )
                }

                newCollection.on('fetch', this.fetchListener)
                newCollection.on('save', this.saveListener)
                this._updateSnapshot()
            },
            immediate: true
        }
    },

    mounted() {
        // initial fetch
        if (this.fetch) {
            this.collection.fetch()
        }
    },

    beforeDestroy() {
        this._removeCollectionListener('fetch', this.fetchListener)
        this._removeCollectionListener('save', this.saveListener)
    },

    methods: {
        /**
         * @vuese
         * Add new model and emit `add:model` event
         */
        add() {
            this.collection.add()
            /**
             * Fire when model is added
             * @arg `collection`, passed to props
             */
            this.$emit('add:model', this.collection)
        },

        /**
         * @vuese
         * Remove model and emit `remove:model` event
         * @arg The model object, required
         */
        remove(model) {
            if (!model) return
            this.collection.remove(model)
            /**
             * Fire when model is removed
             * @arg `collection`, passed to props
             */
            this.$emit('remove:model', this.collection)
        },

        fetchListener($event) {
            this._updateSnapshot($event)
            /**
             * Fire on collection fetch
             * @arg 1.`collection`, passed to props
             * @arg 2. VueMC event object
             */
            this.$emit('fetch:collection', this.collection, $event)
        },

        saveListener($event) {
            this._updateSnapshot($event)
            /**
             * Fire on collection save
             * @arg 1.`collection`, passed to props
             * @arg 2. VueMC event object
             */
            this.$emit('save:collection', this.collection, $event)
        },

        _updateSnapshot($event = {}) {
            if (isNil($event.error)) {
                this.modelsSnapshot = clone(this.currentModels)
            }
        },

        _removeCollectionListener(
            event,
            listener,
            collection = this.collection
        ) {
            const listeners = collection._listeners[event] || []
            const index = listeners.indexOf(listener)
            if (index > -1) {
                listeners.splice(index, 1)
            }
        },

        // called from exterNextFieldMixin
        _onEnterKeydownAction() {
            if (this.buttonDisabled) return
            this.collection.save()
        }
    }
}
</script>
