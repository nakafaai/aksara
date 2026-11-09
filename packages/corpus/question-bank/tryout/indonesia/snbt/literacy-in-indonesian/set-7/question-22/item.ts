import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "borrowed-words",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bahasa Indonesia sebaiknya menolak kata pinjaman dari bahasa Inggris.",
        },
        {
          correct: false,
          label:
            "Sebagian besar kosakata bahasa Indonesia berasal dari bahasa Sanskerta.",
        },
        {
          correct: false,
          label:
            "Lembaga bahasa pemerintah berhasil membuat semua padanan menjadi populer.",
        },
        {
          correct: false,
          label:
            "Kata pinjaman dari bahasa Belanda lebih banyak daripada dari Portugis.",
        },
        {
          correct: true,
          label:
            "Kata pinjaman mencerminkan sejarah dan terus disesuaikan oleh penuturnya.",
        },
      ],
    },
  },
};

export default item;
