import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Perubahan terjadi ketika Laras memecah hambatan menjadi tindakan yang dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam jalur wisata hutan kota pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang jalur wisata hutan kota tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang kesadaran penuh cukup untuk membuktikan semua hubungan sebab-akibat.",
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
