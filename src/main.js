import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser, faCoffee, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Adiciona os ícones à biblioteca
library.add(faUser, faCoffee, faGithub, faSearch);

// Cria e monta o app
createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
