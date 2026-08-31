import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pilihan kecil Jati mengubah makna pembatas buku kosong dalam menghadapi konflik di klub pembaca pemula.",
        },
        {
          isCorrect: false,
          label:
            "Benda yang berulang terutama membangun latar dan hanya sedikit berhubungan dengan konflik.",
        },
        {
          isCorrect: false,
          label:
            "Keputusan akhir tokoh menghapus ketegangan makna yang sebelumnya dimiliki benda tersebut.",
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
