import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dinitrogen tetroxide, $$0.640\\text{ kg}$$ of hydrazine left, $$2.16\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "Dinitrogen tetroxide, $$3.52\\text{ kg}$$ of hydrazine left, $$6.48\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "Hydrazine, no dinitrogen tetroxide left, $$7.20\\text{ m}^3$$",
        },
        {
          correct: true,
          label:
            "Dinitrogen tetroxide, $$0.640\\text{ kg}$$ of hydrazine left, $$6.48\\text{ m}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dinitrogen tetroksida, $$0.640\\text{ kg}$$ hidrazin berbaki, $$2.16\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "Dinitrogen tetroksida, $$3.52\\text{ kg}$$ hidrazin berbaki, $$6.48\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "Hidrazin, tiada dinitrogen tetroksida berbaki, $$7.20\\text{ m}^3$$",
        },
        {
          correct: true,
          label:
            "Dinitrogen tetroksida, $$0.640\\text{ kg}$$ hidrazin berbaki, $$6.48\\text{ m}^3$$",
        },
      ],
    },
  },
};

export default item;
