<script setup>
import { ref } from 'vue'
import { cercar, obtenirDetallPelicula } from '../services/communicationManager.js'

const cerca = ref('')
const resultats = ref([])
const resultatDetall = ref(null)

const haCercat  = ref(false)

async function buscar() {
    try {
      resultats.value = await cercar(cerca.value) ?? []
      haCercat.value = true
    } catch (e) {
      console.error(e)
      resultats.value = []
    }
}

async function buscarDetall(imdbID) {
    resultatDetall.value = await obtenirDetallPelicula(imdbID)
    console.log(resultatDetall.value)
}

function netejar() {
    cerca.value = ''
    resultats.value = []
    haCercat.value = false
}

</script>

<template>
    <v-app-bar title="Cercador de pelicules" color="#212121"></v-app-bar>

    <v-main style="background-color: #121212;">
        <v-container>

            <v-text-field
                bg-color="#242424"
                v-model="cerca"
                label="Què vols cercar?"
                @keyup.enter="buscar"
            />

            <v-btn color="#1976D2"
            @click="buscar">
                Cercar
            </v-btn>

            <v-btn color="#424242"
            @click="netejar">
                Netejar
            </v-btn>

            <v-alert v-if="haCercat && resultats.length === 0"
            type="info"
            variant="tonal"
            class="my-4">
                No s'han trobat películes amb el titol {{cerca}}
            </v-alert>

            <br><br><br>

            <v-row>
                <v-col
                    v-for="element in resultats"
                    :key="element.imdbID"
                    cols="12"
                    md="3"
                >

                    <v-card color="#212121">
                        <v-card-title class="text-white">{{ element.Title }}</v-card-title>
                        <v-card-text class="text-grey-lighten-1">{{ element.Year }}</v-card-text>
                        <img
                            width="300"
                            :src="element.Poster"
                            alt="Imatge poster"
                        >

                        
                        <br>

                        <v-dialog max-width="500">

                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn
                                    v-bind="activatorProps"
                                    color="#1976D2"
                                    text="Més info"
                                    variant="flat"
                                    @click="buscarDetall(element.imdbID)"
                                >
                                </v-btn>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card title="Més info">

                                    <v-card-text>
                                      <b>Director:</b> 
                                        {{ resultatDetall?.Director }}
                                    </v-card-text>

                                    <v-card-text>
                                      <b>Actors:</b> 
                                        {{ resultatDetall?.Actors }}
                                    </v-card-text>

                                    <v-card-text>
                                      <b>Plot: </b>
                                        {{ resultatDetall?.Plot }}
                                    </v-card-text>

                                    <v-card-text>
                                      <b>Durada: </b>
                                        {{ resultatDetall?.Runtime }}
                                    </v-card-text>

                                    <v-card-text>
                                      <b>Génere: </b> 
                                        {{ resultatDetall?.Genre }}
                                    </v-card-text>

                                    <v-card-text>
                                      <b>Valoració: </b>
                                        {{ resultatDetall?.Ratings[0].Value }}
                                    </v-card-text>

                                    

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn
                                            text="Tancar"
                                            @click="isActive.value = false"
                                        >
                                        </v-btn>

                                    </v-card-actions>

                                </v-card>
                            </template>

                        </v-dialog>

                    </v-card>

                </v-col>
            </v-row>

        </v-container>
    </v-main>
</template>