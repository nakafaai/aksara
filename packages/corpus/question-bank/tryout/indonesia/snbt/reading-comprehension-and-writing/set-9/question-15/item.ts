import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "silted-pond",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "warga mengambil air terlalu banyak",
        },
        {
          correct: false,
          label: "musim kemarau makin panjang",
        },
        {
          correct: false,
          label: "pohon di lereng bukit terlalu banyak",
        },
        {
          correct: true,
          label: "lumpur dari bukit di sekitarnya terbawa air hujan",
        },
        {
          correct: false,
          label: "kebun warga makin luas",
        },
      ],
    },
  },
};

export default item;
