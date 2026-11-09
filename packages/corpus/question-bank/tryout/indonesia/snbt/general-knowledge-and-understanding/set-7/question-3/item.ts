import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "angklung",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Angklung bertangga nada diatonis sudah ada sebelum tahun 1938.",
        },
        {
          column: 1,
          label: "Kini angklung dimainkan juga di luar upacara adat.",
        },
        {
          column: 2,
          label: "Satu tabung bambu sudah cukup untuk membuat sebuah angklung.",
        },
        {
          column: 1,
          label:
            "Keterlambatan seorang pemain dapat merusak lagu yang dimainkan bersama.",
        },
      ],
    },
  },
};

export default item;
