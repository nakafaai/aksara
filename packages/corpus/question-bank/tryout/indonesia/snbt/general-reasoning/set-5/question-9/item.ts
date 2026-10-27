import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Pemakaian melebihi batas dan aliran listrik tidak terputus",
        },
        {
          correct: false,
          label: "Pemakaian melebihi batas dan aliran listrik terputus",
        },
        {
          correct: false,
          label:
            "Jika aliran listrik tidak terputus, pemakaian tidak melebihi batas",
        },
        {
          correct: false,
          label: "Pemakaian tidak melebihi batas atau aliran listrik terputus",
        },
        {
          correct: false,
          label:
            "Tidak benar bahwa pemakaian melebihi batas sementara listrik tetap menyala",
        },
      ],
    },
  },
};

export default item;
