import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Jati berubah dari menyembunyikan kebingungan menjadi mengajukan dan menguji pertanyaan, meskipun ia belum memperoleh satu tafsir yang pasti.",
        },
        {
          correct: false,
          label:
            "Benda yang berulang terutama membangun latar dan hanya sedikit berhubungan dengan konflik.",
        },
        {
          correct: false,
          label:
            "Pada akhir cerita, Jati sudah memahami seluruh buku sehingga pembatas pertanyaan tidak lagi diperlukan.",
        },
        {
          correct: false,
          label:
            "Bacaan memakai perkembangan tokoh sebagai label deskriptif tanpa menghubungkannya dengan pilihan tokoh.",
        },
        {
          correct: false,
          label:
            "Latar menyelesaikan konflik sebelum tindakan akhir tokoh mengubah makna benda.",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
