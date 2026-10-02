import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Ukuran sampel dan sumber daya ditambah sepadan dengan luas klaim yang hendak dibuat.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Tim memperoleh keluaran setara dengan waktu dan energi lebih sedikit tanpa menurunkan mutu.",
        },
        {
          isCorrect: false,
          label:
            "Prosedur lapangan disesuaikan saat cuaca berubah tanpa mengubah tujuan dan aturan ukur utama.",
        },
        {
          isCorrect: false,
          label:
            "Dampaknya cukup besar untuk mengubah hasil utama, bukan sekadar variasi kecil di tepi.",
        },
      ],
    },
  },
};

export default item;
