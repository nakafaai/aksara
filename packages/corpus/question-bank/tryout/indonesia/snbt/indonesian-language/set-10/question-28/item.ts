import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam kampung pada malam hujan pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang kampung pada malam hujan tidak berguna.",
        },
        {
          isCorrect: true,
          label:
            "peta lampu jalan memperoleh makna karena muncul bersama konflik, pilihan, dan perubahan pada akhir cerita.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang akhir terbuka cukup untuk membuktikan semua hubungan sebab-akibat.",
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
