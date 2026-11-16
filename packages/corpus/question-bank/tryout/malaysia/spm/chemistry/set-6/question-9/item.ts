import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Argon, $$9.5$$ hours" },
        { correct: false, label: "Nitrogen, $$13.6$$ hours" },
        { correct: false, label: "Helium, $$95$$ hours" },
        { correct: false, label: "Argon, $$10.0$$ hours" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Argon, $$9.5$$ jam" },
        { correct: false, label: "Nitrogen, $$13.6$$ jam" },
        { correct: false, label: "Helium, $$95$$ jam" },
        { correct: false, label: "Argon, $$10.0$$ jam" },
      ],
    },
  },
};

export default item;
