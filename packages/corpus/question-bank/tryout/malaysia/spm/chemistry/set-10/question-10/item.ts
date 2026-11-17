import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Aluminium, Period $$3$$, Group $$13$$, $$1.44\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "Aluminium, Period $$3$$, Group $$3$$, $$1.44\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "Aluminium, Period $$3$$, Group $$13$$, $$0.960\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "Aluminium, Period $$3$$, Group $$13$$, $$2.88\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Aluminium, Kala $$3$$, Kumpulan $$13$$, $$1.44\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "Aluminium, Kala $$3$$, Kumpulan $$3$$, $$1.44\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "Aluminium, Kala $$3$$, Kumpulan $$13$$, $$0.960\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "Aluminium, Kala $$3$$, Kumpulan $$13$$, $$2.88\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
