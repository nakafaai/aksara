import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "ein rechtwinkliges und gleichschenkliges Dreieck",
        },
        {
          correct: false,
          label: "ein Quadrat",
        },
        {
          correct: false,
          label: "ein Rechteck, das kein Quadrat ist",
        },
        {
          correct: false,
          label: "ein regelmäßiges Sechseck",
        },
        {
          correct: true,
          label: "ein gleichseitiges Dreieck",
        },
        {
          correct: false,
          label: "ein gleichschenkliges Dreieck, das nicht gleichseitig ist",
        },
      ],
    },
  },
};

export default item;
