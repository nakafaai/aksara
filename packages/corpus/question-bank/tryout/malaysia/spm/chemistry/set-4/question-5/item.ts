import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "2.4 dm³ of carbon dioxide, absorbed exactly by 4.0 g of sodium hydroxide" },
        { correct: false, label: "1.2 dm³ of carbon dioxide, absorbed exactly by 8.0 g of sodium hydroxide" },
        { correct: false, label: "2.4 dm³ of carbon dioxide, absorbed exactly by 16.0 g of sodium hydroxide" },
        { correct: true, label: "2.4 dm³ of carbon dioxide, absorbed exactly by 8.0 g of sodium hydroxide to give 10.6 g of sodium carbonate" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "2.4 dm³ karbon dioksida, diserap tepat oleh 4.0 g natrium hidroksida" },
        { correct: false, label: "1.2 dm³ karbon dioksida, diserap tepat oleh 8.0 g natrium hidroksida" },
        { correct: false, label: "2.4 dm³ karbon dioksida, diserap tepat oleh 16.0 g natrium hidroksida" },
        { correct: true, label: "2.4 dm³ karbon dioksida, diserap tepat oleh 8.0 g natrium hidroksida menghasilkan 10.6 g natrium karbonat" },
      ],
    },
  },
};

export default item;
