import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "vocabulary-in-context",
  },
  stimulus: "continental-drift",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The popular version praises the scientists who later confirmed drift far more warmly than it praises Wegener, who first proposed the idea.",
        },
        {
          correct: true,
          label:
            "The popular version judges the debate by what was learned decades afterwards, and so passes over objections that were sound when they were raised.",
        },
        {
          correct: false,
          label:
            "The popular version overstates how much evidence Wegener had gathered, since his fossils, rock layers and coastlines were all far weaker than the story usually suggests to its readers.",
        },
        {
          correct: false,
          label:
            "The popular version hides the fact that Wegener's critics had measured the drift of Greenland far more accurately than he had.",
        },
        {
          correct: false,
          label:
            "The popular version blames critics for rejecting a theory that physicists had already confirmed by the time of the New York symposium.",
        },
      ],
    },
  },
};

export default item;
