import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{AlSO}_4$$, with 26.0% sulfur by mass" },
        { correct: true, label: "$$\\text{Al}_2(\\text{SO}_4)_3$$, with 28.1% sulfur by mass, and each formula unit gives 5 ions in water" },
        { correct: false, label: "$$\\text{Al}_2(\\text{SO}_4)_3$$, with 9.4% sulfur by mass" },
        { correct: false, label: "$$\\text{Al}_3(\\text{SO}_4)_2$$, with 23.4% sulfur by mass" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{AlSO}_4$$, dengan 26.0% sulfur mengikut jisim" },
        { correct: true, label: "$$\\text{Al}_2(\\text{SO}_4)_3$$, dengan 28.1% sulfur mengikut jisim, dan setiap unit formula menghasilkan 5 ion dalam air" },
        { correct: false, label: "$$\\text{Al}_2(\\text{SO}_4)_3$$, dengan 9.4% sulfur mengikut jisim" },
        { correct: false, label: "$$\\text{Al}_3(\\text{SO}_4)_2$$, dengan 23.4% sulfur mengikut jisim" },
      ],
    },
  },
};

export default item;
