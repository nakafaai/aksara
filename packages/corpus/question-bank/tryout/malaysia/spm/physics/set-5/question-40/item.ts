import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$38\\text{ mW}$$, and $$10\\text{ mA}$$" },
        { correct: false, label: "$$9.6\\text{ mW}$$, and $$5.0\\text{ mA}$$" },
        {
          correct: false,
          label: "$$2.4\\text{ mW}$$, and $$0.63\\text{ mA}$$",
        },
        { correct: true, label: "$$9.6\\text{ mW}$$, and $$2.5\\text{ mA}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$38\\text{ mW}$$, dan $$10\\text{ mA}$$" },
        { correct: false, label: "$$9.6\\text{ mW}$$, dan $$5.0\\text{ mA}$$" },
        {
          correct: false,
          label: "$$2.4\\text{ mW}$$, dan $$0.63\\text{ mA}$$",
        },
        { correct: true, label: "$$9.6\\text{ mW}$$, dan $$2.5\\text{ mA}$$" },
      ],
    },
  },
};

export default item;
