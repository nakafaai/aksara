import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "grain-barn",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sebagian petani menyimpan gabah di rumah masing-masing.",
        },
        {
          correct: false,
          label: "Harga gabah setelah panen biasanya lebih rendah daripada sebelum panen.",
        },
        {
          correct: false,
          label: "Pembangunan lumbung baru memerlukan biaya yang besar.",
        },
        {
          correct: true,
          label: "Desa yang masih mengelola lumbung bersama lebih jarang kekurangan beras saat panen gagal.",
        },
        {
          correct: false,
          label: "Banyak warga desa kini bekerja di luar sektor pertanian.",
        },
      ],
    },
  },
};

export default item;
