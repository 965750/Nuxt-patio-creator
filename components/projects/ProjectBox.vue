<template>
    <div
        class="box"
        :class="{'box--new': !props.saved}"
    >
        <div
            v-if="!props.saved"
            class="boxContent"
        >
            <div
                data-cy-create-project-btn
                @click="createProject"
                class="boxContent__circle cursor-pointer m-auto flex justify-center items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 boxContent__icon">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>

            </div>
            <p
                @click="createProject"
                class="boxContent__create mt-4"
            >CREATE A NEW PROJECT</p>
        </div>
        <div
            v-else
            class="boxContent relative"
        >
            <div
                data-cy-load-project-btn
                @click="loadProject"
                class="boxContent__circle cursor-pointer m-auto flex justify-center items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 boxContent__icon">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                </svg>

            </div>
            <div class="flex justify-between">
                <div class="mt-3">
                    <p>
                        <span class="font-bold">Project Name:</span>
                        <span class="boxContent__text">{{ project.name }}</span>
                    </p>
                    <p>
                        <span class="font-bold">Last Update:</span>
                        <span class="boxContent__text">{{ timeDistance }}</span>
                    </p>
                </div>
                <div
                    :data-cy="`delete-btn-${project.name}`"
                    class="boxContent__delete cursor-pointer absolute flex justify-center items-center"
                    @click="deleteProject"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-center ">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    computed
} from "vue"
import {
    formatDistanceToNow,
} from 'date-fns'
import {
    useRouter
} from "vue-router"
import {
    useProjectStore
} from "@/store/ProjectStore"
import {
    useInterfaceStore
} from "@/store/InterfaceStore"

const props = defineProps({
    saved: Boolean,
    project: Object
})

const router = useRouter()
const projectStore = useProjectStore()
const interfaceStore = useInterfaceStore()

const timeDistance = computed(() => {
    if (props.project.updatedAt) {
        return formatDistanceToNow(Number(props.project.updatedAt.seconds + '000')) + ' ago'
    } else {
        return 'Some time ago'
    }
})

const createProject = () => {
    projectStore.setDefaultDoor()
    router.push(`/creator/new`)
}

const loadProject = () => {
    interfaceStore.switchIsLoading(true)
    router.push(`/creator/${props.project.id}`)
}

const deleteProject = () => {
    projectStore.deleteProject(props.project.id)
}
</script>

<style lang="scss" scoped>
.box {
    width: 300px;
    border-radius: 20px;
    margin: 10px;
    background: rgba($secondary, .1);
    box-shadow: 5px 5px 10px 5px $dark;

    &--new {
        border: 1px solid $secondary;
        color: $secondary;
        background: rgba($secondary, .15);
    }
}

.boxContent {
    padding: 20px;
    text-align: left;

    &__create {
        font-weight: bold;
        font-size: 22px;
        cursor: pointer;
    }

    &__text {
        margin-left: 10px;
    }

    &__circle {
        background: $primary;
        color: #fff;
        border-radius: 50%;
        height: 150px;
        width: 150px;
        opacity: .6;
        transition: all .2s;

        &:hover {
            opacity: 1;
        }
    }

    &__delete {
        background: #dc3e3e;
        border-radius: 50%;
        color: #fff;
        height: 40px;
        width: 40px;
        top: 5px;
        right: 5px;
        opacity: .5;
        transition: all .2s;

        &:hover {
            opacity: .9;
        }
    }
}
</style>
