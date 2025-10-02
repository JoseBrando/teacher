<template>
    <div class="container">
        <section class="mb-5">
            <h3>Añadir Profesor</h3>
            <div class="input-group mb-3">
                <span class="input-group-text">Nombre</span>
                <input type="text" class="form-control" v-model="teacher.teacherName">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Apellidos</span>
                <input type="text" class="form-control" v-model="teacher.surname">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">DNI / NIF:</span>
                <input type="text" class="form-control" v-model="teacher.dni">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Materias:</span>
                <input type="text" class="form-control" v-model="subject">
                <button class="btn btn-primary" v-on:click="handleSubject()">Agregar</button>
            </div>
            
            <div>
                <ul>
                    <li v-for="(elm, index) in teacher.subjects" :key="index">{{ elm }}</li>
                </ul>
            </div>
            
            <div class="input-group mb-3">
                <div class="align-content-center">
                    <input type="checkbox" class="form-check-input" id="addDoc" v-model="teacher.doc"/>
                    <label class="form-check-label mx-2" for="addDoc">Documentación Entregada</label>
                </div>
            </div>

            <div class="text-center">
                <button class="btn btn-primary" @click="handleAddTeacher()">Agregar</button>
            </div>
        </section>

        <section>
            <h3>Listado de profesores</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">DNI / NIF</th>
                        <th scope="col">Materias</th>
                        <th scope="col">Documentación Entregada</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(elm, idx) in teachers" :key="elm.dni">
                        <td>{{ elm.teacherName }}</td>
                        <td>{{ elm.surname }}</td>
                        <td>{{ elm.dni }}</td>
                        <td>
                            <ul>
                                <li v-for="(item, index) in elm.subjects" :key="index">{{ item }}</li>
                            </ul>
                        </td>
                        <td v-if="elm.doc">Entregado</td>
                        <td v-else>No entregado</td>
                        <td>
                            <button class="btn btn-danger" @click="handleDeleteTeacher(idx)">Eliminar</button>
                            <button class="btn btn-warning mx-1" @click="handleEditTeacher(idx)">Editar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { Ref } from 'vue'
    import { ITeacher } from '@/interfaces/ITeacher'

    let isEdit: number = -1

    let teacher:Ref<ITeacher> = ref({
        teacherName: '',
        surname: '',
        dni: '',
        subjects: [],
        doc: false
    })

    let teachers:Ref<Array<ITeacher>> = ref([])

    let subject:Ref<string> = ref('')

    const handleSubject = () => {
        if (subject.value.trim() == "") {
            alert("Agregue una materia")
        } else {
            teacher.value.subjects.push(subject.value)
            subject.value = ""
        }
        
    }

    const handleAddTeacher = () => {
        if (teacher.value.teacherName.trim() == "" || teacher.value.surname.trim() == "" || 
            teacher.value.dni.trim() == "" || teacher.value.subjects.length == 0) {
            alert("Complete el formulario")
        } else {
            if (isEdit > -1) {
                Object.assign(teachers.value[isEdit]!, {
                    teacherName: teacher.value.teacherName,
                    surname: teacher.value.surname,
                    dni: teacher.value.dni,
                    subjects: teacher.value.subjects,
                    doc: teacher.value.doc
                })
            } else {
                teachers.value.push({
                    teacherName: teacher.value.teacherName,
                    surname: teacher.value.surname,
                    dni: teacher.value.dni,
                    subjects: teacher.value.subjects,
                    doc: teacher.value.doc 
                })
            }
            
            
            teacher.value.teacherName = ""
            teacher.value.surname = ""
            teacher.value.dni = ""
            teacher.value.subjects = []
            teacher.value.doc = false
        }
    }

    const handleDeleteTeacher = (idx: number) => {
        teachers.value.splice(idx, 1)
    }

    const handleEditTeacher = (idx: number) => {
        let element: ITeacher = teachers.value[idx]

        teacher.value.teacherName = element.teacherName
        teacher.value.surname = element.surname
        teacher.value.dni = element.dni
        teacher.value.subjects = element.subjects
        teacher.value.doc = element.doc

        isEdit = idx
    }
</script>

<style scoped>
    
</style>