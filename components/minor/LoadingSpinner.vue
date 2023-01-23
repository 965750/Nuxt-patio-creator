<template>
    <div class="spinnerContainer absolute">
        <div class="spinner" />
    </div>
</template>

<script script>
</script>

<style lang="scss" scoped>
.spinnerContainer {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.spinner {
    width: 70px;
    height: 70px;
    border: 8px solid $primary;
    border-top: 8px solid transparent;
    border-radius: 70px;
    animation: spin 1s infinite ease-in-out;

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>