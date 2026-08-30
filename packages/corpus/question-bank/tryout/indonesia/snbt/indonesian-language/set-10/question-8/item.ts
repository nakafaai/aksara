import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam kolom infiltrasi dari tiga jenis tanah pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang kolom infiltrasi dari tiga jenis tanah tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang infiltrasi cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
        {
          isCorrect: true,
          label:
            "Model berguna untuk menjelaskan prinsip, tetapi temuannya tetap perlu dihubungkan dengan keadaan nyata.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
