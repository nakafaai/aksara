import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$43^\\circ\\text{C}$$, $$746^\\circ\\text{C}$$, and $$22\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40^\\circ\\text{C}$$, $$885^\\circ\\text{C}$$, and $$19\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$40^\\circ\\text{C}$$, $$885^\\circ\\text{C}$$, and $$10\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40^\\circ\\text{C}$$, $$885^\\circ\\text{C}$$, and $$78\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$43^\\circ\\text{C}$$, $$746^\\circ\\text{C}$$, dan $$22\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40^\\circ\\text{C}$$, $$885^\\circ\\text{C}$$, dan $$19\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$40^\\circ\\text{C}$$, $$885^\\circ\\text{C}$$, dan $$10\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40^\\circ\\text{C}$$, $$885^\\circ\\text{C}$$, dan $$78\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
