import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nutrition-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$14$$ mmol, by active transport" },
        { correct: false, label: "$$12$$ mmol, by active transport" },
        {
          correct: false,
          label: "$$14$$ mmol, carried in with the water by diffusion",
        },
        {
          correct: false,
          label: "$$6$$ mmol, carried in with the water by diffusion",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$14$$ mmol, melalui pengangkutan aktif" },
        { correct: false, label: "$$12$$ mmol, melalui pengangkutan aktif" },
        {
          correct: false,
          label: "$$14$$ mmol, dibawa masuk bersama air secara resapan",
        },
        {
          correct: false,
          label: "$$6$$ mmol, dibawa masuk bersama air secara resapan",
        },
      ],
    },
  },
};

export default item;
