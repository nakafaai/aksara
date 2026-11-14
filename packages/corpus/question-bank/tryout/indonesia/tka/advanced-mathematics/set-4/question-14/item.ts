import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Di luar lingkaran dan berjarak $$\\sqrt2$$ dari pusat",
        },
        {
          correct: false,
          label: "Tepat pada lingkaran",
        },
        {
          correct: false,
          label: "Di dalam lingkaran dan berjarak $$2$$ dari pusat",
        },
        {
          correct: false,
          label: "Di luar lingkaran dan berjarak $$2$$ dari pusat",
        },
        {
          correct: true,
          label: "Di dalam lingkaran dan berjarak $$\\sqrt2$$ dari pusat",
        },
      ],
    },
  },
};

export default item;
