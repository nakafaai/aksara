import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  stimulus: "seminar",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Bayu tampil pada giliran $$6$$.",
        },
        {
          column: 2,
          label: "Galih tampil pada giliran bernomor genap.",
        },
        {
          column: 2,
          label: "Eka tampil tepat setelah Fani.",
        },
        {
          column: 1,
          label:
            "Jika Hesti tampil pada giliran $$1$$, Eka tampil pada giliran $$4$$.",
        },
      ],
    },
  },
};

export default item;
