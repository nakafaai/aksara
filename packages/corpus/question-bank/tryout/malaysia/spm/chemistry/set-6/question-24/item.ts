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
          label: "$$12.0\\%$$, it falls from $$-1$$ to $$-2$$",
        },
        { correct: false, label: "$$6.0\\%$$, it rises from $$-1$$ to $$0$$" },
        { correct: true, label: "$$6.0\\%$$, it falls from $$-1$$ to $$-2$$" },
        { correct: false, label: "$$6.0\\%$$, it stays at $$-2$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12.0\\%$$, ia turun daripada $$-1$$ kepada $$-2$$",
        },
        {
          correct: false,
          label: "$$6.0\\%$$, ia naik daripada $$-1$$ kepada $$0$$",
        },
        {
          correct: true,
          label: "$$6.0\\%$$, ia turun daripada $$-1$$ kepada $$-2$$",
        },
        { correct: false, label: "$$6.0\\%$$, ia kekal pada $$-2$$" },
      ],
    },
  },
};

export default item;
