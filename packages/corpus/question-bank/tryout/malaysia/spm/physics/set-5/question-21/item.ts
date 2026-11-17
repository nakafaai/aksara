import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "At least $$9.4^\\circ$$, with the ends $$17\\text{ cm}$$ below the hooks",
        },
        {
          correct: false,
          label:
            "At least $$7.5^\\circ$$, with the ends $$13\\text{ cm}$$ below the hooks",
        },
        {
          correct: false,
          label:
            "At least $$19^\\circ$$, with the ends $$35\\text{ cm}$$ below the hooks",
        },
        {
          correct: false,
          label:
            "At least $$9.4^\\circ$$, with the ends $$33\\text{ cm}$$ below the hooks",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sekurang-kurangnya $$9.4^\\circ$$, dengan hujungnya $$17\\text{ cm}$$ di bawah cangkuk",
        },
        {
          correct: false,
          label:
            "Sekurang-kurangnya $$7.5^\\circ$$, dengan hujungnya $$13\\text{ cm}$$ di bawah cangkuk",
        },
        {
          correct: false,
          label:
            "Sekurang-kurangnya $$19^\\circ$$, dengan hujungnya $$35\\text{ cm}$$ di bawah cangkuk",
        },
        {
          correct: false,
          label:
            "Sekurang-kurangnya $$9.4^\\circ$$, dengan hujungnya $$33\\text{ cm}$$ di bawah cangkuk",
        },
      ],
    },
  },
};

export default item;
