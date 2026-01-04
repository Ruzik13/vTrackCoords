<template>
  <div>
    <h1 v-track-coords="'hello'">You did it!</h1>

    <p v-track-coords="{ url: '/save.php', debug: true }">
      Visit <a href="https://vuejs.org/" target="_blank">vuejs.org</a>
    </p>
    <div
      v-track-coords="{
        url: '/track-mouse.php',
        trackMouse: true
      }"
      style="width: 300px; height: 200px; border: 1px solid #ccc;"
    >
      Track mouse here
    </div>
  </div>
</template>
