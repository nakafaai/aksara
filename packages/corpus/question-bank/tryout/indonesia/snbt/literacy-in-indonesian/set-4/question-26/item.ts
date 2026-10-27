import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Benda yang berulang terutama membangun latar dan hanya sedikit berhubungan dengan konflik.",
        },
        {
          correct: true,
          label:
            "Galih menelusuri serpihan biru yang berulang, mencocokkannya dengan foto arsip, lalu membantu tim menyisakan bukti pintu ruang baca lama di tengah pemugaran.",
        },
        {
          correct: false,
          label:
            "Keputusan akhir tokoh menghapus ketegangan makna yang sebelumnya dimiliki benda tersebut.",
        },
        {
          correct: false,
          label:
            "Bacaan memakai foreshadowing sebagai label deskriptif tanpa menghubungkannya dengan pilihan tokoh.",
        },
        {
          correct: false,
          label:
            "Latar menyelesaikan konflik sebelum tindakan akhir tokoh mengubah makna benda.",
        },
      ],
    },
  },
};

export default item;
