import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengelola pengiriman buku antarpulau menilai label tujuan berukuran besar pada setiap kotak melalui masukan pihak terdampak saja, tanpa membandingkan hasil pengukuran.",
        },
        {
          correct: false,
          label:
            "Pengelola pengiriman buku antarpulau menilai label tujuan berukuran besar pada setiap kotak melalui data pembanding saja, dengan pengalaman pihak terdampak ditempatkan di luar keputusan.",
        },
        {
          correct: false,
          label:
            "Pengelola pengiriman buku antarpulau menilai label tujuan berukuran besar pada setiap kotak melalui data dan masukan pihak terdampak, lalu menjadikan uji singkat cukup untuk penerapan tetap.",
        },
        {
          correct: true,
          label:
            "Pengelola menilai label tujuan besar melalui data pembanding dan masukan pihak terdampak, lalu melanjutkan uji secara terbatas karena pengaruh cuaca belum diperiksa.",
        },
        {
          correct: false,
          label:
            "Pengelola pengiriman buku antarpulau menilai label tujuan berukuran besar pada setiap kotak terutama melalui definisi istilah, sedangkan perubahan yang diusulkan hanya menjadi latar bacaan.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
