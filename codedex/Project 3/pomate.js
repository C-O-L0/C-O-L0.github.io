document.addEventListener("DOMContentLoaded", function () {
  const taskNameInput = document.getElementById("input-task-name");
  const taskDurationInput = document.getElementById("input-task-duration");
  const addTaskBtn = document.getElementById("add-task-btn");
  const tasksContainer = document.getElementById("tasks-container");
  const breakModal = document.getElementById("break-modal");
  const exerciseContent = document.getElementById("exercise-content");
  const exerciseImage = document.getElementById("exercise-image");
  const breakTimer = document.getElementById("break-timer");
  const skipBreakBtn = document.getElementById("skip-break-btn");
  const completeBreakBtn = document.getElementById("complete-break-btn");

  let currentRunningTask = null;
  let taskCounter = 0;
  let breakInterval = null;
  let resumeTaskAfterBreak = null;

  // Mindful break exercises
  const mindfulExercises = [
    {
      type: "Breathing",
      title: "4-7-8 Breathing Exercise",
      instruction:
        "Sit comfortably with your back straight. Inhale quietly through your nose for 4 seconds. Hold your breath for 7 seconds. Exhale completely through your mouth for 8 seconds. Repeat this cycle 3-4 times.",
      imageAlt: "Breathing exercise illustration",
    },
    {
      type: "Stretching",
      title: "Desk Stretch Sequence",
      instruction:
        "1. Roll your shoulders backward 5 times, then forward 5 times.\n2. Gently tilt your head to each shoulder, holding for 5 seconds.\n3. Stretch your arms overhead and take a deep breath.\n4. Rotate your wrists 5 times in each direction.",
      imageAlt: "Desk stretch illustration",
    },
    {
      type: "Mindfulness",
      title: "Present Moment Awareness",
      instruction:
        "Close your eyes if comfortable. Take 5 deep breaths. Notice 5 things you can hear, 4 things you can feel, 3 things you can see (when eyes open), 2 things you can smell, and 1 thing you can taste. Return to your breath.",
      imageAlt: "Mindfulness exercise illustration",
    },
    {
      type: "Eye Relief",
      title: "20-20-20 Eye Exercise",
      instruction:
        "Look away from your screen. Focus on something 20 feet away for 20 seconds. Blink slowly 20 times. Gently rub your palms together and place your warm palms over your closed eyes for 20 seconds.",
      imageAlt: "Eye relaxation exercise illustration",
    },
    {
      type: "Meditation",
      title: "Quick Body Scan",
      instruction:
        "Close your eyes and focus on your breath. Slowly scan your attention from your feet to your head, noticing any tension. As you exhale, imagine releasing that tension. Spend about 30 seconds on each major body area.",
      imageAlt: "Meditation exercise illustration",
    },
  ];

  // Add task function
  addTaskBtn.addEventListener("click", function () {
    const taskName = taskNameInput.value.trim();
    const taskDuration = parseInt(taskDurationInput.value);

    if (taskName === "" || isNaN(taskDuration) || taskDuration <= 0) {
      alert("Please enter a valid task name and duration");
      return;
    }

    // Create new task element
    const taskId = `task-${taskCounter++}`;
    const durationInSeconds = taskDuration * 60;

    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.setAttribute("data-id", taskId);
    taskItem.setAttribute("data-duration", durationInSeconds);
    taskItem.setAttribute("data-remaining", durationInSeconds);
    taskItem.setAttribute("data-original-duration", durationInSeconds);

    taskItem.innerHTML = `
          <div class="task-name">${taskName}</div>
          <div class="progress-container">
            <div class="progress-bar" id="progress-${taskId}"></div>
          </div>
          <div class="task-duration" id="duration-${taskId}">${formatTime(
      durationInSeconds
    )}</div>
        `;

    // Add click event to toggle timer
    taskItem.addEventListener("click", function () {
      const taskId = this.getAttribute("data-id");

      // If this task is already running, pause it
      if (this.classList.contains("active")) {
        pauseTask(taskId);
      } else {
        // If another task is running, pause it first
        if (currentRunningTask) {
          pauseTask(currentRunningTask);
        }
        startTask(taskId);
      }
    });

    tasksContainer.appendChild(taskItem);

    // Clear input fields
    taskNameInput.value = "";
    taskDurationInput.value = "";
  });

  // Start task timer
  function startTask(taskId) {
    const taskItem = document.querySelector(`.task-item[data-id="${taskId}"]`);
    const progressBar = document.getElementById(`progress-${taskId}`);
    const durationElement = document.getElementById(`duration-${taskId}`);

    const totalDuration = parseInt(taskItem.getAttribute("data-duration"));
    let remainingTime = parseInt(taskItem.getAttribute("data-remaining"));

    // Mark as active
    taskItem.classList.add("active");
    currentRunningTask = taskId;

    // Calculate progress percentage
    const progressPercent = 100 - (remainingTime / totalDuration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Start countdown
    const interval = setInterval(() => {
      remainingTime--;
      taskItem.setAttribute("data-remaining", remainingTime);

      // Update duration display
      durationElement.textContent = formatTime(remainingTime);

      // Update progress bar
      const newProgressPercent = 100 - (remainingTime / totalDuration) * 100;
      progressBar.style.width = `${newProgressPercent}%`;

      // Check if timer completed
      if (remainingTime <= 0) {
        clearInterval(interval);
        taskItem.setAttribute("data-interval", "");
        taskItem.classList.remove("active");
        taskItem.classList.add("completed");
        currentRunningTask = null;

        //     // Play sound alert when timer completes
        const audio = new Audio("./assets/bell.wav");
        audio.play();
      }

      // Check if 25 minutes have passed (trigger mindful break)
      // Only check if the original duration was longer than 25 minutes
      const originalDuration = parseInt(
        taskItem.getAttribute("data-original-duration")
      );
      const timeElapsed = originalDuration - remainingTime;

      if (timeElapsed % 1500 === 0 && timeElapsed > 0 && remainingTime > 0) {
        // Pause the current task
        pauseTask(taskId);

        // Store current task ID to resume after break
        resumeTaskAfterBreak = taskId;

        // Start mindful break
        startMindfulBreak();
      }
    }, 1000);

    // Store interval ID
    taskItem.setAttribute("data-interval", interval);
  }

  // Pause task timer
  function pauseTask(taskId) {
    const taskItem = document.querySelector(`.task-item[data-id="${taskId}"]`);
    const interval = taskItem.getAttribute("data-interval");

    clearInterval(interval);
    taskItem.setAttribute("data-interval", "");
    taskItem.classList.remove("active");

    if (currentRunningTask === taskId) {
      currentRunningTask = null;
    }
  }

  // Start mindful break
  function startMindfulBreak() {
    // Select random exercise
    const exercise =
      mindfulExercises[Math.floor(Math.random() * mindfulExercises.length)];

    // Update modal content
    exerciseContent.innerHTML = `
          <h3>${exercise.title}</h3>
          <p>${exercise.instruction}</p>
        `;

    // Update image alt text
    exerciseImage.alt = exercise.imageAlt;

    // Set break timer (5 minutes)
    let breakTimeRemaining = 300; // 5 minutes in seconds
    breakTimer.textContent = formatTime(breakTimeRemaining);

    // Show modal
    breakModal.classList.add("active");

    // Start break countdown
    breakInterval = setInterval(() => {
      breakTimeRemaining--;
      breakTimer.textContent = formatTime(breakTimeRemaining);

      if (breakTimeRemaining <= 0) {
        completeBreak();
      }
    }, 1000);
  }

  // Complete break and resume task
  function completeBreak() {
    clearInterval(breakInterval);
    breakModal.classList.remove("active");

    // Resume the previous task if available
    if (resumeTaskAfterBreak) {
      startTask(resumeTaskAfterBreak);
      resumeTaskAfterBreak = null;
    }
  }

  // Event listeners for break modal buttons
  skipBreakBtn.addEventListener("click", function () {
    completeBreak();
  });

  completeBreakBtn.addEventListener("click", function () {
    completeBreak();
  });

  // Format seconds to MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  }
});
