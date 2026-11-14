import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "pesepeda",
  versions: {
    id: {
      columns: ["Dapat disimpulkan", "Tidak dapat disimpulkan"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jumlah perjalanan sepeda di keempat koridor naik $$150\\%$$, lebih tinggi daripada kenaikan perjalanan sepeda di seluruh Kota Sagara pada periode yang sama.",
        },
        {
          column: 1,
          label:
            "Pada 2025, sedikitnya $$48$$ kecelakaan di persimpangan tidak menimbulkan korban luka berat.",
        },
        {
          column: 1,
          label:
            "Risiko kecelakaan dengan korban luka berat per perjalanan pada 2025 kurang dari separuh risiko pada 2024.",
        },
        {
          column: 2,
          label:
            "Pada 2025, risiko kecelakaan per perjalanan di keempat koridor lebih rendah daripada di jalan-jalan Kota Sagara yang tidak diberi pembatas.",
        },
      ],
    },
  },
};

export default item;
