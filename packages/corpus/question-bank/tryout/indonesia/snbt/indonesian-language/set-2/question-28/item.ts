import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Berorganisasi dan menyediakan dapur umum bagi tentara republik",
        },
        {
          isCorrect: false,
          label: "Mengirim bahan baku batik dari Atapupu ke Lasem",
        },
        {
          isCorrect: false,
          label: "Membangun Museum Nyah Lasem pada masa perang",
        },
        {
          isCorrect: false,
          label: "Membuka jaringan dagang menuju Mediterania",
        },
        {
          isCorrect: false,
          label: "Menetapkan arsip sebagai Memori Kolektif Bangsa",
        },
      ],
    },
  },
};

export default item;
