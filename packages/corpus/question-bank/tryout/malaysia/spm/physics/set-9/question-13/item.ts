import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.25\\text{ km}$$ apart, with one directly opposite the midpoint of the masts",
        },
        {
          correct: false,
          label:
            "$$1.25\\text{ km}$$ apart, the nearest $$0.63\\text{ km}$$ from the point opposite the midpoint",
        },
        {
          correct: false,
          label:
            "$$0.63\\text{ km}$$ apart, with one directly opposite the midpoint of the masts",
        },
        {
          correct: false,
          label:
            "$$50\\text{ m}$$ apart, the nearest $$25\\text{ m}$$ from the point opposite the midpoint",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.25\\text{ km}$$ berjarak, dengan satu tepat bertentangan titik tengah menara",
        },
        {
          correct: false,
          label:
            "$$1.25\\text{ km}$$ berjarak, yang terdekat $$0.63\\text{ km}$$ dari titik bertentangan titik tengah",
        },
        {
          correct: false,
          label:
            "$$0.63\\text{ km}$$ berjarak, dengan satu tepat bertentangan titik tengah menara",
        },
        {
          correct: false,
          label:
            "$$50\\text{ m}$$ berjarak, yang terdekat $$25\\text{ m}$$ dari titik bertentangan titik tengah",
        },
      ],
    },
  },
};

export default item;
