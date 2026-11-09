import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "rice-field-drama",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pak Karta sudah memutuskan untuk menjual sawah kepada pembeli dari kota.",
        },
        {
          correct: false,
          label: "Pak Karta ingin menghukum kedua anaknya karena bertengkar.",
        },
        {
          correct: false,
          label:
            "Pak Karta hendak menunjukkan batas-batas sawah kepada pembeli.",
        },
        {
          correct: false,
          label: "Pak Karta tidak mendengarkan percakapan kedua anaknya.",
        },
        {
          correct: true,
          label:
            "Pak Karta mulai mempertimbangkan usul Ningsih dan ingin melibatkan kedua anaknya.",
        },
      ],
    },
  },
};

export default item;
