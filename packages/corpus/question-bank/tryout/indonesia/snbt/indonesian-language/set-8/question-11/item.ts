import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengelola pendataan sumur warga menilai format satuan yang seragam pada lembar pencatatan melalui masukan pihak terdampak saja, tanpa membandingkan hasil pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola pendataan sumur warga menilai format satuan yang seragam pada lembar pencatatan melalui data pembanding saja, dengan pengalaman pihak terdampak ditempatkan di luar keputusan.",
        },
        {
          isCorrect: true,
          label:
            "Pengelola pendataan sumur warga menilai format satuan yang seragam pada lembar pencatatan melalui data pembanding dan masukan pihak terdampak.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola pendataan sumur warga menilai format satuan yang seragam pada lembar pencatatan melalui data dan masukan pihak terdampak, lalu menjadikan uji singkat cukup untuk penerapan tetap.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola pendataan sumur warga menilai format satuan yang seragam pada lembar pencatatan terutama melalui definisi istilah, sedangkan perubahan yang diusulkan hanya menjadi latar bacaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
