import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "M-17 pasti digunakan pada $$1998$$, $$2007$$, dan $$2019$$ karena ciri visual pada foto tidak mungkin dibuat ulang pada mantel lain.",
        },
        {
          correct: false,
          label:
            "M-17 tidak pernah dipentaskan karena buku perawatan hanya mencatat perbaikan dan peminjaman, bukan penggunaan panggung.",
        },
        {
          correct: false,
          label:
            "Foto $$2019$$ pasti memperlihatkan mantel pengganti karena buku perawatan berhenti mencatat setelah $$2010$$.",
        },
        {
          correct: false,
          label:
            "Hilangnya halaman $$2003$$ sampai $$2005$$ membatalkan seluruh catatan M-17, termasuk entri yang masih tersedia.",
        },
        {
          correct: true,
          label:
            "Sumber mendukung keberadaan mantel berciri serupa dan riwayat perawatan M-17 pada sebagian periode, tetapi identitas benda dalam foto $$2019$$ masih belum pasti.",
        },
      ],
    },
  },
};

export default item;
