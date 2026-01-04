# vTrackCoords

## Применение
```
<div
  class="container"
  v-track-coords="{
    checkInterval: 30,
    sendingInterval: 3000,
    url: '/track-mouse.php',
  }"
>
  Track mouse here
</div>
```
---
## Аргументы
* `checkInterval`  - период сбора данных (по умолчанию 30мс)
* `sendInterval` – период отправки данных на сервер (по умолчанию 3с)
* `url` – адрес, на который будут отправляться данные
