import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cellular-respiration",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.30$$, so protein is the main respiratory substrate" },
        { correct: true, label: "$$0.70$$, so lipid is the main respiratory substrate" },
        { correct: false, label: "$$1.00$$, so carbohydrate is the main respiratory substrate" },
        { correct: false, label: "$$1.43$$, so part of the respiration is anaerobic" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.30$$, jadi protein ialah substrat respirasi utama" },
        { correct: true, label: "$$0.70$$, jadi lipid ialah substrat respirasi utama" },
        { correct: false, label: "$$1.00$$, jadi karbohidrat ialah substrat respirasi utama" },
        { correct: false, label: "$$1.43$$, jadi sebahagian respirasi berlaku secara anaerob" },
      ],
    },
  },
};

export default item;
