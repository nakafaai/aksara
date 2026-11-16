import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$3.84\\text{ g}$$, the major product" },
        { correct: false, label: "$$0.96\\text{ g}$$, the minor product" },
        { correct: false, label: "$$5.04\\text{ g}$$, the major product" },
        { correct: false, label: "$$4.80\\text{ g}$$, the only product" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$3.84\\text{ g}$$, hasil utama" },
        { correct: false, label: "$$0.96\\text{ g}$$, hasil sampingan" },
        { correct: false, label: "$$5.04\\text{ g}$$, hasil utama" },
        { correct: false, label: "$$4.80\\text{ g}$$, satu-satunya hasil" },
      ],
    },
  },
};

export default item;
