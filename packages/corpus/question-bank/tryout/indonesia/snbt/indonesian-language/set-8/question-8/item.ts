import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam kotak perbandingan perpindahan panas pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang kotak perbandingan perpindahan panas tidak berguna.",
        },
        {
          isCorrect: true,
          label:
            "Model berguna untuk menjelaskan prinsip, tetapi temuannya tetap perlu dihubungkan dengan keadaan nyata.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang konduksi cukup untuk membuktikan semua hubungan sebab-akibat.",
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
