import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Alat merekam perubahan kecil, tetapi perubahan itu tetap berada dalam rentang ketidakpastian pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Unit tambahan terakhir hanya memberi kenaikan manfaat yang kecil dibanding unit sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan cukup besar untuk mengubah keputusan setelah ketidakpastian pengukuran turut dipertimbangkan.",
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
