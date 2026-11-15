import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$y=-\\frac23x+\\frac{13}{3}$$",
        },
        {
          correct: false,
          label: "$$y=-3x+9$$ oder $$y=-0{,}75x+4{,}5$$",
        },
        {
          correct: false,
          label: "$$y=-\\frac23x+4$$",
        },
        {
          correct: false,
          label: "$$y=1{,}5x$$",
        },
        {
          correct: true,
          label: "$$y=-1{,}5x+6$$",
        },
        {
          correct: false,
          label: "Es gibt keine solche Gerade.",
        },
      ],
    },
  },
};

export default item;
