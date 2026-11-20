import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "it is pulled down, it stays where it is, and it jumps higher",
        },
        {
          correct: false,
          label: "it jumps up, it jumps just as high, and it jumps higher",
        },
        {
          correct: true,
          label: "it jumps up, it stays where it is, and it jumps higher",
        },
        {
          correct: false,
          label: "it jumps up, it stays where it is, and it jumps less high",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "ia ditarik ke bawah, ia kekal di tempatnya, dan ia melompat lebih tinggi",
        },
        {
          correct: false,
          label:
            "ia melompat ke atas, ia melompat sama tinggi, dan ia melompat lebih tinggi",
        },
        {
          correct: true,
          label:
            "ia melompat ke atas, ia kekal di tempatnya, dan ia melompat lebih tinggi",
        },
        {
          correct: false,
          label:
            "ia melompat ke atas, ia kekal di tempatnya, dan ia melompat kurang tinggi",
        },
      ],
    },
  },
};

export default item;
