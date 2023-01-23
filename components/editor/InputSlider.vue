<template>
    <div class="inputContainer">
        <div class="inputTop pl-3">
            <label v-if="label" class="inputTop__label font-bold">
                {{ label }}
            </label>
            <div class="valueContainer">
                <p class="valueContainer__value font-bold">
                    {{ currentDoor[name] }}
                </p>
                <p
                    class="valueContainer__metric"
                    v-if="metric"
                >
                    {{ metric }}
                </p>
            </div>
        </div>
        <input @input="updateMeasurements" type="range" :min="range.min" :max="range.max" step="5" :value="currentDoor[name]">
    </div>
</template>

<script setup>
import { storeFav } from '@/composables/storeFav'

const { projectStore, currentDoor } = storeFav()

const props = defineProps ({
    label: {
        required: false,
        type: String
    },
    range: {
        type: Object,
        required: false,
        default () {
            return {
                min: 1,
                max: 100,
                step: 10
            }
        }
    },
    metric: {
        required: false,
        type: String
    },
    name: {
        required: true,
        type: String
    }
})

const updateMeasurements = (value) => {
    projectStore.updateDoor({ attr: props.name, value: Number(value.target.value) })
}
</script>

<style lang="scss" scoped>
.inputContainer {
    display: flex;
    flex-direction: column;
}

.inputTop {
    width: 100%;
    display: flex;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}

.valueContainer {
    background: $dark;
    padding: 0px 15px;
    border-radius: 40px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;

    &__value {
        margin: 0px;
        color: darken($secondary, 10%);
    }

    &__metric {
        margin-left: 5px;
    }
}

input[type=range] {
    height: 29px;
    -webkit-appearance: none;
    width: 100%;
}

input[type=range]:focus {
    outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 12px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000;
    background: $dark;
    border-radius: 20px;
    border: 1px solid $darkest;
}

input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px $secondary;
    border: 2px solid $secondary;
    height: 21px;
    width: 33px;
    border-radius: 24px;
    background: $primary;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -6px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
    background: $dark;
}

input[type=range]::-moz-range-track {
    width: 100%;
    height: 12px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: $dark;
    border-radius: 20px;
    border: 1px solid $darkest;
}

input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px $secondary;
    border: 2px solid $secondary;
    height: 21px;
    width: 33px;
    border-radius: 24px;
    background: $primary;
    cursor: pointer;
}

input[type=range]::-ms-track {
    width: 100%;
    height: 12px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

input[type=range]::-ms-fill-lower {
    background: $dark;
    border: 1px solid $darkest;
    border-radius: 40px;
    box-shadow: 0px 0px 0px #000000;
}

input[type=range]::-ms-fill-upper {
    background: $dark;
    border: 1px solid $darkest;
    border-radius: 40px;
    box-shadow: 0px 0px 0px #000000;
}

input[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px $secondary;
    border: 2px solid $secondary;
    height: 21px;
    width: 33px;
    border-radius: 24px;
    background: $primary;
    cursor: pointer;
}

input[type=range]:focus::-ms-fill-lower {
    background: $dark;
}

input[type=range]:focus::-ms-fill-upper {
    background: $dark;
}
</style>
