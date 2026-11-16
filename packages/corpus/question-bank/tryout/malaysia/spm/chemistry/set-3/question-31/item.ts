import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "1.2 dm³ of ethene, which decolourises bromine water" },
        { correct: false, label: "1.2 dm³ of ethane, which decolourises bromine water" },
        { correct: false, label: "2.4 dm³ of ethene, which decolourises bromine water" },
        { correct: false, label: "0.6 dm³ of ethene, which does not react with bromine water" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "1.2 dm³ etena, yang menyahwarnakan air bromin" },
        { correct: false, label: "1.2 dm³ etana, yang menyahwarnakan air bromin" },
        { correct: false, label: "2.4 dm³ etena, yang menyahwarnakan air bromin" },
        { correct: false, label: "0.6 dm³ etena, yang tidak bertindak balas dengan air bromin" },
      ],
    },
  },
};

export default item;
