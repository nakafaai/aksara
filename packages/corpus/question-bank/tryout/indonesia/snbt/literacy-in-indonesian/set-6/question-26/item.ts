import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
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
          correct: true,
          label:
            "Reno memakai catatan lama dan kelembapan saat ini untuk menunda pemindahan secara hati-hati, sementara sudut pandang terbatas menjaga penyebab garis dan respons supervisor tetap terbuka.",
        },
        {
          correct: false,
          label:
            "Bacaan memakai sudut pandang terbatas sebagai label deskriptif tanpa menghubungkannya dengan pilihan tokoh.",
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
