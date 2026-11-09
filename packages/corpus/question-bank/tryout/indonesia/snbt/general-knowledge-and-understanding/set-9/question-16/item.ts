import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "figurative-meaning",
  },
  stimulus: "bambu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "logam yang dicat hijau supaya tidak berkarat",
        },
        {
          correct: true,
          label: "bahan dari tumbuhan yang kuat seperti baja",
        },
        {
          correct: false,
          label: "tanaman hijau yang batangnya mudah patah",
        },
        {
          correct: false,
          label: "bahan yang hanya dipakai untuk membuat jembatan",
        },
        {
          correct: false,
          label: "tumbuhan yang daunnya tetap hijau sepanjang tahun",
        },
      ],
    },
  },
};

export default item;
