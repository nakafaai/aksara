import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "kartu pertanyaan memperoleh makna karena muncul bersama konflik, pilihan, dan perubahan pada akhir cerita.",
        },
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam pameran sains keliling pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang pameran sains keliling tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang atmosfer cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyarankan agar pembaca mengabaikan bukti yang tidak sesuai dengan dugaan awal.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
