import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena 29 lebih tinggi daripada 19 dan 21, tim langsung mengganti seluruh laporan bebas dengan formulir pilihan.",
        },
        {
          correct: true,
          label:
            "Tim membandingkan rata-rata 29, 19, dan 21, belum membenarkan penggantian seluruh kolom bebas, serta merencanakan uji lebih panjang atas pilihan lokasi tambahan dengan ukuran pencocokan pada hari yang sama.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan 29, 19, dan 21 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          correct: false,
          label:
            "Tim mempertahankan laporan bebas dan merencanakan uji lanjutan tanpa menyebut perbandingan hasil.",
        },
        {
          correct: false,
          label:
            "Nilai 29, 19, dan 21 tidak menunjukkan pola yang relevan sehingga tim akan mengubah ukuran pencocokan.",
        },
      ],
    },
  },
};

export default item;
