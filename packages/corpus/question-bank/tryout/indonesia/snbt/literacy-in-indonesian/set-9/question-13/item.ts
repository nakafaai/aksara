import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme-message",
  },
  stimulus: "tea-picker",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "persaingan antara para pemetik teh untuk menjadi mandor",
        },
        {
          correct: false,
          label: "kehidupan mahasiswa yang merekam tugas kuliah di desa",
        },
        {
          correct: true,
          label: "nilai keahlian tangan manusia di tengah datangnya mesin",
        },
        {
          correct: false,
          label: "kerasnya cuaca di perkebunan teh pada pagi hari",
        },
        {
          correct: false,
          label: "hubungan nenek dan cucu yang tinggal berjauhan di kota",
        },
      ],
    },
  },
};

export default item;
