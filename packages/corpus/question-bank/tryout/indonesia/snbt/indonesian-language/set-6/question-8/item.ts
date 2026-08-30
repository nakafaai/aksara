import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam model erosi menggunakan baki tanah pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: true,
          label:
            "Model berguna untuk menjelaskan prinsip, tetapi temuannya tetap perlu dihubungkan dengan keadaan nyata.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang model erosi menggunakan baki tanah tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang erosi cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
