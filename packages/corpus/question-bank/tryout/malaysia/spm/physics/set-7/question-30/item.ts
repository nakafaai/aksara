import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$300\\text{ W}$$, $$2.1\\text{ A}$$ and $$0.10\\text{ kW h}$$",
        },
        {
          correct: true,
          label:
            "$$320\\text{ W}$$, $$2.2\\text{ A}$$ and $$0.11\\text{ kW h}$$",
        },
        {
          correct: false,
          label:
            "$$320\\text{ W}$$, $$0.79\\text{ A}$$ and $$0.040\\text{ kW h}$$",
        },
        {
          correct: false,
          label:
            "$$320\\text{ W}$$, $$2.2\\text{ A}$$ and $$6.6\\text{ kW h}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$300\\text{ W}$$, $$2.1\\text{ A}$$ dan $$0.10\\text{ kW j}$$",
        },
        {
          correct: true,
          label:
            "$$320\\text{ W}$$, $$2.2\\text{ A}$$ dan $$0.11\\text{ kW j}$$",
        },
        {
          correct: false,
          label:
            "$$320\\text{ W}$$, $$0.79\\text{ A}$$ dan $$0.040\\text{ kW j}$$",
        },
        {
          correct: false,
          label:
            "$$320\\text{ W}$$, $$2.2\\text{ A}$$ dan $$6.6\\text{ kW j}$$",
        },
      ],
    },
  },
};

export default item;
