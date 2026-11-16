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
            "Water: does not conduct. Methylbenzene: does not conduct. pH $$7.0$$",
        },
        {
          correct: false,
          label: "Water: conducts. Methylbenzene: conducts. pH $$1.0$$",
        },
        {
          correct: false,
          label: "Water: conducts. Methylbenzene: does not conduct. pH $$2.0$$",
        },
        {
          correct: true,
          label: "Water: conducts. Methylbenzene: does not conduct. pH $$1.0$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Air: tidak mengkonduksikan. Metilbenzena: tidak mengkonduksikan. pH $$7.0$$",
        },
        {
          correct: false,
          label:
            "Air: mengkonduksikan. Metilbenzena: mengkonduksikan. pH $$1.0$$",
        },
        {
          correct: false,
          label:
            "Air: mengkonduksikan. Metilbenzena: tidak mengkonduksikan. pH $$2.0$$",
        },
        {
          correct: true,
          label:
            "Air: mengkonduksikan. Metilbenzena: tidak mengkonduksikan. pH $$1.0$$",
        },
      ],
    },
  },
};

export default item;
