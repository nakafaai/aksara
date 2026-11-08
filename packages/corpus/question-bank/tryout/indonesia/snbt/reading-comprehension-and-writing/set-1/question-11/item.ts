import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "grain-barn",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Petani lebih suka langsung menjual seluruh hasil panennya.",
        },
        {
          correct: true,
          label: "Pemerintah desa perlu menghidupkan kembali lumbung padi bersama.",
        },
        {
          correct: false,
          label: "Harga beras sering melonjak pada musim paceklik.",
        },
        {
          correct: false,
          label: "Gabah yang disimpan di lumbung mudah berjamur.",
        },
        {
          correct: false,
          label: "Laporan pengelolaan lumbung harus dibacakan setiap panen.",
        },
      ],
    },
  },
};

export default item;
