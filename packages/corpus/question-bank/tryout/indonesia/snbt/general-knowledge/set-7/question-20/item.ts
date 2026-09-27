import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Menyebut satu versi sebagai asli dapat menghapus informasi tentang cara cerita hidup di komunitas berbeda.",
        },
        {
          isCorrect: false,
          label: "Naskah tertulis yang ditemukan diterbitkan pada 1970-an.",
        },
        {
          isCorrect: false,
          label:
            "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
