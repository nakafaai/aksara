import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Peserta uji kedua ternyata telah menghafal rute evakuasi yang benar sebelum mendengar pesan revisi.",
        },
        {
          isCorrect: false,
          label:
            "Kelompok baru dari kampung lain juga memahami rute dan waktu secara tepat setelah mendengar versi revisi.",
        },
        {
          isCorrect: false,
          label:
            "Siaran kedua dengan versi revisi yang sama dibacakan lebih lambat dan menghasilkan ingatan rute yang sedikit lebih akurat.",
        },
        {
          isCorrect: false,
          label:
            "Setiap versi akan diuji lagi bersama warga sebelum digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Tim menempatkan tindakan sebelum alasan dalam susunan pesan baru.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
