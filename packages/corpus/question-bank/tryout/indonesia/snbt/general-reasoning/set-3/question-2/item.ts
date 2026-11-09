import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "pagar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pagar yang sangat rapat menghambat pergerakan udara sehingga asap dan partikel dari knalpot terkumpul di lajur kendaraan dan tidak mudah tersebar.",
        },
        {
          correct: false,
          label:
            "Pada ruas berpagar rapat, jumlah pejalan kaki dan pedagang kaki lima di trotoar jauh lebih banyak daripada di ruas lain, sehingga trotoar menjadi lebih ramai.",
        },
        {
          correct: false,
          label:
            "Tanaman pada pagar yang rapat mengeluarkan partikel PM2,5 dalam jumlah besar.",
        },
        {
          correct: false,
          label:
            "Pengukuran di ruas berpagar rapat dilakukan lebih banyak pada malam hari.",
        },
        {
          correct: false,
          label: "Ruas berpagar rapat terletak lebih jauh dari pusat kota.",
        },
      ],
    },
  },
};

export default item;
