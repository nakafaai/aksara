import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
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
          correct: true,
          label:
            "Menyebut satu versi sebagai asli dapat menghapus informasi tentang cara cerita hidup di komunitas berbeda.",
        },
        {
          correct: false,
          label: "Naskah tertulis yang ditemukan diterbitkan pada 1970-an.",
        },
        {
          correct: false,
          label:
            "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program.",
        },
      ],
    },
  },
};

export default item;
