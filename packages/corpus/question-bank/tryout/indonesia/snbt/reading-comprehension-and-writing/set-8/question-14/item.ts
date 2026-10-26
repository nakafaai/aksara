import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Data di kumpulkan di kantor barang hilang dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan dikantor barang hilang dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data mengumpulkan di kantor barang hilang dan kemudian membandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan pada di kantor barang hilang lalu di bandingkan.",
        },
        {
          correct: true,
          label:
            "Data dikumpulkan di kantor barang hilang dan kemudian dibandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
