import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "inference",
  },
  stimulus: "rumpon",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jumlah ekor ikan yang dibawa pulang per melaut oleh perahu di sekitar rumpon rata-rata lebih banyak daripada perahu di perairan lain.",
        },
        {
          column: 2,
          label:
            "Hasil tangkapan seluruh nelayan kabupaten itu naik sejak rumpon dipasang.",
        },
        {
          column: 1,
          label:
            "Hasil tangkapan per melaut di sekitar rumpon lebih dari $$1{,}5$$ kali hasil tangkapan per melaut di perairan lain.",
        },
        {
          column: 2,
          label:
            "Rumpon dipasang agar nelayan dapat menangkap ikan dengan jarak tempuh yang lebih pendek.",
        },
      ],
    },
  },
};

export default item;
