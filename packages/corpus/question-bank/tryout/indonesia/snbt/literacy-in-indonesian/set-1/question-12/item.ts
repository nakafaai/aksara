import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "ferry-ticket",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pak Rasyid pernah menolak menstempel karcis seorang penumpang.",
        },
        {
          column: 2,
          label:
            "Pak Rasyid menulis nama Laila dengan tergesa-gesa karena antrean mulai gelisah.",
        },
        {
          column: 1,
          label:
            "Permainan masa kecil Laila menunjukkan bahwa keinginannya pergi ke kota sudah lama ada.",
        },
        {
          column: 2,
          label:
            "Suara KM Cahaya Laut digambarkan serak seperti batuk orang tua.",
        },
      ],
    },
  },
};

export default item;
