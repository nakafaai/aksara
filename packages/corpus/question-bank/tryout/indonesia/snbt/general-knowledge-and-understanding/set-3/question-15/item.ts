import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menempatkan tindakan sebelum alasan dalam susunan pesan baru.",
        },
        {
          isCorrect: false,
          label:
            "Satu terjemahan yang lulus uji kedua pasti dapat digunakan tanpa perubahan di seluruh daerah.",
        },
        {
          isCorrect: true,
          label:
            "Pesan darurat perlu mempertahankan makna dan tindakan melalui bahasa yang dipahami warga, bukan sekadar menyalin urutan kata resmi.",
        },
        {
          isCorrect: false,
          label:
            "Terjemahan harus mengikuti setiap kata sumber meskipun warga salah memahami tindakan yang diminta.",
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
