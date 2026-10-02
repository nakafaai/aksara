import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan cukup besar untuk mengubah keputusan setelah ketidakpastian pengukuran turut dipertimbangkan.",
        },
        {
          isCorrect: false,
          label:
            "Dampaknya cukup besar untuk mengubah hasil utama, bukan sekadar variasi kecil di tepi.",
        },
        {
          isCorrect: false,
          label:
            "Ukuran sampel dan sumber daya ditambah sepadan dengan luas klaim yang hendak dibuat.",
        },
        {
          isCorrect: true,
          label:
            "Unit tambahan terakhir hanya menambah sedikit manfaat pada manfaat yang sudah diperoleh.",
        },
        {
          isCorrect: false,
          label:
            "Tim memperoleh keluaran setara dengan waktu dan energi lebih sedikit tanpa menurunkan mutu.",
        },
      ],
    },
  },
};

export default item;
