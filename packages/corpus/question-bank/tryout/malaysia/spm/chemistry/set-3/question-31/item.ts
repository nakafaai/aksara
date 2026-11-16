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
        {
          correct: true,
          label:
            "0.90 dm³ of ethene, which can decolourise up to 6.0 g of bromine",
        },
        {
          correct: false,
          label:
            "1.2 dm³ of ethene, which can decolourise up to 8.0 g of bromine",
        },
        {
          correct: false,
          label:
            "0.90 dm³ of ethane, which can decolourise up to 6.0 g of bromine",
        },
        {
          correct: false,
          label:
            "0.90 dm³ of ethene, which can decolourise up to 3.0 g of bromine",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "0.90 dm³ etena, yang boleh menyahwarnakan sehingga 6.0 g bromin",
        },
        {
          correct: false,
          label:
            "1.2 dm³ etena, yang boleh menyahwarnakan sehingga 8.0 g bromin",
        },
        {
          correct: false,
          label:
            "0.90 dm³ etana, yang boleh menyahwarnakan sehingga 6.0 g bromin",
        },
        {
          correct: false,
          label:
            "0.90 dm³ etena, yang boleh menyahwarnakan sehingga 3.0 g bromin",
        },
      ],
    },
  },
};

export default item;
