import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "peringkat nama berdasarkan seberapa sering dicari pengguna",
        },
        {
          correct: false,
          label: "penyatuan semua sebutan menjadi satu nama baku",
        },
        {
          correct: false,
          label: "perkiraan umur objek dari bentuk motifnya",
        },
        {
          correct: false,
          label: "pengelompokan anonim tanpa mencatat pemberi keterangan",
        },
        {
          correct: true,
          label:
            "pencantuman pihak atau sumber yang bertanggung jawab atas suatu nama, karya, atau keterangan",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
