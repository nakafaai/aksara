import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Perkembangan harga beras di Indonesia",
        },
        {
          correct: false,
          label: "Informasi negara selain Indonesia yang mengonsumsi beras",
        },
        {
          correct: false,
          label: "Informasi terkait olahan beras",
        },
        {
          correct: false,
          label: "Cara memasak nasi tanpa menyisakan pati di dalam butirannya",
        },
        {
          correct: true,
          label:
            "Hasil penelitian tentang pengaruh pencucian terhadap tekstur nasi",
        },
      ],
    },
  },
};

export default item;
