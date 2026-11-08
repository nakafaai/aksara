import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "spelling",
  },
  stimulus: "sleep-survey",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "18 orang siswa tidur kurang dari enam jam setiap malam.",
        },
        {
          correct: true,
          label: "Delapan belas siswa tidur kurang dari enam jam setiap malam.",
        },
        {
          correct: false,
          label: "Delapan belas (18) siswa-siswa tidur kurang dari enam jam setiap malam.",
        },
        {
          correct: false,
          label: "Sebanyak 18 orang siswa-siswa tidur kurang dari enam jam setiap malam.",
        },
        {
          correct: false,
          label: "18 siswa, tidur kurang dari enam jam setiap malam.",
        },
      ],
    },
  },
};

export default item;
