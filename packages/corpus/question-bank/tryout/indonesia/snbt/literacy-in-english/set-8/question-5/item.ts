import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "ocean-acidification",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It makes the same prediction as the headlines but rests on stronger evidence than the commentators' reading.",
        },
        {
          correct: false,
          label:
            "It covers fewer species than the headlines mention but more species than the commentators are willing to include.",
        },
        {
          correct: true,
          label:
            "It claims less than the headlines about what will happen to particular populations, yet stands on better grounds than the view that varied results mean little danger.",
        },
        {
          correct: false,
          label:
            "It is less certain than the headlines and also less certain than the commentators' reading of the tank results.",
        },
        {
          correct: false,
          label:
            "It agrees with the commentators that the danger is smaller than feared, but it states that agreement more firmly than they do.",
        },
      ],
    },
  },
};

export default item;
