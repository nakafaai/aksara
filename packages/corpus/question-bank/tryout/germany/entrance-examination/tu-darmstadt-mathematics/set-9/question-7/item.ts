import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$495\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$400\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$595\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$324\\text{ €}$$",
        },
        {
          correct: false,
          label:
            "Das hängt davon ab, ob zuerst der Rabatt oder zuerst die Mehrwertsteuer berechnet wird.",
        },
        {
          correct: true,
          label: "$$476\\text{ €}$$",
        },
      ],
    },
  },
};

export default item;
