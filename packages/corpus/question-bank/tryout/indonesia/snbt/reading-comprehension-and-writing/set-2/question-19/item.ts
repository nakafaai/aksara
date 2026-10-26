import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "sejarah papeda di Indonesia bagian timur.",
        },
        {
          correct: false,
          label: "tata cara mengekstraksi pati dari batang sagu.",
        },
        {
          correct: false,
          label: "tujuh subsektor dalam Sensus Pertanian Indonesia.",
        },
        {
          correct: false,
          label: "harga ekspor pati sagu Indonesia.",
        },
        {
          correct: true,
          label:
            "pengembangan sagu melalui penganekaragaman pangan dan inovasi produk.",
        },
      ],
    },
  },
};

export default item;
