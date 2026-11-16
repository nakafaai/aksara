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
        {
          correct: false,
          label:
            "$$x = 4$$, and the solid at $$130^\\circ\\text{C}$$ is anhydrous copper(II) sulfate",
        },
        {
          correct: true,
          label:
            "$$x = 5$$, and the solid at $$130^\\circ\\text{C}$$ is $$\\text{CuSO}_4 \\cdot \\text{H}_2\\text{O}$$",
        },
        {
          correct: false,
          label:
            "$$x = 5$$, and the solid at $$130^\\circ\\text{C}$$ is $$\\text{CuSO}_4 \\cdot 3\\text{H}_2\\text{O}$$",
        },
        {
          correct: false,
          label:
            "$$x = 0.56$$, and the solid at $$130^\\circ\\text{C}$$ is $$\\text{CuSO}_4 \\cdot \\text{H}_2\\text{O}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$x = 4$$, dan pepejal pada $$130^\\circ\\text{C}$$ ialah kuprum(II) sulfat kontang",
        },
        {
          correct: true,
          label:
            "$$x = 5$$, dan pepejal pada $$130^\\circ\\text{C}$$ ialah $$\\text{CuSO}_4 \\cdot \\text{H}_2\\text{O}$$",
        },
        {
          correct: false,
          label:
            "$$x = 5$$, dan pepejal pada $$130^\\circ\\text{C}$$ ialah $$\\text{CuSO}_4 \\cdot 3\\text{H}_2\\text{O}$$",
        },
        {
          correct: false,
          label:
            "$$x = 0.56$$, dan pepejal pada $$130^\\circ\\text{C}$$ ialah $$\\text{CuSO}_4 \\cdot \\text{H}_2\\text{O}$$",
        },
      ],
    },
  },
};

export default item;
