import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Reno memakai catatan lama dan kelembapan saat ini untuk menunda pemindahan secara hati-hati, sementara sudut pandang terbatas menjaga penyebab garis dan respons supervisor tetap terbuka.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan memakai sudut pandang terbatas sebagai label deskriptif tanpa menghubungkannya dengan pilihan tokoh.",
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
