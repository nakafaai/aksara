import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "waggle-dance",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Released recruits reached the feeder sooner than the others, which showed that the dance gives an exact spot rather than a rough area.",
        },
        {
          correct: false,
          label:
            "Released recruits no longer had the dancer's scent to follow, so every flight they made must have been guided by the dance alone.",
        },
        {
          correct: false,
          label:
            "Released recruits searched near the feeder for a long time, and that delay is something only von Frisch's explanation predicts.",
        },
        {
          correct: true,
          label:
            "A scent-follower and a dance-reader could both reach the feeder from the hive, but only a dance-reader would fly the given bearing and miss it.",
        },
        {
          correct: false,
          label:
            "Released recruits flew the same bearing as the recruits in Gould's experiment, so the radar study simply repeated his result with new tools.",
        },
      ],
    },
  },
};

export default item;
