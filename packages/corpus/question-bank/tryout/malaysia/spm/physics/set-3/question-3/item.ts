import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "measurement",
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
          correct: true,
          label: "II and III only",
        },
        {
          correct: false,
          label: "II, III and IV only",
        },
        {
          correct: false,
          label: "III and IV only",
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
          correct: true,
          label: "II dan III sahaja",
        },
        {
          correct: false,
          label: "II, III dan IV sahaja",
        },
        {
          correct: false,
          label: "III dan IV sahaja",
        },
      ],
    },
  },
};

export default item;
