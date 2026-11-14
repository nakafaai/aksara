import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "umbrella",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "From Monday night to Thursday night, the umbrella spent each night with a different person.",
        },
        {
          correct: false,
          label:
            "The rib was bent on the same day that Pak Darmo borrowed the umbrella.",
        },
        {
          correct: false,
          label: "Raka meant to give the umbrella to Pak Darmo for good.",
        },
        {
          correct: false,
          label:
            "Bu Sari left the umbrella at the shelter on the day of the heaviest rain.",
        },
        {
          correct: true,
          label:
            "By Friday, the umbrella had come back to the place where Bu Sari had left it.",
        },
      ],
    },
  },
};

export default item;
