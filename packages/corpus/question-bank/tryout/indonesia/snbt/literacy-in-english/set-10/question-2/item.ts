import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The $$2.78\\,\\text{V}$$ series mean proves that placing two cells in series will produce the same voltage in every circuit.",
        },
        {
          correct: false,
          label:
            "The similar one-cell and parallel means show that cell arrangement has no effect, so the series result should be ignored as an outlier.",
        },
        {
          correct: false,
          label:
            "The measurements provide no useful evidence until a later experiment reproduces every mean to the same decimal places.",
        },
        {
          correct: true,
          label:
            "Under one fixed load, the series mean was $$2.78\\,\\text{V}$$ compared with $$1.46\\,\\text{V}$$ and $$1.44\\,\\text{V}$$. Unmeasured internal resistance and the single load limit broader claims.",
        },
        {
          correct: false,
          label:
            "Because the series mean was the largest, the one-cell and parallel conditions are unnecessary when interpreting the result.",
        },
      ],
    },
  },
};

export default item;
