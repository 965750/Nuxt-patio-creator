import { defineStore } from 'pinia'
import { useInterfaceStore } from './InterfaceStore'
import { useNotification } from '@kyvg/vue3-notification'
import { projectFirestore, timestamp } from '@/firebase/config'
import { collection, getDocs, getDoc, updateDoc, addDoc, doc, deleteDoc } from 'firebase/firestore'

export const useProjectStore = defineStore('ProjectStore', {
  state: () => ({
    projects: [],
    door: {
      height: 250,
      width: 120,
      doors: 2,
      color: '#712f00',
      name: ''
    },
  }),
  actions: {
    updateDoor ({attr, value}) {
        this.door[attr] = value
    },
    async saveProjectUpdate (localName) {
        const interfaceStore = useInterfaceStore()
        const { notify } = useNotification()
        const router = useRouter()

        try {
            const docRef = doc(projectFirestore, 'savedProjects', this.door.id)
                
            await updateDoc(docRef, { 
                ...this.door,
                name: localName,
                updatedAt: timestamp
            })

            this.setDefaultDoor()

            interfaceStore.switchIsLoading(false)
            setTimeout(() => {
                notify({
                    text: 'Project updated',
                    type: 'success'
                })
            }, 500)

            router.push('/')
        } catch(error) {
            notify({
                text: "Error, try again later",
                type: "error"
            })
            console.log(error)
            interfaceStore.switchIsLoading(false)
        }
    },
    async saveProject (localName) {
        if (localName === this.door.name) {
            this.saveProjectUpdate(localName)
        } else {
            const interfaceStore = useInterfaceStore()
            const { notify } = useNotification()
            const router = useRouter()

            try {
                const projectCol = collection(projectFirestore, 'savedProjects')
                await addDoc(projectCol, { 
                    ...this.door,
                    name: localName,
                    updatedAt: timestamp
                })

                this.setDefaultDoor()
                interfaceStore.switchIsLoading(false)
                setTimeout(() => {
                    notify({
                        text: 'Project saved',
                        type: 'success'
                    })
                }, 500)

                router.push('/')
            } catch(error) {
                notify({
                    text: "Error, try again later",
                    type: "error"
                })
                console.log(error)
                interfaceStore.switchIsLoading(false)
            }
        }
    },
    async getProjects () {
        const interfaceStore = useInterfaceStore()
        interfaceStore.switchIsLoading(true)
        const { notify } = useNotification()
    
        try {
            const projectCol = collection(projectFirestore, 'savedProjects')
            const projectsDocs = await getDocs(projectCol)
            
            this.projects = projectsDocs.docs.map(doc => {
                return {...doc.data(), id: doc.id }
            })
            interfaceStore.switchIsLoading(false)
        } catch(error) {
            notify({
                text: "Error, try again later",
                type: "error"
            })
            console.log(error)
            interfaceStore.switchIsLoading(false)
        }
    },
    async deleteProject (id) {
        const { notify } = useNotification()

        try {
            const docRef = doc(projectFirestore, 'savedProjects', id)
                
            await deleteDoc(docRef)
            this.getProjects()

            notify({
                text: "Project deleted",
                type: "success"
            })
        } catch(error) {
            notify({
                text: "Error, try again later",
                type: "error"
            })
            console.log(error)
        }
    },
    async loadProject (id) {
        const interfaceStore = useInterfaceStore()
        const { notify } = useNotification()
        const router = useRouter()
        
        try {
            const docRef = doc(projectFirestore, 'savedProjects', id)
            const projectDoc = await getDoc(docRef)

            if (!projectDoc.data()) {
                throw Error('wrong project id')
            }

            this.setDoor({ ...projectDoc.data(), id })
            interfaceStore.switchIsLoading(false)
            notify({
                text: "Project loaded",
                type: "success"
            })
        } catch(error) {
            setTimeout(() => {
                notify({
                    text: "Try again later, or load different project",
                    type: "error"
                })
            }, 500)
            this.setDefaultDoor()
            interfaceStore.switchIsLoading(false)
            router.push('/')
        }
    },
    setDefaultDoor () {
        this.door = {
          height: 250,
          width: 120,
          doors: 2,
          color: '#712f00',
          name: ''
        }
    },
    setDoor (payload) {
        this.door = payload
    }
  },
  getters: {
    currentDoor: (state) => state.door,
    savedProjects: (state) => state.projects,
  },
})