import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "respiratory-systems",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Neither, because both move $$6000\\text{ cm}^3$$ of air per minute",
        },
        { correct: false, label: "Q, by $$1800\\text{ cm}^3$$ per minute" },
        { correct: false, label: "P, by $$3600\\text{ cm}^3$$ per minute" },
        { correct: true, label: "P, by $$1800\\text{ cm}^3$$ per minute" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tiada, kerana kedua-duanya menggerakkan $$6000\\text{ cm}^3$$ udara seminit",
        },
        { correct: false, label: "Q, sebanyak $$1800\\text{ cm}^3$$ seminit" },
        { correct: false, label: "P, sebanyak $$3600\\text{ cm}^3$$ seminit" },
        { correct: true, label: "P, sebanyak $$1800\\text{ cm}^3$$ seminit" },
      ],
    },
  },
};

export default item;
