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
          label: "Aluminium, Period $$3$$, Group $$13$$, $$3.84\\text{ g}$$",
        },
        {
          correct: false,
          label: "Aluminium, Period $$3$$, Group $$3$$, $$3.84\\text{ g}$$",
        },
        {
          correct: false,
          label: "Aluminium, Period $$3$$, Group $$13$$, $$2.56\\text{ g}$$",
        },
        {
          correct: false,
          label: "Aluminium, Period $$3$$, Group $$13$$, $$7.68\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Aluminium, Kala $$3$$, Kumpulan $$13$$, $$3.84\\text{ g}$$",
        },
        {
          correct: false,
          label: "Aluminium, Kala $$3$$, Kumpulan $$3$$, $$3.84\\text{ g}$$",
        },
        {
          correct: false,
          label: "Aluminium, Kala $$3$$, Kumpulan $$13$$, $$2.56\\text{ g}$$",
        },
        {
          correct: false,
          label: "Aluminium, Kala $$3$$, Kumpulan $$13$$, $$7.68\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
