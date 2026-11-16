import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "leaf-structure-and-function",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "About $$239$$ stomata per $$\\text{mm}^2$$" },
        { correct: false, label: "About $$60$$ stomata per $$\\text{mm}^2$$" },
        { correct: false, label: "$$750$$ stomata per $$\\text{mm}^2$$" },
        { correct: false, label: "About $$24$$ stomata per $$\\text{mm}^2$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Kira-kira $$239$$ stoma per $$\\text{mm}^2$$" },
        { correct: false, label: "Kira-kira $$60$$ stoma per $$\\text{mm}^2$$" },
        { correct: false, label: "$$750$$ stoma per $$\\text{mm}^2$$" },
        { correct: false, label: "Kira-kira $$24$$ stoma per $$\\text{mm}^2$$" },
      ],
    },
  },
};

export default item;
