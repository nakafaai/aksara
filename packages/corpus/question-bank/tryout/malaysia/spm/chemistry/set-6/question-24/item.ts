import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20.0\\%$$, it falls from $$-1$$ to $$-2$$",
        },
        { correct: false, label: "$$10.0\\%$$, it rises from $$-1$$ to $$0$$" },
        { correct: true, label: "$$10.0\\%$$, it falls from $$-1$$ to $$-2$$" },
        {
          correct: false,
          label: "$$1.00\\%$$, it falls from $$-1$$ to $$-2$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20.0\\%$$, ia turun daripada $$-1$$ kepada $$-2$$",
        },
        {
          correct: false,
          label: "$$10.0\\%$$, ia naik daripada $$-1$$ kepada $$0$$",
        },
        {
          correct: true,
          label: "$$10.0\\%$$, ia turun daripada $$-1$$ kepada $$-2$$",
        },
        {
          correct: false,
          label: "$$1.00\\%$$, ia turun daripada $$-1$$ kepada $$-2$$",
        },
      ],
    },
  },
};

export default item;
