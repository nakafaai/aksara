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
        { correct: false, label: "Pentane, $$5.33\\text{ g}$$, pH $$1.0$$" },
        {
          correct: true,
          label: "2,2-Dimethylpropane, $$5.33\\text{ g}$$, pH $$1.0$$",
        },
        {
          correct: false,
          label: "2,2-Dimethylpropane, $$5.33\\text{ g}$$, pH $$0.70$$",
        },
        {
          correct: false,
          label: "2,2-Dimethylpropane, $$3.55\\text{ g}$$, pH $$1.0$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Pentana, $$5.33\\text{ g}$$, pH $$1.0$$" },
        {
          correct: true,
          label: "2,2-Dimetilpropana, $$5.33\\text{ g}$$, pH $$1.0$$",
        },
        {
          correct: false,
          label: "2,2-Dimetilpropana, $$5.33\\text{ g}$$, pH $$0.70$$",
        },
        {
          correct: false,
          label: "2,2-Dimetilpropana, $$3.55\\text{ g}$$, pH $$1.0$$",
        },
      ],
    },
  },
};

export default item;
