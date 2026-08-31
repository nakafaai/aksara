import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengelola layanan perpustakaan keliling menilai jadwal singkat yang ditempel pada setiap titik pemberhentian melalui masukan pihak terdampak saja, tanpa membandingkan hasil pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola layanan perpustakaan keliling menilai jadwal singkat yang ditempel pada setiap titik pemberhentian melalui data pembanding saja, dengan pengalaman pihak terdampak ditempatkan di luar keputusan.",
        },
        {
          isCorrect: true,
          label:
            "Pengelola layanan perpustakaan keliling menilai jadwal singkat yang ditempel pada setiap titik pemberhentian melalui data pembanding dan masukan pihak terdampak.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola layanan perpustakaan keliling menilai jadwal singkat yang ditempel pada setiap titik pemberhentian melalui data dan masukan pihak terdampak, lalu menjadikan uji singkat cukup untuk penerapan tetap.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola layanan perpustakaan keliling menilai jadwal singkat yang ditempel pada setiap titik pemberhentian terutama melalui definisi istilah, sedangkan perubahan yang diusulkan hanya menjadi latar bacaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
