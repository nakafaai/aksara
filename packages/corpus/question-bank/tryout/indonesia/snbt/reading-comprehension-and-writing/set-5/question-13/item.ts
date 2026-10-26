import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "kerja sama tim dalam uji daftar pemeriksaan",
        },
        {
          correct: false,
          label: "kerjasama tim dalam uji daftar pemeriksaan",
        },
        {
          correct: false,
          label: "kerja-sama tim dalam uji daftar pemeriksaan",
        },
        {
          correct: false,
          label: "kerja samah tim dalam uji daftar pemeriksaan",
        },
        {
          correct: false,
          label: "kerja sama-sama tim dalam uji daftar pemeriksaan",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
