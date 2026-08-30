import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setiap hasil dalam kelas reparasi pakaian pasti berlaku tanpa batas pada tempat lain.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bacaan membuat seluruh informasi tentang kelas reparasi pakaian tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Satu rincian tentang konflik cukup untuk membuktikan semua hubungan sebab-akibat.",
        },
        {
          isCorrect: true,
          label:
            "benang merah memperoleh makna karena muncul bersama konflik, pilihan, dan perubahan pada akhir cerita.",
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
