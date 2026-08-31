import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengelola ruang laktasi di pasar menilai penunjuk arah dari tiga pintu pasar melalui masukan pihak terdampak saja, tanpa membandingkan hasil pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola ruang laktasi di pasar menilai penunjuk arah dari tiga pintu pasar melalui data pembanding saja, dengan pengalaman pihak terdampak ditempatkan di luar keputusan.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola ruang laktasi di pasar menilai penunjuk arah dari tiga pintu pasar melalui data dan masukan pihak terdampak, lalu menjadikan uji singkat cukup untuk penerapan tetap.",
        },
        {
          isCorrect: true,
          label:
            "Pengelola ruang laktasi di pasar menilai penunjuk arah dari tiga pintu pasar melalui data pembanding dan masukan pihak terdampak.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola ruang laktasi di pasar menilai penunjuk arah dari tiga pintu pasar terutama melalui definisi istilah, sedangkan perubahan yang diusulkan hanya menjadi latar bacaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
