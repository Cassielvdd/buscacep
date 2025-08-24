<script setup>
import "../src/main.css";
import "../src/style.css";
import Button from "./components/ui/button/Button.vue";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input/index";
const cepRecebido = "01001000";
import { ref } from "vue";
const cidade = ref("");
const search = ref(cepRecebido);

async function chamarApi() {
  await fetch(`https://viacep.com.br/ws/${search.value}/json/`)
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      cidade.value = json;
    });
}
function copiarTexto() {
  const texto = `Cidade: ${cidade.value.localidade}, Bairro: ${cidade.value.bairro}, Estado: ${cidade.value.uf}, Logradouro: ${cidade.value.logradouro}, UF: ${cidade.value.uf}`;
  navigator.clipboard.writeText(texto);
  alert("Texto copiado para a área de transferência!");
}
</script>

<template>
  <header
    class="w-full h-14 border-b border-dashed border-gray-600 flex flex-row justify-between items-center p-6 absolute"
  >
    <div>
      <h2 class="text-2xl font-bold">
        Busca<span class="text-[#39FF14]">CEP</span>
      </h2>
    </div>
    <div>
      <a
        href="https://github.com/Cassielvdd/buscacep"
        target="_blank"
        rel="noopener noreferrer"
        ><font-awesome-icon
          :icon="['fab', 'github']"
          class="text-white text-2xl hover:text-[#39FF14] cursor-pointer transition duration-300"
      /></a>
    </div>
  </header>
  <div class="flex justify-center items-center h-dvh w-full">
    <div class="flex flex-col justify-center items-center mx-auto">
      <h2 class="text-2xl mb-7">
        Digite um <span class="text-[#39FF14]">CEP</span> para buscar
      </h2>
      <div class="flex flex-row justify-center items-center">
        <Input
          class="mr-2 w-full max-w-xs md:max-w-[500px] md:w-[500px] rounded-2xl"
          placeholder="Digite o CEP"
          v-model="search"
          required
        />
        <Dialog>
          <DialogTrigger
            v-on:click="chamarApi"
            class="bg-[#39FF14] hover:bg-[#32CD32] flex justify-center items-center"
          >
            <font-awesome-icon
              :icon="['fas', 'search']"
              class="text-white text-xl"
          /></DialogTrigger>
          <DialogContent
            class="bg-[#242424] border-none text-white"
            v-if="cidade && !cidade.erro"
          >
            <DialogHeader>
              <DialogTitle class="text-gray-300 text-3xl text-start"
                >CEP encontrado</DialogTitle
              >
              <DialogDescription class="text-start">
                <span class="text-2xl text-white">
                  Cidade: {{ cidade.localidade }}</span
                >
                <br v-if="cidade.bairro" /><span
                  class="text-2xl text-white"
                  v-if="cidade.bairro"
                >
                  Bairro: {{ cidade.bairro }}</span
                ><br />
                <span class="text-2xl text-white">
                  Estado: {{ cidade.estado }}</span
                >
                <br v-if="cidade.logradouro" />
                <span class="text-2xl text-white" v-if="cidade.logradouro">
                  Logradouro: {{ cidade.logradouro }}</span
                >
                <br />
                <span class="text-2xl text-white"> UF: {{ cidade.uf }}</span>
              </DialogDescription>
              <button
                v-on:click="copiarTexto"
                class="bg-[#39FF14] hover:bg-[#32CD32] mt-4 text-white font-bold"
              >
                Copiar dados
              </button>
            </DialogHeader>
            <DialogFooter>
              <iframe
                :src="`https://www.google.com/maps?q=${cidade.localidade}&output=embed`"
                width="100%"
                height="200"
                style="
                  border: 0;
                  border-radius: 12px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                "
                allowfullscreen
                loading="lazy"
              >
              </iframe>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </div>
  <div
    class="w-full h-14 border-t border-dashed border-gray-600 flex flex-row justify-center items-center p-6 absolute bottom-0"
  >
    <p>
      Desenvolvido por
      <a
        href="https://github.com/Cassielvdd"
        class="text-[#39FF14]"
        target="_blank"
        rel="noopener noreferrer"
        >Pedro Cassiel</a
      >
    </p>
  </div>
</template>

<style scoped>
body {
  background-color: #0d1117;
}
</style>
