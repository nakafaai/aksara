import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "text-fit",
  },
  stimulus: "chili-harvest",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Lina followed it on the first Friday, and nobody looked at the book again until the end of the month.",
        },
        {
          correct: false,
          label: "We weighed the big basket empty on the first day we used it.",
        },
        {
          correct: true,
          label: "The canteen scale shows weights to one decimal place.",
        },
        {
          correct: false,
          label:
            "We weighed the chilies straight on the scale, without any basket.",
        },
        {
          correct: false,
          label: "Bu Wening weighed every basket herself.",
        },
      ],
    },
  },
};

export default item;
