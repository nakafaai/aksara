import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "paraphrase",
  },
  stimulus: "ant-foraging",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The researchers timed each trial and found that the short branch was the one the colony settled on fastest.",
        },
        {
          correct: false,
          label:
            "Ants on the short branch got home sooner, which shows that each ant learns to prefer the quicker of two routes.",
        },
        {
          correct: true,
          label:
            "Round trips on the short branch ended sooner, so it was re-marked first and that small lead kept on growing.",
        },
        {
          correct: false,
          label:
            "Given enough time, any colony will move from a long route to a shorter one once both routes are available.",
        },
        {
          correct: false,
          label:
            "The short branch won because its scent faded more slowly than the scent laid along the long branch.",
        },
      ],
    },
  },
};

export default item;
