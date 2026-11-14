import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Es ist rechtwinklig mit dem rechten Winkel bei $$A$$.",
        },
        {
          correct: true,
          label:
            "Es ist rechtwinklig und gleichschenklig mit dem rechten Winkel bei $$B$$.",
        },
        {
          correct: false,
          label: "Es ist rechtwinklig mit dem rechten Winkel bei $$C$$.",
        },
        {
          correct: false,
          label: "Es ist gleichseitig.",
        },
        {
          correct: false,
          label: "Es ist gleichschenklig, aber nicht rechtwinklig.",
        },
        {
          correct: false,
          label:
            "Es ist rechtwinklig mit dem rechten Winkel bei $$B$$, aber nicht gleichschenklig.",
        },
      ],
    },
  },
};

export default item;
