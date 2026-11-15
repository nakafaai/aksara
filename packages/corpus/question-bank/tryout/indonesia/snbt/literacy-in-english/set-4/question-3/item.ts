import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "clever-hans",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tap eight times, because Hans had learned to add small numbers correctly.",
        },
        {
          correct: false,
          label:
            "Tap nine times, because Hans can read the number written on the card in von Osten's hand.",
        },
        {
          correct: true,
          label:
            "Tap nine times, because Hans stops at the questioner's cue, and the cue follows what the questioner expects.",
        },
        {
          correct: false,
          label:
            "Tap eight times, because von Osten's cue comes when Hans reaches the true sum, whatever von Osten believes.",
        },
        {
          correct: false,
          label:
            "Tap a random number of times, because nobody in Hans's view knows the true answer.",
        },
      ],
    },
  },
};

export default item;
