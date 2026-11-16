import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The floor, $$1.5\\text{ m}$$ from the table",
        },
        {
          correct: false,
          label: "The wall, $$0.80\\text{ m}$$ above the floor",
        },
        {
          correct: false,
          label: "The floor, at the foot of the wall",
        },
        {
          correct: true,
          label: "The wall, $$0.45\\text{ m}$$ above the floor",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lantai, $$1.5\\text{ m}$$ dari meja",
        },
        {
          correct: false,
          label: "Dinding, $$0.80\\text{ m}$$ di atas lantai",
        },
        {
          correct: false,
          label: "Lantai, di kaki dinding",
        },
        {
          correct: true,
          label: "Dinding, $$0.45\\text{ m}$$ di atas lantai",
        },
      ],
    },
  },
};

export default item;
