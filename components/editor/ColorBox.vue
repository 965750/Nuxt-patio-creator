<template>
    <div
        class="colorBox"
        :style="{ background: color }"
        :class="{'colorBox--active': isActive}"
        @click="setColor"
    >
    </div>
</template>

<script>
export default {
    props: {
        color: {
            required: false,
            type: String,
            default: '#000'
        },
        isActive: {
            required: true,
            default: false,
            type: Boolean
        }
    },
    setup(props, {
        emit
    }) {
        const setColor = () => {
            emit("changeColor", props.color)
        }

        return {
            setColor
        }
    }
}
</script>

<style lang="scss" scoped>
.colorBox {
    border: 3px solid $darkest;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;

    &--active {
        border: 3px solid $secondary;
    }
}
</style>
