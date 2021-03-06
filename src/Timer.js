import { View } from "./View.js";
import { Emitter } from "./Emitter.js";

const Timer = {
  time: 60 * 60,
  currentTime: 0,
  interval: null,

  timeToMinutes: (time) => Math.floor(time / 60),
  timeToSeconds: (time) => time % 60,

  //quando o length estiver com 1 ele ira preencher com 0, 10:02
  // ou seja se ele tiver apenas 1 numero, ira preencher com um 0
  formatTime: (time) => String(time).padStart(2, "0"),

  init(time) {
    Emitter.emit("countdown-start");

    Timer.time = time || Timer.time;
    Timer.currentTime = Timer.time;
    Timer.interval = setInterval(Timer.countdown, 1000);
  },

  countdown() {
    Timer.currentTime = Timer.currentTime - 1;

    const minutes = Timer.formatTime(Timer.timeToMinutes(Timer.currentTime));
    const seconds = Timer.formatTime(Timer.timeToSeconds(Timer.currentTime));

    console.log(Timer.formatTime(minutes), ":", Timer.formatTime(seconds));

    View.render({
      minutes,
      seconds,
    });

    if (Timer.currentTime === 0) {
      clearInterval(Timer.interval);
      Emitter.emit("countdown-end");
      return;
    }
  },
};

export { Timer };
