import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "ride-fare",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "paling jauh 2 km atau paling sedikit 11 km" },
        { correct: false, label: "paling sedikit 11 km" },
        { correct: false, label: "paling jauh 2 km atau paling sedikit 10 km" },
        { correct: false, label: "paling jauh 2 km" },
        { correct: false, label: "lebih dari 2 km dan kurang dari 10 km" },
      ],
    },
  },
};

export default item;
