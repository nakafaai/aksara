import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perbedaan terdeteksi secara statistik, tetapi terlalu kecil untuk mengubah hasil utama.",
        },
        {
          isCorrect: false,
          label:
            "Unit tambahan terakhir hanya memberi kenaikan manfaat yang kecil dibanding unit sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Dampaknya cukup besar untuk mengubah hasil utama, bukan sekadar variasi kecil di tepi.",
        },
        {
          isCorrect: false,
          label:
            "Ukuran sampel dan sumber daya ditambah sepadan dengan luas klaim yang hendak dibuat.",
        },
        {
          isCorrect: false,
          label:
            "Satu asumsi dasar diperiksa lebih dahulu karena seluruh simpulan berikutnya bergantung padanya.",
        },
      ],
    },
  },
};

export default item;
