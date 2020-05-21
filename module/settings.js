export const registerSystemSettings = function() {

  /**
   * Configure the Numenera version being used
   */
  game.settings.register("numenera", "systemVersion", {
    name: "Numenera Version",
    hint: "Select the Numenera version you're using. Version 1 is the original 2013 edition with the orange cover; version 2 is the 2018 split into two books, Discovery and Destiny",
    scope: "world",
    config: true,
    type: Number,
    default: 2,
    choices: {
      1: "Version 1",
      2: "Version 2",
    },
  });

  /**
   * Configure d20-rolling options
   */
  game.settings.register("numenera", "d20Rolling", {
    name: "d20 rolling",
    hint: "Select the behavior of d20 rolls in your game",
    scope: "world",
    config: true,
    type: String,
    default: "taskLevels",
    choices: {
      "taskLevels": "Output task level success instead of numbers",
      "straightNumbers": "Output numbers and modifiers as is",
    },
  });
}