import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11.3\\text{ mL}$$ per dose, and $$11.3\\text{ mL}$$ a day",
        },
        {
          correct: false,
          label: "$$2.25\\text{ mL}$$ per dose, and $$9.0\\text{ mL}$$ a day",
        },
        {
          correct: false,
          label: "$$11.3\\text{ mL}$$ per dose, and $$67.5\\text{ mL}$$ a day",
        },
        {
          correct: true,
          label:
            "$$11.3\\text{ mL}$$ per dose, and $$45.0\\text{ mL}$$ a day at most",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$11.3\\text{ mL}$$ setiap dos, dan $$11.3\\text{ mL}$$ sehari",
        },
        {
          correct: false,
          label:
            "$$2.25\\text{ mL}$$ setiap dos, dan $$9.0\\text{ mL}$$ sehari",
        },
        {
          correct: false,
          label:
            "$$11.3\\text{ mL}$$ setiap dos, dan $$67.5\\text{ mL}$$ sehari",
        },
        {
          correct: true,
          label:
            "$$11.3\\text{ mL}$$ setiap dos, dan paling banyak $$45.0\\text{ mL}$$ sehari",
        },
      ],
    },
  },
};

export default item;
