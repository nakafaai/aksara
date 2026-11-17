import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "About $$61$$ minutes" },
        { correct: false, label: "About $$73$$ minutes" },
        { correct: false, label: "About $$87$$ minutes" },
        { correct: true, label: "About $$91$$ minutes" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kira-kira $$61$$ minit" },
        { correct: false, label: "Kira-kira $$73$$ minit" },
        { correct: false, label: "Kira-kira $$87$$ minit" },
        { correct: true, label: "Kira-kira $$91$$ minit" },
      ],
    },
  },
};

export default item;
