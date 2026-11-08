import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "walkable-city",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "kemudahan berkendara mendorong lebih banyak orang memakai kendaraan pribadi",
        },
        {
          correct: false,
          label:
            "pemerintah kota tidak pernah sekali pun melebarkan jalan tanpa mengorbankan trotoar",
        },
        {
          correct: false,
          label:
            "jumlah penduduk kota tidak bertambah dalam beberapa tahun terakhir",
        },
        {
          correct: false,
          label:
            "pengendara ojek paling banyak memakai jalan yang sudah dilebarkan",
        },
        {
          correct: false,
          label:
            "kemacetan mungkin hilang dengan sendirinya jika jalan dibiarkan saja",
        },
      ],
    },
  },
};

export default item;
