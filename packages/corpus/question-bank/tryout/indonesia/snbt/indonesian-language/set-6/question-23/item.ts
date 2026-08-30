import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam program teman belajar pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan terjadi ketika Sari memecah hambatan menjadi tindakan yang dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang program teman belajar tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang penyangga belajar cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
