import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "batik-wax",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "batik cap, karena motifnya berulang rapi dan ada retakan malam",
        },
        {
          correct: false,
          label:
            "batik tulis, karena garis retakan hanya muncul pada batik tulis",
        },
        {
          correct: false,
          label: "tekstil bermotif batik, karena motifnya berulang dengan rapi",
        },
        {
          correct: false,
          label: "batik tulis, karena motif buatan tangan selalu sama persis",
        },
        {
          correct: false,
          label: "tekstil bermotif batik, karena dibuat dengan cap tembaga",
        },
      ],
    },
  },
};

export default item;
