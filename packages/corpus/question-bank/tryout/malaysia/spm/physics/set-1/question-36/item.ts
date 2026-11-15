import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Replacing $$R$$ with a resistor of smaller resistance",
        },
        {
          correct: false,
          label: "Replacing $$R$$ with a resistor of larger resistance",
        },
        {
          correct: false,
          label: "Swapping the positions of $$R$$ and the LDR",
        },
        {
          correct: false,
          label: "Replacing the bulb with a bulb of higher power",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menggantikan $$R$$ dengan perintang yang rintangannya lebih kecil",
        },
        {
          correct: false,
          label:
            "Menggantikan $$R$$ dengan perintang yang rintangannya lebih besar",
        },
        {
          correct: false,
          label: "Menukar kedudukan $$R$$ dengan kedudukan LDR",
        },
        {
          correct: false,
          label: "Menggantikan mentol dengan mentol yang kuasanya lebih tinggi",
        },
      ],
    },
  },
};

export default item;
