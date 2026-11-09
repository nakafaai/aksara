import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "food-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sebagian keluarga penerima juga menanam sayur sendiri.",
        },
        {
          correct: false,
          label:
            "Mahasiswa pendiri bank makanan berasal dari berbagai jurusan.",
        },
        {
          correct: false,
          label: "Harga makanan katering di kota itu naik tahun ini.",
        },
        {
          correct: false,
          label:
            "Banyak usaha katering di kota lain belum mengenal bank makanan.",
        },
        {
          correct: true,
          label:
            "Sejak bank makanan berdiri, makanan yang dibuang oleh sembilan usaha katering itu berkurang hampir separuhnya.",
        },
      ],
    },
  },
};

export default item;
