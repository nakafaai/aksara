import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bromine forms, and shaking it with potassium iodide frees 1.27 g of iodine",
        },
        {
          correct: false,
          label:
            "Bromine cannot displace iodine, so the organic layer stays orange-brown",
        },
        {
          correct: true,
          label:
            "1.60 g of bromine forms, and shaking it with excess potassium iodide then frees 2.54 g of iodine, turning the organic layer purple",
        },
        {
          correct: false,
          label:
            "1.60 g of bromine forms, and shaking it with excess potassium iodide frees 2.54 g of iodine, turning the organic layer colourless",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bromin terbentuk, dan menggoncangnya dengan kalium iodida membebaskan 1.27 g iodin",
        },
        {
          correct: false,
          label:
            "Bromin tidak boleh menyesarkan iodin, jadi lapisan organik kekal perang jingga",
        },
        {
          correct: true,
          label:
            "1.60 g bromin terbentuk, dan menggoncangnya dengan kalium iodida berlebihan kemudian membebaskan 2.54 g iodin, menjadikan lapisan organik ungu",
        },
        {
          correct: false,
          label:
            "1.60 g bromin terbentuk, dan menggoncangnya dengan kalium iodida berlebihan membebaskan 2.54 g iodin, menjadikan lapisan organik tidak berwarna",
        },
      ],
    },
  },
};

export default item;
