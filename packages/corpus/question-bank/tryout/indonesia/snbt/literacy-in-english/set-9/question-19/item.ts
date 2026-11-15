import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "map-projection",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A country near latitude $$60^\\circ$$ appears about four times its true area, so it would have to be shrunk to about a quarter for a fair comparison.",
        },
        {
          correct: false,
          label:
            "A country near latitude $$60^\\circ$$ appears about twice its true area, since every length there is doubled.",
        },
        {
          correct: true,
          label:
            "Greenland, which lies even farther from the equator, is enlarged by more than four times.",
        },
        {
          correct: false,
          label:
            "Because the shapes of small areas stay true, a small island near latitude $$60^\\circ$$ also shows its true area.",
        },
        {
          correct: true,
          label:
            "On an equal-area map, Greenland would cover about one fourteenth of the area that Africa covers.",
        },
      ],
    },
  },
};

export default item;
