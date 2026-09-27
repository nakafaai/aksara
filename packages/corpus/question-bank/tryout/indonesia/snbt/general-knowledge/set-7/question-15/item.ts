import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Naskah tertulis yang ditemukan diterbitkan pada 1970-an.",
        },
        {
          isCorrect: false,
          label: "Setiap perubahan dalam adaptasi pasti merusak tradisi.",
        },
        {
          isCorrect: false,
          label:
            "Karena versi berbeda, kelompok tidak perlu menjelaskan sumber atau perubahan apa pun.",
        },
        {
          isCorrect: false,
          label:
            "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program.",
        },
        {
          isCorrect: true,
          label:
            "Adaptasi yang bertanggung jawab dapat mengubah bentuk cerita selama sumber, perubahan, dan keragamannya tetap dapat ditelusuri.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
