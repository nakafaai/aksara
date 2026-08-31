import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The roof is mainly organized to maximize the number of edible plants it produces.",
        },
        {
          isCorrect: true,
          label:
            "A rooftop garden uses different zones to respond to practical conditions.",
        },
        {
          isCorrect: false,
          label: "The garden is mainly designed to be seen from the street.",
        },
        {
          isCorrect: false,
          label: "Volunteers avoid recording experiments that fail.",
        },
        {
          isCorrect: false,
          label:
            "The hottest western zone is the central focus because it contains the water supply.",
        },
      ],
    },
  },
  stimulusKey: "rooftop-garden",
};

export default item;
