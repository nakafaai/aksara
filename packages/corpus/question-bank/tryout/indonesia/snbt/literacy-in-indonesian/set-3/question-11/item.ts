import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengelola layanan perpustakaan keliling menilai ringkasan jadwal yang ditempel pada setiap titik pemberhentian melalui masukan pihak terdampak saja, tanpa membandingkan hasil pengukuran.",
        },
        {
          correct: false,
          label:
            "Pengelola layanan perpustakaan keliling menilai ringkasan jadwal yang ditempel pada setiap titik pemberhentian melalui data pembanding saja, dengan pengalaman pihak terdampak ditempatkan di luar keputusan.",
        },
        {
          correct: true,
          label:
            "Pengelola layanan perpustakaan keliling menilai ringkasan jadwal yang ditempel pada setiap titik pemberhentian melalui data pembanding dan masukan pihak terdampak.",
        },
        {
          correct: false,
          label:
            "Pengelola layanan perpustakaan keliling menilai ringkasan jadwal yang ditempel pada setiap titik pemberhentian melalui data dan masukan pihak terdampak, lalu menjadikan uji singkat cukup untuk penerapan tetap.",
        },
        {
          correct: false,
          label:
            "Pengelola layanan perpustakaan keliling menilai ringkasan jadwal yang ditempel pada setiap titik pemberhentian terutama melalui definisi istilah, sedangkan perubahan yang diusulkan hanya menjadi latar bacaan.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
