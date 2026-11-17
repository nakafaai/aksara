import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$12\\text{ W}$$, $$17\\text{ V}$$ r.m.s., and a peak current of $$4.0\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$6.0\\text{ W}$$, $$24\\text{ V}$$ r.m.s., and a peak current of $$5.7\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$12\\text{ W}$$, $$24\\text{ V}$$ r.m.s., and a peak current of $$5.7\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$24\\text{ W}$$, $$12\\text{ V}$$ r.m.s., and a peak current of $$2.8\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$12\\text{ W}$$, $$17\\text{ V}$$ p.m.k.d., dan arus puncak $$4.0\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$6.0\\text{ W}$$, $$24\\text{ V}$$ p.m.k.d., dan arus puncak $$5.7\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$12\\text{ W}$$, $$24\\text{ V}$$ p.m.k.d., dan arus puncak $$5.7\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$24\\text{ W}$$, $$12\\text{ V}$$ p.m.k.d., dan arus puncak $$2.8\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
