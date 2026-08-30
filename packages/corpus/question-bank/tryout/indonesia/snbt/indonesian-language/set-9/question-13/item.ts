import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Keputusan lanjutan sebaiknya mempertimbangkan data, pengalaman pihak terdampak, dan keterbatasan uji.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang aksesibilitas cukup untuk membuktikan semua hubungan sebab-akibat.",
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
