import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Protect useful records and avoid blaming someone without evidence.",
        },
        {
          isCorrect: false,
          label:
            "Weather records matter primarily when they are transferred from paper to a digital archive.",
        },
        {
          isCorrect: false,
          label:
            "The storm matters mainly because it reveals how the notebook had been stored.",
        },
        {
          isCorrect: false,
          label:
            "A digital copy is sufficient, so later volunteers do not need to add field observations.",
        },
        {
          isCorrect: false,
          label:
            "Sharing a diagram weakens the reliability of the record because its original owner changes.",
        },
      ],
    },
  },
  stimulusKey: "weather-notebook",
};

export default item;
