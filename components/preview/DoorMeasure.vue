<template>
    <div
        v-if="measureType === 'width'"
        class="widthMeasure absolute"
        :style="{'width': currentDoor.width + 'px'}"
    >
        <div class="widthMeasure__line w-full absolute" />
        <div class="widthMeasure__number text-center absolute w-full">
            {{ currentDoor.width }} cm
        </div>
    </div>
    <div
        v-if="measureType === 'height'"
        class="heightMeasure absolute"
        :style="{'height': currentDoor.height + 'px'}"
    >
        <div class="heightMeasure__line h-full absolute" />
        <div class="heightMeasure__number absolute">
            {{ currentDoor.height }} cm
        </div>
    </div>
</template>

<script setup>
import { storeFav } from '@/composables/storeFav'

const { currentDoor } = storeFav()

const props = defineProps({
    measureType: {
        required: false,
        default: 'width',
        type: String,
    }
})
</script>

<style lang="scss" scoped>
.widthMeasure {
    height: 10px;
    border-right: 1px solid #000;
    border-left: 1px solid #000;
    top: -15px;

    &__line {
        height: 1px;
        background: #000;
        top: 5px;
    }

    &__number {
        top: -8px;
        line-height: 10px;
    }
}

.heightMeasure {
    width: 10px;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    left: -15px;

    &__line {
        width: 1px;
        background: #000;
        left: 5px;
    }

    &__number {
        left: -55px;
        top: 50%;
        transform: translateY(-50%);
    }
}

@media screen and (max-width: 460px) {
    .heightMeasure {
        display: none;
    }
}
</style>
