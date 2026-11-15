import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "characterization",
  },
  stimulus: "river-ferry",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A woman brings a cake, and the man in the council jacket calls it the end of an era.",
        },
        {
          correct: true,
          label:
            'He cuts the engine halfway over on the last crossing and lets the boat drift in silence, and the next day he stays home from the opening with a "bad knee".',
        },
        {
          correct: false,
          label:
            "He cuts the engine halfway over on the last crossing and lets the boat drift in silence, and the ferry is to be sold to a company that wants it for parts.",
        },
        {
          correct: false,
          label:
            'He stays home from the opening with a "bad knee", and the bridge has been growing out of both banks for three summers.',
        },
        {
          correct: false,
          label:
            "Two boys ride back and forth without paying, and the bridge lights are switched on for a test.",
        },
      ],
    },
  },
};

export default item;
