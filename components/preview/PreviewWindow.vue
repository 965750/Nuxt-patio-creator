<template>
    <div class="previewWindow relative">
        <PatioDoors />
        <div class="previewWindow__room h-full"></div>
        <div class="previewWindow__patio h-full"></div>
    </div>
</template>
    
<script setup>
import PatioDoors from './PatioDoors.vue'
</script>

<style lang="scss" scoped>
.previewWindow {
    height: 100%;

    &__patio {
        background: no-repeat url("../../assets/patio.jpg");
    }
    &__room {
        background: no-repeat url("../../assets/room.jpg");
    }
}
</style>