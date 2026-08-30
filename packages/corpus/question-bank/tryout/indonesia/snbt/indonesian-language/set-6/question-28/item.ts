import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam ruang penyimpanan karya seni pada malam hari pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: true,
          label:
            "kartu kondisi memperoleh makna karena muncul bersama konflik, pilihan, dan perubahan pada akhir cerita.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang ruang penyimpanan karya seni pada malam hari tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang sudut pandang terbatas cukup untuk membuktikan semua hubungan sebab-akibat.",
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
