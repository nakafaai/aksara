import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "symbol",
  },
  stimulus: "kite-maker",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "keunggulan barang yang mahal atas barang yang murah",
        },
        {
          correct: true,
          label:
            "dua cara menghadapi perubahan, yaitu bertahan kaku sampai jatuh atau melentur lalu menyesuaikan diri",
        },
        {
          correct: false,
          label:
            "kemajuan teknologi yang pada akhirnya pasti mengalahkan kerajinan tangan",
        },
        {
          correct: false,
          label:
            "perbedaan antara angin sore di lapangan dan angin di sekitar rumah",
        },
        {
          correct: false,
          label: "kesombongan Kakek terhadap barang buatan pabrik",
        },
      ],
    },
  },
};

export default item;
