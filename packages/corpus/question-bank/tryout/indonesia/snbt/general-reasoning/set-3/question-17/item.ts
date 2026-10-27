import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Di banyak kawasan perkantoran, selisih sewa kos dekat tempat kerja lebih besar daripada tambahan ongkos transportasi dari kos yang lebih jauh, sehingga biaya bulanan total kos jauh justru lebih rendah.",
        },
        {
          correct: false,
          label:
            "Banyak pekerja muda memilih kos dekat tempat kerja meskipun sewanya sedikit lebih tinggi.",
        },
        {
          correct: false,
          label:
            "Sewa murah dan perjalanan singkat membuat kamar kos lebih menarik bagi calon penghuni.",
        },
        {
          correct: false,
          label:
            "Pekerja muda membandingkan biaya sewa dan transportasi saat menghitung biaya bulanan total.",
        },
        {
          correct: false,
          label:
            "Rute yang lebih pendek mengurangi jarak tempuh antara kos dan tempat kerja.",
        },
      ],
    },
  },
};

export default item;
