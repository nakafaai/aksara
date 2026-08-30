import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam peredaman bunyi dalam kotak model pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang peredaman bunyi dalam kotak model tidak berguna.",
        },
        {
          isCorrect: true,
          label:
            "Pola awal mendukung pengulangan yang lebih kuat, bukan klaim bahwa hasil itu selalu berlaku.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang atenuasi cukup untuk membuktikan semua hubungan sebab-akibat.",
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
