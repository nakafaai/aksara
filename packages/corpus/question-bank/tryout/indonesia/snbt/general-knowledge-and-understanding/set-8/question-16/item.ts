import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "figurative-meaning",
  },
  stimulus: "gambut",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "berwarna kuning dan berpori besar seperti busa sabun",
        },
        {
          correct: false,
          label: "mudah dipindahkan dari satu tempat ke tempat lain",
        },
        {
          correct: true,
          label: "dapat menyerap dan menyimpan banyak air",
        },
        {
          correct: false,
          label: "terbuat dari bahan buatan yang ringan",
        },
        {
          correct: false,
          label: "selalu kering pada musim hujan",
        },
      ],
    },
  },
};

export default item;
