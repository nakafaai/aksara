import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "glacier-flow",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The ice crystals harden in the heat and push one another forward.",
        },
        {
          correct: false,
          label: "More snow falls in summer, which adds weight to the ice.",
        },
        {
          correct: false,
          label:
            "Friction with the valley walls increases sharply in warmer weather.",
        },
        {
          correct: true,
          label:
            "More meltwater collects at the base, and the glacier slides on it.",
        },
        {
          correct: false,
          label: "The melting snout pulls the rest of the glacier downhill.",
        },
      ],
    },
  },
};

export default item;
