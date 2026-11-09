import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "zoo-purpose",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Zoos should be closed because animals always suffer in captivity.",
        },
        {
          correct: true,
          label:
            "Zoos should focus on species they can help and drop those they cannot keep well.",
        },
        {
          correct: false,
          label:
            "Zoos already do enough conservation work to justify all their animals.",
        },
        {
          correct: false,
          label:
            "Zoos should keep more elephants and polar bears to attract far more paying visitors.",
        },
        {
          correct: false,
          label:
            "Zoos should release every animal born in captivity back into the wild.",
        },
      ],
    },
  },
};

export default item;
