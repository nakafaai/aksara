import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "About $$90$$ minutes" },
        { correct: false, label: "About $$39$$ minutes" },
        { correct: true, label: "About $$29$$ minutes" },
        { correct: false, label: "About $$120$$ minutes" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kira-kira $$90$$ minit" },
        { correct: false, label: "Kira-kira $$39$$ minit" },
        { correct: true, label: "Kira-kira $$29$$ minit" },
        { correct: false, label: "Kira-kira $$120$$ minit" },
      ],
    },
  },
};

export default item;
