import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Di banyak kawasan perkantoran, selisih sewa kos dekat tempat kerja lebih besar daripada tambahan ongkos transportasi dari kos yang lebih jauh, sehingga biaya bulanan total kos jauh justru lebih rendah.",
        },
        {
          isCorrect: false,
          label:
            "Banyak pekerja muda memilih kos dekat tempat kerja meskipun sewanya sedikit lebih tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Sewa murah dan perjalanan singkat membuat kamar kos lebih menarik bagi calon penghuni.",
        },
        {
          isCorrect: false,
          label:
            "Pekerja muda membandingkan biaya sewa dan transportasi saat menghitung biaya bulanan total.",
        },
        {
          isCorrect: false,
          label:
            "Rute yang lebih pendek mengurangi jarak tempuh antara kos dan tempat kerja.",
        },
      ],
    },
  },
};

export default item;
