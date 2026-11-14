import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "cause-effect",
  },
  stimulus: "beach-cleanup",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The stretch near the river mouth had far more rubbish than the stretches farther away.",
        },
        {
          correct: false,
          label: "The writer's group found a toothbrush and a flip-flop.",
        },
        { correct: false, label: "Most of the waste was thin snack wrappers." },
        { correct: false, label: "Most of the volunteers came from the town." },
        { correct: false, label: "The university team had already proven it." },
      ],
    },
  },
};

export default item;
