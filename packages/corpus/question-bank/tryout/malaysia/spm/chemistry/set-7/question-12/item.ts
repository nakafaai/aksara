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
            "A metal, metallic bonds between positive ions and delocalised electrons",
        },
        {
          correct: true,
          label:
            "Graphite, covalent bonds within layers, with delocalised electrons",
        },
        {
          correct: false,
          label:
            "Diamond, covalent bonds in a network where every atom has four bonds",
        },
        {
          correct: false,
          label: "Graphite, ionic bonds between layers of carbon ions",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Logam, ikatan logam antara ion positif dan elektron dinyahsetempat",
        },
        {
          correct: true,
          label:
            "Grafit, ikatan kovalen dalam lapisan, dengan elektron dinyahsetempat",
        },
        {
          correct: false,
          label:
            "Intan, ikatan kovalen dalam rangkaian dengan setiap atom mempunyai empat ikatan",
        },
        {
          correct: false,
          label: "Grafit, ikatan ion antara lapisan ion karbon",
        },
      ],
    },
  },
};

export default item;
