import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$10^{18}$$ nanocubes, $$600\\text{ m}^2$$" },
        { correct: false, label: "$$10^{18}$$ nanocubes, $$6.0\\text{ m}^2$$" },
        { correct: false, label: "$$10^{6}$$ nanocubes, $$600\\text{ m}^2$$" },
        {
          correct: false,
          label: "$$10^{18}$$ nanocubes, $$6.0\\times10^{-4}\\text{ m}^2$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$10^{18}$$ nanokiub, $$600\\text{ m}^2$$" },
        { correct: false, label: "$$10^{18}$$ nanokiub, $$6.0\\text{ m}^2$$" },
        { correct: false, label: "$$10^{6}$$ nanokiub, $$600\\text{ m}^2$$" },
        {
          correct: false,
          label: "$$10^{18}$$ nanokiub, $$6.0\\times10^{-4}\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
