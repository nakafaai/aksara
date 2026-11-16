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
        { correct: false, label: "Magnesium oxide is held by covalent bonds, which are stronger than ionic bonds" },
        { correct: true, label: "The ions in magnesium oxide carry larger charges, so the electrostatic forces between them are stronger" },
        { correct: false, label: "Magnesium oxide has more delocalised electrons between its ions" },
        { correct: false, label: "Magnesium is more reactive than sodium, so its compound is more stable" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Magnesium oksida diikat oleh ikatan kovalen yang lebih kuat daripada ikatan ion" },
        { correct: true, label: "Ion dalam magnesium oksida membawa cas yang lebih besar, jadi daya elektrostatik antara ion lebih kuat" },
        { correct: false, label: "Magnesium oksida mempunyai lebih banyak elektron yang dinyahsetempat antara ionnya" },
        { correct: false, label: "Magnesium lebih reaktif daripada natrium, jadi sebatiannya lebih stabil" },
      ],
    },
  },
};

export default item;
