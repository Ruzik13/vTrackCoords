import { createApp } from 'vue'
import App from './App.vue'
import vTrackCoords from './plugins/trackCoords'

const app = createApp(App);
app.directive('trackCoords', vTrackCoords)

app.mount('#app')
