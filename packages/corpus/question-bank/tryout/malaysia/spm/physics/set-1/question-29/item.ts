import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$L_1$$ and $$L_2$$ both become dimmer",
        },
        {
          correct: true,
          label: "$$L_1$$ becomes dimmer and $$L_2$$ becomes brighter",
        },
        {
          correct: false,
          label: "$$L_1$$ and $$L_2$$ both become brighter",
        },
        {
          correct: false,
          label: "The brightness of $$L_1$$ and $$L_2$$ does not change",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$L_1$$ dan $$L_2$$ kedua-duanya menjadi malap",
        },
        {
          correct: true,
          label: "$$L_1$$ menjadi malap dan $$L_2$$ menjadi lebih cerah",
        },
        {
          correct: false,
          label: "$$L_1$$ dan $$L_2$$ kedua-duanya menjadi lebih cerah",
        },
        {
          correct: false,
          label: "Kecerahan $$L_1$$ dan $$L_2$$ tidak berubah",
        },
      ],
    },
  },
};

export default item;
