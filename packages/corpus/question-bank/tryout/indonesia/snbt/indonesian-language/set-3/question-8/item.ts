import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Model berguna untuk menjelaskan prinsip, tetapi temuannya tetap perlu dihubungkan dengan keadaan nyata.",
        },
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam model jaring-jaring makanan di kebun sekolah pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang model jaring-jaring makanan di kebun sekolah tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang jaring-jaring makanan cukup untuk membuktikan semua hubungan sebab-akibat.",
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
