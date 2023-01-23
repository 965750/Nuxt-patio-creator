<template>
    <div class="colorsContainer">
            <ColorBox
                color='#712f00'
                :isActive="('#712f00' === currentDoor.color)"
                @changeColor="setActiveColor"
            />
            <ColorBox
                color="#381700"
                :isActive="('#381700' === currentDoor.color)"
                @changeColor="setActiveColor"
            />
            <ColorBox
                color="#e7e7e7"
                :isActive="('#e7e7e7' === currentDoor.color)"
                @changeColor="setActiveColor"
            />
        </div>
</template>

<script setup>
import ColorBox from './ColorBox.vue'
import { storeFav } from '@/composables/storeFav'

const { projectStore, currentDoor } = storeFav()
        
const setActiveColor = (colorPicked) => {
    projectStore.updateDoor({
        attr: 'color',
        value: colorPicked
    })
}
</script>

<style lang="scss" scoped>
.colorsContainer {
    display: flex;
    justify-content: space-around;
}
</style>
