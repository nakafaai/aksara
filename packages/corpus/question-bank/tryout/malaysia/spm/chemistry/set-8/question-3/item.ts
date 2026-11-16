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
          label: "$$1700$$ times larger, $$1.97\\times10^{19}$$ molecules",
        },
        {
          correct: false,
          label: "$$1330$$ times larger, $$2.51\\times10^{19}$$ molecules",
        },
        {
          correct: false,
          label: "$$1700$$ times larger, $$3.34\\times10^{22}$$ molecules",
        },
        {
          correct: false,
          label: "$$1700$$ times larger, $$5.91\\times10^{19}$$ molecules",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1700$$ kali ganda, $$1.97\\times10^{19}$$ molekul",
        },
        {
          correct: false,
          label: "$$1330$$ kali ganda, $$2.51\\times10^{19}$$ molekul",
        },
        {
          correct: false,
          label: "$$1700$$ kali ganda, $$3.34\\times10^{22}$$ molekul",
        },
        {
          correct: false,
          label: "$$1700$$ kali ganda, $$5.91\\times10^{19}$$ molekul",
        },
      ],
    },
  },
};

export default item;
