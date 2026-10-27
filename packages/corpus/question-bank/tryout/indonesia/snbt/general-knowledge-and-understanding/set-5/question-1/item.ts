import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Alat merekam perubahan kecil, tetapi perubahan itu tetap berada dalam rentang ketidakpastian pengukuran.",
        },
        {
          correct: false,
          label:
            "Unit tambahan terakhir hanya memberi kenaikan manfaat yang kecil dibanding unit sebelumnya.",
        },
        {
          correct: true,
          label:
            "Perubahan cukup besar untuk mengubah keputusan setelah ketidakpastian pengukuran turut dipertimbangkan.",
        },
        {
          correct: false,
          label:
            "Ukuran sampel dan sumber daya ditambah sepadan dengan luas klaim yang hendak dibuat.",
        },
        {
          correct: false,
          label:
            "Satu asumsi dasar diperiksa lebih dahulu karena seluruh simpulan berikutnya bergantung padanya.",
        },
      ],
    },
  },
};

export default item;
