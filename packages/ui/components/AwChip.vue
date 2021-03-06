<template functional>
    <span
        class="aw-chip"
        v-bind="data.attrs"
        :class="[data.staticClass, data.class]"
        :style="[data.staticStyle, data.style]"
    >
        <!-- On the left side of text -->
        <slot name="left" v-bind="props">
            <!-- decor element -->
            <span
                v-if="props.icon || props.image"
                class="aw-chip__decor"
                :class="{
                    [`border-${props.color}`]: props.color,
                    [`text-${props.color}`]: !props.filled && props.color,
                    'border-text': !props.color && !props.image,
                    'aw-chip__decor_image': props.image,
                    'animation-rotate-slow':
                        $options._config[props.icon] &&
                        $options._config[props.icon].rotate,
                    [`bg-${props.color} `]: props.filled && props.color
                }"
                :style="{
                    backgroundImage: props.image ? `url(${props.image})` : null
                }"
                aria-hidden="true"
            >
                <!-- <span
                    v-if="!props.image"
                    class="aw-chip__decor-circle"
                    :class="{
                        [`bg-${props.color}`]: props.color,
                        'bgcolor-text': !props.icon && !props.color,
                        'animation-pulse': props.loading
                    }"
                >
                    <AwIcon
                        v-if="props.icon"
                        :name="props.icon"
                        class="aw-chip__decor-icon"
                        :class="{
                            'aw-chip__decor-icon_color': props.color,
                        }"
                    />
                </span> -->

                <AwIcon
                    v-if="props.icon"
                    :name="props.icon"
                    class="aw-chip__decor-icon"
                    :class="{
                        'aw-chip__decor-icon_color': props.color
                    }"
                    :style="
                        $options._config[props.icon]
                            ? `transform: scale(${
                                  $options._config[props.icon].scale
                              })`
                            : null
                    "
                />
            </span>
        </slot>

        <!-- text wrap -->
        <slot name="center" v-bind="props">
            <!-- <span class="aw-chip__text">{{ text }}</span> -->
            <span v-if="props.text || slots().default" class="aw-chip__text">
                <!-- text -->
                <slot>
                    <!-- value of text prop -->
                    {{ props.text }}
                </slot>
            </span>
        </slot>

        <!-- On the right side of text -->
        <slot name="right" v-bind="props" />
    </span>
</template>

<script>
export default {
    name: 'AwChip',

    _config: {
        'pie-chart-empty': {
            scale: 0.6
        },
        attention: {
            scale: 0.65
        },
        progress: {
            scale: 0.85,
            rotate: true
        }
    },

    props: {
        /**
         * Icon name to render in decor element
         */
        icon: {
            type: String,
            default: ''
        },

        /**
         * Text label
         */
        text: {
            type: String,
            default: ''
        },

        /**
         * Border, icon and close icon color
         */
        color: {
            type: String,
            default: ''
        },

        /**
         * Decor element background
         */
        image: {
            type: String,
            default: ''
        },

        /**
         * Toggles loading animation
         */
        loading: Boolean,

        /**
         * Indicates if chip has filled background
         */
        filled: Boolean
    }
}
</script>
