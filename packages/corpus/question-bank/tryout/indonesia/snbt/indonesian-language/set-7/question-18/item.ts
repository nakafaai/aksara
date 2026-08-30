import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam pameran sains keliling pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: true,
          label:
            "Perbedaan antarsumber dapat memperkaya penafsiran jika asal dan tujuan setiap sumber diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang pameran sains keliling tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang representasi cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
