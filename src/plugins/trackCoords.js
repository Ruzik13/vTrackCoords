const vTrackCoords = {
  mounted(el, binding) {
    if (!binding.value?.url) {
      console.error('Введите url');
      return;
    }

    const config = {
      checkInterval: 3000,
      sendInterval: 5000,
      url: '',
      ...binding.value,
    };

    let lastPoint = null;
    let trackingInterval = null;
    let sendingInterval = null;

    let enterTime = null;
    let totalTime = 0;
    let data = [];

    const isMouseInside = (e) => {
      const rect = el.getBoundingClientRect();
      return e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    };

    const sendData = async () => {
      if (data.length === 0) return;

      const payload = {
        data: [...data],
        totalTime
      };

      try {
        await fetch(config.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (error) {
      }
    };

    const handleMouseMove = (e) => {
      if (isMouseInside(e)) {
        lastPoint = { x: e.clientX, y: e.clientY, timestamp: Date.now() };

        if (enterTime === null) {
          enterTime = performance.now();
        }

        if (!trackingInterval) {
          trackingInterval = setInterval(() => {
              data.push(lastPoint);
              totalTime += Math.round(performance.now() - enterTime);
          }, config.checkInterval);
        }

      } else {
        if (enterTime !== null) {
          totalTime += Math.round(performance.now() - enterTime);
          enterTime = null;
        }

        if (trackingInterval) {
          clearInterval(trackingInterval);
          trackingInterval = null;
        }
      }
    };

    sendingInterval = setInterval(sendData, config.sendInterval);

    document.addEventListener('mousemove', handleMouseMove);

    el._trackCoordsHandler = handleMouseMove;
    el._trackCoordsTrackingInterval = () => trackingInterval;
    el._trackCoordsSendingInterval = () => sendingInterval;
  },

  unmounted(el) {
    if (el._trackCoordsHandler) {
      document.removeEventListener('mousemove', el._trackCoordsHandler);
    }

    const trackingId = el._trackCoordsTrackingInterval?.();
    if (trackingId) clearInterval(trackingId);

    const sendingId = el._trackCoordsSendingInterval?.();
    if (sendingId) clearInterval(sendingId);
  }
};

export default vTrackCoords;
