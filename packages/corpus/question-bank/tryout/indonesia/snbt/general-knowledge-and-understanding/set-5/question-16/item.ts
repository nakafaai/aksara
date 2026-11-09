import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "idiom",
  },
  stimulus: "pinisi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "secara cepat dan mendadak",
        },
        {
          correct: false,
          label: "dari bagian atas ke bagian bawah kapal",
        },
        {
          correct: true,
          label: "dari satu generasi ke generasi berikutnya",
        },
        {
          correct: false,
          label: "sedikit demi sedikit setiap hari",
        },
        {
          correct: false,
          label: "dari satu buku catatan ke buku catatan lainnya",
        },
      ],
    },
  },
};

export default item;
