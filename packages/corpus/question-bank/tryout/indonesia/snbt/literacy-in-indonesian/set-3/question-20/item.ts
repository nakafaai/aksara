import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "village-tourism",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menjadikan rumah warga sebagai penginapan bagi wisatawan",
        },
        {
          correct: false,
          label: "menjual kain tenun kepada pengunjung yang datang ke desa",
        },
        {
          correct: false,
          label: "mengajak anak muda pulang untuk menjadi pemandu wisata",
        },
        {
          correct: false,
          label: "mempromosikan desa agar dikenal lebih luas oleh orang kota",
        },
        {
          correct: true,
          label: "menggelar upacara syukur panen setiap Sabtu untuk wisatawan",
        },
      ],
    },
  },
};

export default item;
