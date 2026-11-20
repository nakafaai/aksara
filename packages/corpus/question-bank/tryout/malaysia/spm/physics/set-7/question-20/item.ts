import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I, II, III and IV",
        },
        {
          correct: true,
          label: "I, II and III only",
        },
        {
          correct: false,
          label: "I and II only",
        },
        {
          correct: false,
          label: "I, III and IV only",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I, II, III dan IV",
        },
        {
          correct: true,
          label: "I, II dan III sahaja",
        },
        {
          correct: false,
          label: "I dan II sahaja",
        },
        {
          correct: false,
          label: "I, III dan IV sahaja",
        },
      ],
    },
  },
};

export default item;
