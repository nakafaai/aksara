import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "structure",
  },
  stimulus: "rice-field-drama",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Menunjukkan bahwa malam sudah berganti menjadi pagi.",
        },
        {
          correct: true,
          label:
            "Menandai ketegangan setelah jawaban Ningsih membantah anggapan Bayu.",
        },
        {
          correct: false,
          label:
            "Menggambarkan suasana gembira setelah keluarga mencapai kesepakatan.",
        },
        {
          correct: false,
          label: "Menandai pergantian babak dalam pementasan.",
        },
        {
          correct: false,
          label: "Menunjukkan bahwa Bu Karta kembali ke dapur.",
        },
      ],
    },
  },
};

export default item;
