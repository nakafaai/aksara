import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "hydroponic-nutrient",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Konsentrasinya sekitar $$1{.}304\\text{ ppm}$$, sehingga tidak sesuai.",
        },
        {
          correct: false,
          label:
            "Konsentrasinya sekitar $$1{.}278\\text{ ppm}$$, sehingga tidak sesuai.",
        },
        {
          correct: false,
          label:
            "Konsentrasinya tepat $$1{.}250\\text{ ppm}$$, sehingga tidak sesuai.",
        },
        {
          correct: true,
          label:
            "Konsentrasinya tepat $$1{.}250\\text{ ppm}$$, sehingga masih sesuai.",
        },
        {
          correct: false,
          label:
            "Konsentrasinya tepat $$1{.}150\\text{ ppm}$$, sehingga masih sesuai.",
        },
      ],
    },
  },
};

export default item;
