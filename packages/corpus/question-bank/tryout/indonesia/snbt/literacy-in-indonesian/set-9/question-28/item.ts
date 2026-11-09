import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "fact-opinion",
  },
  stimulus: "film-review",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kekuatan terbesar film ini ada pada kesederhanaannya.",
        },
        {
          correct: false,
          label: "Bagian tengah film terasa berlarut-larut.",
        },
        {
          correct: false,
          label:
            "Adegan menghitung uang receh adalah adegan yang paling menyentuh.",
        },
        {
          correct: false,
          label: "Film ini layak ditonton oleh keluarga.",
        },
        {
          correct: true,
          label: "Film ini berdurasi 98 menit.",
        },
      ],
    },
  },
};

export default item;
