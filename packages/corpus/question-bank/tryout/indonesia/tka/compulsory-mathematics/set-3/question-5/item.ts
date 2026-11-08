import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Perahu dapat mengangkut $$12$$ karung beras dan $$14$$ karung gula sekaligus.",
        },
        {
          column: 2,
          label: "Jika perahu hanya mengangkut karung beras, paling banyak $$23$$ karung dapat diangkut sekaligus.",
        },
        {
          column: 1,
          label: "Jika perahu mengangkut tepat $$28$$ karung, paling banyak $$10$$ di antaranya karung beras.",
        },
        {
          column: 2,
          label: "Berat seluruh karung dalam satu kali angkut dapat mencapai tepat $$1{.}136\\text{ kg}$$.",
        },
      ],
    },
  },
};

export default item;
