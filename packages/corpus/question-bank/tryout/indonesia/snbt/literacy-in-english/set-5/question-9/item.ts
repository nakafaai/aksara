import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "nuclear-power",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "That gas plants used only during rare windless weeks would add little carbon dioxide to the air while they are held in reserve.",
        },
        {
          correct: false,
          label:
            "That wind farms and solar parks can be planned and built far more quickly than a reactor that is approved at the same time.",
        },
        {
          correct: true,
          label:
            "That storage will improve enough to take over from the reserve gas plants before the country has to stop burning gas altogether.",
        },
        {
          correct: false,
          label:
            "That a reactor emits almost no carbon dioxide while it runs and produces power steadily whatever the weather happens to be.",
        },
        {
          correct: false,
          label:
            "That batteries can already carry the whole grid through a windless winter week without any help from a steady source.",
        },
      ],
    },
  },
};

export default item;
