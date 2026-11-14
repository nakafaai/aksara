import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "fansur",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kalimat menjadi menyatakan bahwa keluarga-keluarga di pedalaman hidup makmur berkat perdagangan itu",
        },
        {
          correct: false,
          label:
            "kalimat menjadi menyatakan bahwa keluarga-keluarga di pedalamanlah yang membiayai perdagangan itu",
        },
        {
          correct: false,
          label:
            "kalimat menjadi menyatakan bahwa perdagangan itu membiarkan keluarga-keluarga di pedalaman tetap hidup",
        },
        {
          correct: true,
          label:
            "kalimat menjadi menggambarkan pengumpul dan pemikul sebagai pekerja yang diupah secara berkala oleh pemberi kerja, padahal semula mereka hanya disebut memperoleh nafkah dari perdagangan",
        },
        {
          correct: false,
          label:
            "kalimat menjadi menyatakan bahwa penghasilan keluarga-keluarga itu lebih besar daripada sebelum ada perdagangan",
        },
      ],
    },
  },
};

export default item;
