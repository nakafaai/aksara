import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Hipotermia hanya mengancam orang yang berada di pegunungan.",
        },
        {
          correct: false,
          label:
            "Menggigil merupakan satu-satunya tanda hipotermia yang dapat dipercaya.",
        },
        {
          correct: true,
          label:
            "Hipotermia merupakan keadaan darurat medis yang memerlukan tindakan cepat dan aman.",
        },
        {
          correct: false,
          label:
            "Panas langsung merupakan cara terbaik untuk menangani hipotermia.",
        },
        {
          correct: false,
          label: "Orang yang masih sadar tidak memerlukan pertolongan medis.",
        },
      ],
    },
  },
};

export default item;
