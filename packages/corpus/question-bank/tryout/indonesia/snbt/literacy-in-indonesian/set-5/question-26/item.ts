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
          correct: true,
          label:
            "Ayu dan pelanggan menjadikan warna jahitan merah lama sebagai dasar pola reparasi yang terlihat untuk mempertemukan riwayat blus dengan keinginan memperbaikinya.",
        },
        {
          correct: false,
          label:
            "Keputusan akhir tokoh menghapus ketegangan makna yang sebelumnya dimiliki benda tersebut.",
        },
        {
          correct: false,
          label:
            "Bacaan memakai konflik sebagai label deskriptif tanpa menghubungkannya dengan pilihan tokoh.",
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
