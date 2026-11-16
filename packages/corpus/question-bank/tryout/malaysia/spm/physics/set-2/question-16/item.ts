import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and II only",
        },
        {
          correct: false,
          label: "I, II and IV only",
        },
        {
          correct: false,
          label: "III and IV only",
        },
        {
          correct: true,
          label: "I, II and III only",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I dan II sahaja",
        },
        {
          correct: false,
          label: "I, II dan IV sahaja",
        },
        {
          correct: false,
          label: "III dan IV sahaja",
        },
        {
          correct: true,
          label: "I, II dan III sahaja",
        },
      ],
    },
  },
};

export default item;
