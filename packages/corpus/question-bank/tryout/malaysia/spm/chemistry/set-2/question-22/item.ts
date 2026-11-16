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
          label: "I and III. Mn changes by $$5$$, and each Cr changes by $$3$$",
        },
        {
          correct: false,
          label: "I and III. Mn changes by $$5$$, and each Cr changes by $$6$$",
        },
        {
          correct: false,
          label:
            "I, II and III. Mn changes by $$5$$, Fe in II by $$2$$, and each Cr by $$3$$",
        },
        { correct: false, label: "II only. Fe changes by $$2$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "I dan III. Mn berubah sebanyak $$5$$, dan setiap Cr berubah sebanyak $$3$$",
        },
        {
          correct: false,
          label:
            "I dan III. Mn berubah sebanyak $$5$$, dan setiap Cr berubah sebanyak $$6$$",
        },
        {
          correct: false,
          label:
            "I, II dan III. Mn berubah sebanyak $$5$$, Fe dalam II sebanyak $$2$$, dan setiap Cr sebanyak $$3$$",
        },
        { correct: false, label: "II sahaja. Fe berubah sebanyak $$2$$" },
      ],
    },
  },
};

export default item;
