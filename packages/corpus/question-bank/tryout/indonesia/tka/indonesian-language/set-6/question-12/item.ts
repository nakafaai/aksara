import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  stimulus: "eye-screening",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menegurnya karena ia tampak malas memperhatikan pelajaran",
        },
        {
          correct: false,
          label: "meminjamkan kacamatamu sendiri agar ia bisa langsung membaca",
        },
        {
          correct: false,
          label: "menyarankannya pindah ke bangku paling belakang",
        },
        {
          correct: true,
          label:
            "menyarankannya memeriksakan mata dan tidak mengejeknya jika nanti ia memakai kacamata",
        },
        { correct: false, label: "menertawakannya agar ia lebih fokus" },
      ],
    },
  },
};

export default item;
