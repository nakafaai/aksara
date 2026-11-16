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
        { correct: false, label: "X is $$\\\\text{C}_4\\\\text{H}_8$$, and 2.4 dm³ of it forms" },
        { correct: false, label: "X is $$\\\\text{C}_2\\\\text{H}_4$$, and 2.4 dm³ of it forms" },
        { correct: false, label: "X is $$\\\\text{C}_2\\\\text{H}_6$$, and 4.8 dm³ of it forms" },
        { correct: true, label: "X is ethene, and 4.8 dm³ of it forms" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "X ialah $$\\\\text{C}_4\\\\text{H}_8$$, dan 2.4 dm³ daripadanya terbentuk" },
        { correct: false, label: "X ialah $$\\\\text{C}_2\\\\text{H}_4$$, dan 2.4 dm³ daripadanya terbentuk" },
        { correct: false, label: "X ialah $$\\\\text{C}_2\\\\text{H}_6$$, dan 4.8 dm³ daripadanya terbentuk" },
        { correct: true, label: "X ialah etena, dan 4.8 dm³ daripadanya terbentuk" },
      ],
    },
  },
};

export default item;
