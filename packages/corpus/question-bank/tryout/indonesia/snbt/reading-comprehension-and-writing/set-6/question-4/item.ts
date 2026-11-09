import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "senior-exercise",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "setiap peserta senam",
        },
        {
          correct: false,
          label: "kader posyandu",
        },
        {
          correct: false,
          label: "halaman posyandu",
        },
        {
          correct: true,
          label: "hasil pemeriksaan tekanan darah setiap peserta",
        },
        {
          correct: false,
          label: "buku kecil",
        },
      ],
    },
  },
};

export default item;
