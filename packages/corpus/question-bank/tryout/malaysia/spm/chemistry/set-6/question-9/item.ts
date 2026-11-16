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
        { correct: true, label: "Argon, $$4.0$$ hours" },
        { correct: false, label: "Nitrogen, $$5.7$$ hours" },
        { correct: false, label: "Helium, $$40$$ hours" },
        { correct: false, label: "Argon, $$2.0$$ hours" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Argon, $$4.0$$ jam" },
        { correct: false, label: "Nitrogen, $$5.7$$ jam" },
        { correct: false, label: "Helium, $$40$$ jam" },
        { correct: false, label: "Argon, $$2.0$$ jam" },
      ],
    },
  },
};

export default item;
