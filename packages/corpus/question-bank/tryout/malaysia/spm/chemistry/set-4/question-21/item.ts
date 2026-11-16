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
          correct: true,
          label:
            "In acid it becomes $$\\text{Mn}^{2+}$$, and in neutral solution $$\\text{MnO}_2$$, manganese(IV) oxide",
        },
        {
          correct: false,
          label:
            "In acid it becomes $$\\text{MnO}_2$$, and in neutral solution $$\\text{Mn}^{2+}$$, manganese(II) ions",
        },
        {
          correct: false,
          label:
            "In acid it becomes $$\\text{Mn}^{2+}$$, and in neutral solution $$\\text{MnO}_4^{2-}$$, manganate(VI) ions",
        },
        {
          correct: false,
          label:
            "In acid it becomes $$\\text{Mn}^{3+}$$, and in neutral solution $$\\text{MnO}_2$$, manganese(IV) oxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dalam asid ia menjadi $$\\text{Mn}^{2+}$$, dan dalam larutan neutral $$\\text{MnO}_2$$, mangan(IV) oksida",
        },
        {
          correct: false,
          label:
            "Dalam asid ia menjadi $$\\text{MnO}_2$$, dan dalam larutan neutral $$\\text{Mn}^{2+}$$, ion mangan(II)",
        },
        {
          correct: false,
          label:
            "Dalam asid ia menjadi $$\\text{Mn}^{2+}$$, dan dalam larutan neutral $$\\text{MnO}_4^{2-}$$, ion manganat(VI)",
        },
        {
          correct: false,
          label:
            "Dalam asid ia menjadi $$\\text{Mn}^{3+}$$, dan dalam larutan neutral $$\\text{MnO}_2$$, mangan(IV) oksida",
        },
      ],
    },
  },
};

export default item;
