<template functional>
    <span
        :style="[data.staticStyle, data.style]"
        :class="[data.staticClass, data.class]"
        class="flex items-center"
    >
        <AwAvatar
            :size="props.hideName ? 36 : 22"
            :src="props.src"
            :name="props.name"
            :is-colored="$options.isColor(props.src, props.name)"
            :type="$options.getType(props.src, props.hideName)"
        />
        <span v-if="!props.hideName" class="ml-2">
            <span>{{ props.name }}</span>
        </span>
    </span>
</template>

<script>
import AwAvatar from './AwAvatar.vue'

export default {
    name: 'AwAvatar',

    components: {
        AwAvatar
    },

    props: {
        // Full URL to the picture
        src: {
            type: String,
            default: ''
        },
        // User name
        name: {
            type: String,
            default: ''
        },
        // It's hide the user name. The size of the image will be bigger.
        hideName: {
            type: Boolean,
            default: false
        }
    },

    isColor(src, name) {
        return !(src === '' && (name === '' || name.replace(/ /g, '') === ''))
    },

    getType(src, hideName) {
        return (src === '' || !src) && !hideName ? 'no-img' : 'initials'
    }
}
</script>
