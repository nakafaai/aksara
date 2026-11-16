import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Hydrogen, about $$15.9\\text{ kJ}$$ per gram of fuel and oxygen together",
        },
        {
          correct: false,
          label:
            "Hydrogen, about $$143\\text{ kJ}$$ per gram of fuel and oxygen together",
        },
        {
          correct: false,
          label:
            "Octane, about $$10.6\\text{ kJ}$$ per gram of fuel and oxygen together, because each mole of octane releases the most heat",
        },
        {
          correct: false,
          label:
            "Hydrogen, about $$8.4\\text{ kJ}$$ per gram of fuel and oxygen together",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Hidrogen, kira-kira $$15.9\\text{ kJ}$$ bagi setiap gram bahan api dan oksigen bersama",
        },
        {
          correct: false,
          label:
            "Hidrogen, kira-kira $$143\\text{ kJ}$$ bagi setiap gram bahan api dan oksigen bersama",
        },
        {
          correct: false,
          label:
            "Oktana, kira-kira $$10.6\\text{ kJ}$$ bagi setiap gram bahan api dan oksigen bersama, kerana setiap mol oktana membebaskan haba paling banyak",
        },
        {
          correct: false,
          label:
            "Hidrogen, kira-kira $$8.4\\text{ kJ}$$ bagi setiap gram bahan api dan oksigen bersama",
        },
      ],
    },
  },
};

export default item;
