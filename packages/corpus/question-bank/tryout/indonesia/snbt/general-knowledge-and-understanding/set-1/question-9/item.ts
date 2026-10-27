import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "peningkatan minat terhadap olahraga selama pandemi COVID-19.",
        },
        {
          correct: false,
          label: "dampak positif berolahraga bagi tubuh kita.",
        },
        {
          correct: false,
          label: "ragam kegiatan olahraga pada masa pandemi.",
        },
        {
          correct: true,
          label:
            "perlunya membedakan panduan olahraga berbasis bukti dari mitos selama pandemi.",
        },
        {
          correct: false,
          label: "olahraga merupakan satu di antara cara mencegah corona.",
        },
      ],
    },
  },
};

export default item;
