import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Luas segitiga $$D'E'F'$$ sama dengan $$4$$ kali luas segitiga $$DEF$$.",
        },
        {
          correct: true,
          label:
            "Bayangan garis $$3x-4y=1$$ oleh $$T$$ sejajar dengan garis $$3x+4y=0$$.",
        },
        {
          correct: false,
          label:
            "Titik $$D$$, $$E$$, $$F$$ berurutan berlawanan arah jarum jam, dan titik $$D'$$, $$E'$$, $$F'$$ juga berurutan berlawanan arah jarum jam.",
        },
        {
          correct: false,
          label:
            "Pusat dilatasi, titik $$P(2,1)$$, dipetakan oleh $$T$$ ke dirinya sendiri.",
        },
        {
          correct: true,
          label: "Garis $$x=2$$ dipetakan oleh $$T$$ ke dirinya sendiri.",
        },
      ],
    },
  },
};

export default item;
