import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengelola antrean pemeriksaan kesehatan menilai nomor tahap yang ditandai pada lantai melalui masukan pihak terdampak saja, tanpa membandingkan hasil pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola antrean pemeriksaan kesehatan menilai nomor tahap yang ditandai pada lantai melalui data pembanding saja, dengan pengalaman pihak terdampak ditempatkan di luar keputusan.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola antrean pemeriksaan kesehatan menilai nomor tahap yang ditandai pada lantai melalui data dan masukan pihak terdampak, lalu menjadikan uji singkat cukup untuk penerapan tetap.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola antrean pemeriksaan kesehatan menilai nomor tahap yang ditandai pada lantai terutama melalui definisi istilah, sedangkan perubahan yang diusulkan hanya menjadi latar bacaan.",
        },
        {
          isCorrect: true,
          label:
            "Pengelola antrean pemeriksaan kesehatan menilai nomor tahap yang ditandai pada lantai melalui data pembanding dan masukan pihak terdampak.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
