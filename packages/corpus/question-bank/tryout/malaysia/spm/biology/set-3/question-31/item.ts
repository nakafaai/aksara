import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "environmental-sustainability",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$500\\,000$$ times, and the largest step is from the large fish to the bird",
        },
        {
          correct: false,
          label:
            "$$50\\,000$$ times, and the largest step is from the water to the plankton",
        },
        {
          correct: false,
          label:
            "$$12.5$$ times, and the largest step is from the large fish to the bird",
        },
        {
          correct: true,
          label:
            "$$500\\,000$$ times, and the largest step is from the water to the plankton",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$500\\,000$$ kali, dan langkah terbesar ialah dari ikan besar ke burung",
        },
        {
          correct: false,
          label:
            "$$50\\,000$$ kali, dan langkah terbesar ialah dari air ke plankton",
        },
        {
          correct: false,
          label:
            "$$12.5$$ kali, dan langkah terbesar ialah dari ikan besar ke burung",
        },
        {
          correct: true,
          label:
            "$$500\\,000$$ kali, dan langkah terbesar ialah dari air ke plankton",
        },
      ],
    },
  },
};

export default item;
