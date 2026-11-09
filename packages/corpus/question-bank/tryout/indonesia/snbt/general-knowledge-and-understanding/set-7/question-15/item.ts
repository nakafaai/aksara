import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "panas",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menambah pemakaian pendingin ruangan di gedung-gedung kota",
        },
        {
          correct: true,
          label: "mendinginkan udara kota melalui penguapan air dari daun",
        },
        {
          correct: false,
          label: "menyerap seluruh panas yang dibuang mesin kendaraan",
        },
        {
          correct: false,
          label: "menggantikan seluruh jalan beraspal dengan tanah lapang",
        },
        {
          correct: false,
          label: "menaikkan suhu malam hari di daerah pinggiran kota",
        },
      ],
    },
  },
};

export default item;
