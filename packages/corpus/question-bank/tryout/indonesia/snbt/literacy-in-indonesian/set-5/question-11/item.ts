import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengelola pengiriman buku antarpulau menilai label tujuan berukuran besar pada setiap kotak melalui masukan pihak terdampak saja, tanpa membandingkan hasil pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola pengiriman buku antarpulau menilai label tujuan berukuran besar pada setiap kotak melalui data pembanding saja, dengan pengalaman pihak terdampak ditempatkan di luar keputusan.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola pengiriman buku antarpulau menilai label tujuan berukuran besar pada setiap kotak melalui data dan masukan pihak terdampak, lalu menjadikan uji singkat cukup untuk penerapan tetap.",
        },
        {
          isCorrect: true,
          label:
            "Pengelola menilai label tujuan besar melalui data pembanding dan masukan pihak terdampak, lalu melanjutkan uji secara terbatas karena pengaruh cuaca belum diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola pengiriman buku antarpulau menilai label tujuan berukuran besar pada setiap kotak terutama melalui definisi istilah, sedangkan perubahan yang diusulkan hanya menjadi latar bacaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
