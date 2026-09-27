import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Adaptasi yang bertanggung jawab dapat mengubah bentuk cerita selama sumber, perubahan, dan keragamannya tetap dapat ditelusuri.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pemain ingin mempertahankan seluruh dialog lama agar pertunjukan dianggap setia.",
        },
        {
          isCorrect: false,
          label:
            "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program.",
        },
        {
          isCorrect: true,
          label:
            "Tiga rekaman lisan berbeda dalam tokoh, urutan peristiwa, dan akhir.",
        },
        {
          isCorrect: false,
          label: "Setiap perubahan dalam adaptasi pasti merusak tradisi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
