import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I, II and III only",
        },
        {
          correct: false,
          label: "II and IV only",
        },
        {
          correct: false,
          label: "I, III and IV only",
        },
        {
          correct: true,
          label: "II, III and IV only",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I, II dan III sahaja",
        },
        {
          correct: false,
          label: "II dan IV sahaja",
        },
        {
          correct: false,
          label: "I, III dan IV sahaja",
        },
        {
          correct: true,
          label: "II, III dan IV sahaja",
        },
      ],
    },
  },
};

export default item;
