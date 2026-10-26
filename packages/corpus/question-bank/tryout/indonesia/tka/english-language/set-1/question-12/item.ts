import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "weather-notebook",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Protect useful records and avoid blaming someone without evidence.",
        },
        {
          correct: false,
          label:
            "Weather records matter primarily when they are transferred from paper to a digital archive.",
        },
        {
          correct: false,
          label:
            "The storm matters mainly because it reveals how the notebook had been stored.",
        },
        {
          correct: false,
          label:
            "A digital copy is sufficient, so later volunteers do not need to add field observations.",
        },
        {
          correct: false,
          label:
            "Sharing a diagram weakens the reliability of the record because its original owner changes.",
        },
      ],
    },
  },
};

export default item;
