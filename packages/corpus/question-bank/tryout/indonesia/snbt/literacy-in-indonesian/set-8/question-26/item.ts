import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Jati berubah dari menyembunyikan kebingungan menjadi mengajukan dan menguji pertanyaan, meskipun ia belum memperoleh satu tafsir yang pasti.",
        },
        {
          isCorrect: false,
          label:
            "Benda yang berulang terutama membangun latar dan hanya sedikit berhubungan dengan konflik.",
        },
        {
          isCorrect: false,
          label:
            "Pada akhir cerita, Jati sudah memahami seluruh buku sehingga pembatas pertanyaan tidak lagi diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan memakai perkembangan tokoh sebagai label deskriptif tanpa menghubungkannya dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Latar menyelesaikan konflik sebelum tindakan akhir tokoh mengubah makna benda.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
