const createScheduler = (task: () => void, interval: number) => {
    let updateIntervalId: ReturnType<typeof setTimeout> | null = null;
    let updateInterval = interval;
    let lastExecutionTime: Date | null = null;

    const scheduleTask = () => {
        task();
        lastExecutionTime = new Date();
        updateIntervalId = setTimeout(scheduleTask, updateInterval);
    };

    return {
        setInterval: function (newInterval: number) {
            updateInterval = newInterval;
            if (this.isRunning()) {
                // We don't want to have an immediate execution of the task after changing the interval.
                // Therefore, we calculate the time that has already passed since the last execution and
                // subtract it from the new interval. If the new interval is smaller than the time that
                // has already passed, we just set the interval to 0.
                const previouslyElapsedMilliseconds = new Date().getTime() - lastExecutionTime!.getTime();
                const timeYetToPass = Math.max(newInterval - previouslyElapsedMilliseconds, 0);
                this.stop();
                setTimeout(scheduleTask, timeYetToPass);
            }
        },
        stop: function () {
            clearTimeout(updateIntervalId!);
            updateIntervalId = null;
        },
        start: scheduleTask,
        isRunning: function () { return updateIntervalId !== null; },
    };
};

export const createEngine = (task: () => void) => {
    const startStopButton = document.getElementById("start-stop") as HTMLButtonElement | null;
    const speedSlider = document.getElementById("speed") as HTMLInputElement | null;
    if (!startStopButton || !speedSlider) {
        throw new Error("Controls not found!");
    }

    const scheduler = createScheduler(task, 1000 / Number(speedSlider.value));

    startStopButton.addEventListener("click", () => {
        if (scheduler.isRunning()) {
            scheduler.stop();
            startStopButton.querySelector("svg[id=start-icon]")!.classList.remove("hidden");
            startStopButton.querySelector("svg[id=pause-icon]")!.classList.add("hidden");
        } else {
            scheduler.start();
            startStopButton.querySelector("svg[id=start-icon]")!.classList.add("hidden");
            startStopButton.querySelector("svg[id=pause-icon]")!.classList.remove("hidden");
        }
    });

    speedSlider.addEventListener("input", () => {
        scheduler.setInterval(1000 / Number(speedSlider.value));
    });

    return {
        start: scheduler.start,
        stop: scheduler.stop,
    };
};
