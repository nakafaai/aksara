import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mengirim bahan baku batik dari Atapupu ke Lasem",
        },
        {
          correct: false,
          label: "Membangun Museum Nyah Lasem pada masa perang",
        },
        {
          correct: false,
          label: "Membuka jaringan dagang menuju Mediterania",
        },
        {
          correct: false,
          label: "Menetapkan arsip sebagai Memori Kolektif Bangsa",
        },
        {
          correct: true,
          label:
            "Berorganisasi dan menyediakan dapur umum bagi tentara republik",
        },
      ],
    },
  },
};

export default item;
