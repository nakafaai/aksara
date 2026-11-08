import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "inference",
  },
  stimulus: "sepeda",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Jumlah pesepeda di kedua jalan bersama-sama naik 120 orang.",
        },
        {
          column: 2,
          label:
            "Jumlah pesepeda di Jalan Cempaka naik setelah jalur dibangun.",
        },
        {
          column: 2,
          label:
            "Jumlah pesepeda di Jalan Merdeka naik lebih dari tiga kali lipat.",
        },
        {
          column: 1,
          label: "Jumlah pesepeda di Jalan Cempaka turun 40%.",
        },
      ],
    },
  },
};

export default item;
