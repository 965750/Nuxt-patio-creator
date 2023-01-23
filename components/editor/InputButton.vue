<template>
    <div>
        <div class="wrapper flex">
            <input data-cy-name-input attr @keyup="checkName" class="wrapper__input p-2" v-model="projectName" type="text" placeholder="project name" />
            <button data-cy-save-project-btn @click="saveProject" class="wrapper__button font-bold">
                Save
            </button>
        </div>
        <p class="inputError">{{ inputError }}</p>
    </div>
</template>

<script setup>
import {
    ref,
    onMounted
} from 'vue'
import {
    useProjectStore
} from '@/store/ProjectStore'

let projectName = ref('')
let inputError = ref('')
const projectStore = useProjectStore()

const checkName = (() => {

    inputError.value = ""

    let regex = /^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/

    if (!regex.test(projectName.value)) {
        inputError.value = "Use only letters and numbers"
    }

    if (projectName.value.length < 4) {
        inputError.value = "Project name is too short"
    }

    if (projectName.value.length > 17) {
        inputError.value = "Project name is too long"
    }
})

onMounted(() => {
    projectName.value = projectStore.currentDoor.name
})

const saveProject = () => {
    checkName()

    if (projectName.value.length && !inputError.value.length)
    projectStore.saveProject(projectName.value)
}
</script>

<style lang="scss" scoped>
.wrapper {
    border: 1px solid $primary;
    border-radius: 40px;
    height: 40px;
    overflow: hidden;

    &__input {
        background: transparent;
        outline: none;
        width: 70%;
    }

    &__button {
        color: #FFF;
        font-size: $fontMedium;
        text-transform: uppercase;
        width: 30%;
        background: rgb(1, 230, 14);
        background: linear-gradient(0deg, rgba(1, 230, 14, 1) 0%, rgba(6, 244, 19, 1) 50%, rgba(6, 244, 19, 1) 100%);

        &:hover {
            background: darken(rgb(1, 230, 14), 1%);
        }

    }
}

.inputError {
    color: rgb(255, 113, 113);
}
</style>
