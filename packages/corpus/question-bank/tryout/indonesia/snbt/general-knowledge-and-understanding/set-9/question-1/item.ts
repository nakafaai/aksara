import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Perubahan cukup besar untuk mengubah keputusan setelah ketidakpastian pengukuran turut dipertimbangkan.",
        },
        {
          correct: false,
          label:
            "Dampaknya cukup besar untuk mengubah hasil utama, bukan sekadar variasi kecil di tepi.",
        },
        {
          correct: false,
          label:
            "Ukuran sampel dan sumber daya ditambah sepadan dengan luas klaim yang hendak dibuat.",
        },
        {
          correct: true,
          label:
            "Unit tambahan terakhir hanya menambah sedikit manfaat pada manfaat yang sudah diperoleh.",
        },
        {
          correct: false,
          label:
            "Tim memperoleh keluaran setara dengan waktu dan energi lebih sedikit tanpa menurunkan mutu.",
        },
      ],
    },
  },
};

export default item;
