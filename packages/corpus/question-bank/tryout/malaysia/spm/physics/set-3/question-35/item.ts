import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Only when A and B are equal",
        },
        {
          correct: false,
          label: "Only when A and B are both $$1$$",
        },
        {
          correct: false,
          label: "Whenever A or B is $$0$$",
        },
        {
          correct: true,
          label: "Only when A and B differ",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Hanya apabila A dan B sama",
        },
        {
          correct: false,
          label: "Hanya apabila A dan B kedua-duanya $$1$$",
        },
        {
          correct: false,
          label: "Bila-bila masa A atau B ialah $$0$$",
        },
        {
          correct: true,
          label: "Hanya apabila A dan B berbeza",
        },
      ],
    },
  },
};

export default item;
