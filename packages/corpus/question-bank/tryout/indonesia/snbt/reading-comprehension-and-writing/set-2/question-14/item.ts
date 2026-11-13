import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "debat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Lomba tahun ini diikuti oleh para siswa dari enam belas SMA di kabupaten itu.",
        },
        {
          correct: false,
          label:
            "Dalam lomba tahun ini diikuti oleh para siswa dari enam belas SMA di kabupaten itu.",
        },
        {
          correct: false,
          label:
            "Lomba tahun ini diikuti oleh para siswa-siswa dari enam belas SMA di kabupaten itu.",
        },
        {
          correct: false,
          label:
            "Dalam lomba tahun ini, para siswa dari enam belas SMA di kabupaten itu ikut serta di dalamnya.",
        },
        {
          correct: false,
          label:
            "Lomba tahun ini diikuti oleh enam belas siswa SMA di kabupaten itu.",
        },
      ],
    },
  },
};

export default item;
