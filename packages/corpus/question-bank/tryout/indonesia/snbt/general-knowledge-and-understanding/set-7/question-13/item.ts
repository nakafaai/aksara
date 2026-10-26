import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "penyalinan kata demi kata tanpa perubahan medium",
        },
        {
          correct: false,
          label: "karya baru yang hanya meminjam judul sumber",
        },
        {
          correct: true,
          label:
            "pengolahan karya ke bentuk baru dengan perubahan yang sesuai tujuan dan mediumnya",
        },
        {
          correct: false,
          label: "penggabungan semua versi tanpa mencatat asal setiap bagian",
        },
        {
          correct: false,
          label: "pemendekan cerita tanpa mempertimbangkan tujuan pertunjukan",
        },
      ],
    },
  },
};

export default item;
