import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Naskah tertulis yang ditemukan diterbitkan pada 1970-an.",
        },
        {
          correct: false,
          label: "Setiap perubahan dalam adaptasi pasti merusak tradisi.",
        },
        {
          correct: false,
          label:
            "Karena versi berbeda, kelompok tidak perlu menjelaskan sumber atau perubahan apa pun.",
        },
        {
          correct: false,
          label:
            "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program.",
        },
        {
          correct: true,
          label:
            "Adaptasi yang bertanggung jawab dapat mengubah bentuk cerita selama sumber, perubahan, dan keragamannya tetap dapat ditelusuri.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
