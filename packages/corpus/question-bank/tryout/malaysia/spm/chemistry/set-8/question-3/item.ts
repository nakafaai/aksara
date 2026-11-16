import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "About $$1700$$ times larger, $$12$$ times further apart",
        },
        {
          correct: false,
          label: "About $$1330$$ times larger, $$11$$ times further apart",
        },
        {
          correct: false,
          label: "About $$1700$$ times larger, $$1700$$ times further apart",
        },
        {
          correct: false,
          label: "About $$1700$$ times larger, $$41$$ times further apart",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Lebih kurang $$1700$$ kali ganda, $$12$$ kali lebih jauh",
        },
        {
          correct: false,
          label: "Lebih kurang $$1330$$ kali ganda, $$11$$ kali lebih jauh",
        },
        {
          correct: false,
          label: "Lebih kurang $$1700$$ kali ganda, $$1700$$ kali lebih jauh",
        },
        {
          correct: false,
          label: "Lebih kurang $$1700$$ kali ganda, $$41$$ kali lebih jauh",
        },
      ],
    },
  },
};

export default item;
