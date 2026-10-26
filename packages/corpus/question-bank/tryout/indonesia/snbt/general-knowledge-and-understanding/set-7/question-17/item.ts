import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Adaptasi yang bertanggung jawab dapat mengubah bentuk cerita selama sumber, perubahan, dan keragamannya tetap dapat ditelusuri.",
        },
        {
          correct: false,
          label:
            "Sebagian pemain ingin mempertahankan seluruh dialog lama agar pertunjukan dianggap setia.",
        },
        {
          correct: false,
          label:
            "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program.",
        },
        {
          correct: true,
          label:
            "Tiga rekaman lisan berbeda dalam tokoh, urutan peristiwa, dan akhir.",
        },
        {
          correct: false,
          label: "Setiap perubahan dalam adaptasi pasti merusak tradisi.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
