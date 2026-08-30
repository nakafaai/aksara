import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam ruang laktasi di pasar pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang ruang laktasi di pasar tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang pemangku kepentingan cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
        {
          isCorrect: true,
          label:
            "Keputusan lanjutan sebaiknya mempertimbangkan data, pengalaman pihak terdampak, dan keterbatasan uji.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
