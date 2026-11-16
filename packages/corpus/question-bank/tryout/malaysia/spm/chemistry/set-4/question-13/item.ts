import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "2.7 g of aluminium holds the same number of delocalised electrons as 2.3 g of sodium, because both are 0.10 mol",
        },
        {
          correct: false,
          label:
            "Sodium holds more delocalised electrons per gram, because its atoms are larger",
        },
        {
          correct: false,
          label:
            "2.7 g of aluminium holds $$6.02 \\\\times 10^{22}$$ delocalised electrons, the same as 2.3 g of sodium",
        },
        {
          correct: true,
          label:
            "2.7 g of aluminium holds $$1.81 \\\\times 10^{23}$$ delocalised electrons, three times as many as 2.3 g of sodium, so its metallic bonding is stronger and it melts higher",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "2.7 g aluminium mengandungi bilangan elektron dinyahsetempat yang sama dengan 2.3 g natrium, kerana kedua-duanya 0.10 mol",
        },
        {
          correct: false,
          label:
            "Natrium mengandungi lebih banyak elektron dinyahsetempat per gram, kerana atomnya lebih besar",
        },
        {
          correct: false,
          label:
            "2.7 g aluminium mengandungi $$6.02 \\\\times 10^{22}$$ elektron dinyahsetempat, sama dengan 2.3 g natrium",
        },
        {
          correct: true,
          label:
            "2.7 g aluminium mengandungi $$1.81 \\\\times 10^{23}$$ elektron dinyahsetempat, tiga kali lebih banyak daripada 2.3 g natrium, jadi ikatan logamnya lebih kuat dan takat leburnya lebih tinggi",
        },
      ],
    },
  },
};

export default item;
