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
          correct: false,
          label:
            "Keputusan akhir tokoh menghapus ketegangan makna yang sebelumnya dimiliki benda tersebut.",
        },
        {
          correct: false,
          label:
            "Bacaan memakai simbol sebagai label deskriptif tanpa menghubungkannya dengan pilihan tokoh.",
        },
        {
          correct: true,
          label:
            "Mira mengubah panggung yang sepi dengan membacakan satu halaman, sehingga lampu yang semula menerangi kursi kosong menjadi simbol undangan untuk mendengarkan bersama.",
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
