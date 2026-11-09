import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "gut-bacteria",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Perhitungan pada 2016 menunjukkan jumlah sel bakteri kira-kira sebanding dengan jumlah sel manusia.",
        },
        {
          column: 1,
          label:
            "Butirat menjadi sumber energi utama bagi sel-sel dinding usus besar.",
        },
        {
          column: 2,
          label: "Antibiotik hanya membunuh bakteri yang menyebabkan penyakit.",
        },
        {
          column: 2,
          label:
            "Pemindahan bakteri usus sudah terbukti mengobati obesitas pada manusia.",
        },
      ],
    },
  },
};

export default item;
