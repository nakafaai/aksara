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
            "Benda berulang memperoleh makna terutama dari bentuk fisiknya, bukan dari hubungannya dengan pilihan tokoh.",
        },
        {
          correct: true,
          label:
            "Pilihan pelanggan atas jahitan merah menunjukkan perubahan dari keinginan menghapus bekas kerusakan menuju penerimaan riwayat perawatan blus.",
        },
        {
          correct: false,
          label:
            "Akhir cerita menunjukkan bahwa latar, bukan tindakan tokoh, menyelesaikan konflik.",
        },
        {
          correct: false,
          label:
            "Makna benda tetap sama meskipun tokoh menggunakannya dengan cara berbeda.",
        },
        {
          correct: false,
          label:
            "Tindakan akhir penting karena mengukuhkan penafsiran yang sudah terbentuk sejak awal.",
        },
      ],
    },
  },
};

export default item;
