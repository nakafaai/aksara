import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "bus-ridership",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Banyak penumpang naik di semua koridor." },
        {
          column: 1,
          label:
            "Koridor A mengalami kenaikan penumpang dengan persentase terbesar.",
        },
        {
          column: 2,
          label:
            "Penurunan tarif menyebabkan kenaikan penumpang sebesar $$60\\%$$ di Koridor A.",
        },
        {
          column: 1,
          label:
            "Kedua koridor yang frekuensinya tidak berubah mengalami kenaikan dengan persentase yang sama.",
        },
        {
          column: 2,
          label: "Total penumpang bus kota naik lebih dari $$50\\%$$.",
        },
      ],
    },
  },
};

export default item;
