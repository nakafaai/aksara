import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ukuran sampel dan sumber daya ditambah sepadan dengan luas klaim yang hendak dibuat.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
        {
          correct: true,
          label:
            "Tim memperoleh keluaran setara dengan waktu dan energi lebih sedikit tanpa menurunkan mutu.",
        },
        {
          correct: false,
          label:
            "Prosedur lapangan disesuaikan saat cuaca berubah tanpa mengubah tujuan dan aturan ukur utama.",
        },
        {
          correct: false,
          label:
            "Dampaknya cukup besar untuk mengubah hasil utama, bukan sekadar variasi kecil di tepi.",
        },
      ],
    },
  },
};

export default item;
