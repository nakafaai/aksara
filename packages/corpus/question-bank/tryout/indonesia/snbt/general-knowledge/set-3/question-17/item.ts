import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pada uji kedua, peserta baru memilih rute dan waktu berangkat dengan lebih tepat.",
        },
        {
          isCorrect: false,
          label:
            "Pesan darurat perlu mempertahankan makna dan tindakan melalui bahasa yang dipahami warga, bukan sekadar menyalin urutan kata resmi.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian penyiar menganggap terjemahan paling aman adalah terjemahan yang mengikuti urutan kata sumber.",
        },
        {
          isCorrect: false,
          label:
            "Setiap versi akan diuji lagi bersama warga sebelum digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Satu terjemahan yang lulus uji kedua pasti dapat digunakan tanpa perubahan di seluruh daerah.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
