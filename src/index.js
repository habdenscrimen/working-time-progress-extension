class Percentage {
  constructor(config) {
    this.config = config;
  }

  get startTime() {
    return new Date().setHours(config.startHours, 0, 0, 0);
  }

  get endTime() {
    return new Date().setHours(config.endHours, 0, 0, 0);
  }

  calculatePercentage = () => {
    // calculate the difference between 'start' and 'end' time
    const total = this.endTime - this.startTime;
    // how much 'time' has passed now
    const passed = new Date().getTime() - this.startTime;

    // update percentage
    return Math.round((passed * 100) / total);
  };

  render = () => {
    // calculate percentage
    let percentage = this.calculatePercentage();
    // if time is up (percentage > 99), call 'onFinish' callback
    if (percentage > 99) {
      return this.config.onFinish();
    }

    // update percentage before the first render's tick
    this.config.onUpdatePercentage(percentage);

    const interval = setInterval(() => {
      // if time is up, clear interval and call 'onFinish' callback
      if (percentage > 99) {
        clearInterval(interval);
        return this.config.onFinish();
      }

      // update percentage
      this.config.onUpdatePercentage(this.calculatePercentage());
    }, 1000);
  };
}

// query percentage element
const percentageElement = document.querySelector("#percentage");
const progressLeftElement = document.querySelector("#progress-left");

// config object
const config = {
  startHours: 20,
  endHours: 21,

  onUpdatePercentage: (percentage) => {
    percentageElement.innerHTML = `${percentage}%`;
    progressLeftElement.style.width = `${100 - percentage}%`;
  },
  onFinish: () => {
    percentageElement.classList.add("hidden");
    progressLeftElement.classList.add("hidden");
  },
};

const percentage = new Percentage(config);

percentage.render();
