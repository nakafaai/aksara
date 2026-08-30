import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam taman bermain inklusif pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang taman bermain inklusif tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang desain inklusif cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: true,
          label:
            "Keputusan lanjutan sebaiknya mempertimbangkan data, pengalaman pihak terdampak, dan keterbatasan uji.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
