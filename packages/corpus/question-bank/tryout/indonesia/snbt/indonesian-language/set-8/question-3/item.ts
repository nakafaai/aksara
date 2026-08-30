import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pola awal mendukung pengulangan yang lebih kuat, bukan klaim bahwa hasil itu selalu berlaku.",
        },
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam kehilangan massa pada daun pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang kehilangan massa pada daun tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang transpirasi cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
