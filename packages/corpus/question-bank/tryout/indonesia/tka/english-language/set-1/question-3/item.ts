import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  stimulus: "rooftop-garden",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The roof is mainly organized to maximize the number of edible plants it produces.",
        },
        {
          correct: true,
          label:
            "A rooftop garden uses different zones to respond to practical conditions.",
        },
        {
          correct: false,
          label: "The garden is mainly designed to be seen from the street.",
        },
        {
          correct: false,
          label: "Volunteers avoid recording experiments that fail.",
        },
        {
          correct: false,
          label:
            "The hottest western zone is the central focus because it contains the water supply.",
        },
      ],
    },
  },
};

export default item;
