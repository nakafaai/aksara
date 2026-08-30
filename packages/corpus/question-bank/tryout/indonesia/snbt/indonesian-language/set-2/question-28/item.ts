import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Berorganisasi dan menyediakan dapur umum bagi tentara republik",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mengirim bahan baku batik dari Atapupu ke Lasem",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Membangun Museum Nyah Lasem pada masa perang",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Membuka jaringan dagang menuju Mediterania",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menetapkan arsip sebagai Memori Kolektif Bangsa",
            },
          ],
        },
      ],
    },
  },
};

export default item;
