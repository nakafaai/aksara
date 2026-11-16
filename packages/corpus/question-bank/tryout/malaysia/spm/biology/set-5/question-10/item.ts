import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "transport-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "About $$1.7$$ times" },
        { correct: false, label: "About $$2.4$$ times" },
        { correct: false, label: "About $$4.0$$ times" },
        { correct: true, label: "About $$5.7$$ times" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kira-kira $$1.7$$ kali" },
        { correct: false, label: "Kira-kira $$2.4$$ kali" },
        { correct: false, label: "Kira-kira $$4.0$$ kali" },
        { correct: true, label: "Kira-kira $$5.7$$ kali" },
      ],
    },
  },
};

export default item;
