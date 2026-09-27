import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Semua laporan yang tidak anonim telah diverifikasi.",
        },
        {
          isCorrect: false,
          label: "Sebagian laporan anonim telah diverifikasi.",
        },
        {
          isCorrect: false,
          label: "Tidak ada laporan distrik yang anonim.",
        },
        {
          isCorrect: false,
          label: "Setiap laporan yang diarsipkan telah diverifikasi.",
        },
        {
          isCorrect: true,
          label:
            "Sebagian laporan distrik diarsipkan dan bukan laporan anonim.",
        },
      ],
    },
  },
};

export default item;
