import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  stimulus: "compost-heap",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A heap mixed by weight, three kilograms of browns to one of greens, is likely to stay cold.",
        },
        {
          correct: true,
          label: "A heap with too many greens smells of ammonia.",
        },
        {
          correct: false,
          label:
            "A heap that smells sour after eight weeks cannot be turned, because turning stops after six weeks.",
        },
        {
          correct: false,
          label:
            "A heap that reaches $$60^\\circ\\text{C}$$ in its first week is too wet.",
        },
        {
          correct: true,
          label:
            "A damp heap that stays cold in its first week and has no smell needs more greens, not water.",
        },
      ],
    },
  },
};

export default item;
