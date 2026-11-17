import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$4.0\\text{ mA}$$ with twice the energy, then $$4.0\\text{ mA}$$ with four times the energy",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ mA}$$ with twice the energy, then $$8.0\\text{ mA}$$ with eight times the energy",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ mA}$$ with twice the energy, then $$4.0\\text{ mA}$$ with twice the energy",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ mA}$$ with four times the energy, then $$8.0\\text{ mA}$$ with sixteen times the energy",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$4.0\\text{ mA}$$ dengan dua kali tenaga, kemudian $$4.0\\text{ mA}$$ dengan empat kali tenaga",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ mA}$$ dengan dua kali tenaga, kemudian $$8.0\\text{ mA}$$ dengan lapan kali tenaga",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ mA}$$ dengan dua kali tenaga, kemudian $$4.0\\text{ mA}$$ dengan dua kali tenaga",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ mA}$$ dengan empat kali tenaga, kemudian $$8.0\\text{ mA}$$ dengan enam belas kali tenaga",
        },
      ],
    },
  },
};

export default item;
