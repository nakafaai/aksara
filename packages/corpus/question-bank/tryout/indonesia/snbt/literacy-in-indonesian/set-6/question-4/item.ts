import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "liquefaction",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menunjukkan bahwa perlakuan manusia dapat ikut menentukan kerawanan lahan",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa saluran irigasi menjadi penyebab gempa pada 2018",
        },
        {
          correct: false,
          label:
            "menyalahkan para petani yang mengairi sawah di lereng-lereng Palu",
        },
        {
          correct: false,
          label:
            "menjelaskan mengapa tanah liat lebih tahan terhadap likuefaksi",
        },
        {
          correct: false,
          label:
            "menyarankan agar semua saluran irigasi di Indonesia mungkin perlu ditutup",
        },
      ],
    },
  },
};

export default item;
