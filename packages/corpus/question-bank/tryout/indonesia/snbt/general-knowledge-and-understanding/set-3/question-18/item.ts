import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Satu terjemahan yang lulus uji kedua pasti dapat digunakan tanpa perubahan di seluruh daerah.",
        },
        {
          isCorrect: false,
          label:
            "Terjemahan harus mengikuti setiap kata sumber meskipun warga salah memahami tindakan yang diminta.",
        },
        {
          isCorrect: true,
          label:
            "Terjemahan yang komunikatif dapat lebih tepat daripada terjemahan harfiah jika tetap menjaga tingkat bahaya dan tindakan yang diwajibkan.",
        },
        {
          isCorrect: false,
          label:
            "Tim menempatkan tindakan sebelum alasan dalam susunan pesan baru.",
        },
        {
          isCorrect: false,
          label:
            "Setiap versi akan diuji lagi bersama warga sebelum digunakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
