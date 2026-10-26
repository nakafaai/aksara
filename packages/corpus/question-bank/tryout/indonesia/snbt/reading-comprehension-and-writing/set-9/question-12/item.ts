import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pada Senin, tim menguji jadwal digital setelah pembatalan.",
        },
        {
          correct: true,
          label: "Pada Senin, tim menguji jadwal digital setelah pembatalan.",
        },
        {
          correct: false,
          label: "Pada senin, tim menguji jadwal digital setelah pembatalan.",
        },
        {
          correct: false,
          label: "Pada Senin, Tim menguji jadwal digital setelah pembatalan.",
        },
        {
          correct: false,
          label: "Pada Senin tim menguji jadwal digital setelah pembatalan",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
