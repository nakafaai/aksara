import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "sriwijaya-stones",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Prasasti Kedukan Bukit lebih tua daripada Prasasti Kota Kapur.",
        },
        {
          column: 2,
          label:
            "I-Tsing menganjurkan biksu Tiongkok langsung belajar ke India tanpa singgah di Sriwijaya.",
        },
        {
          column: 1,
          label: "Para ahli belum sepakat tentang letak pusat Sriwijaya.",
        },
        {
          column: 2,
          label:
            "Prasasti-prasasti Sriwijaya ditulis dalam bahasa Sanskerta dengan aksara Latin.",
        },
      ],
    },
  },
};

export default item;
