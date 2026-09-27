import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 29 lebih tinggi daripada 19 dan 21, tim langsung mengganti seluruh laporan bebas dengan formulir pilihan.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan rata-rata 29, 19, dan 21, belum membenarkan penggantian seluruh kolom bebas, serta merencanakan uji lebih panjang atas pilihan lokasi tambahan dengan ukuran pencocokan pada hari yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 29, 19, dan 21 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          isCorrect: false,
          label:
            "Tim mempertahankan laporan bebas dan merencanakan uji lanjutan tanpa menyebut perbandingan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 29, 19, dan 21 tidak menunjukkan pola yang relevan sehingga tim akan mengubah ukuran pencocokan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
