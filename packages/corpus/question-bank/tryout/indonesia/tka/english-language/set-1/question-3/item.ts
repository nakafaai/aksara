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
          label: "Every rooftop should grow only tomatoes and lettuce.",
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
          label: "The western corner is the only useful part of the roof.",
        },
      ],
    },
  },
  stimulusKey: "rooftop-garden",
};

export default item;
