import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "ant-foraging",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "They show that colonies favour shorter routes less than popular accounts suggest, since most colonies in the experiments ended on the longer branch.",
        },
        {
          correct: false,
          label:
            "They reveal a weakness that faster-fading pheromone would remove, which is why real species have probably evolved short-lived trails.",
        },
        {
          correct: true,
          label:
            "They show a cost of the same feedback that finds short routes, a cost that is usually worth paying where food sources stay put.",
        },
        {
          correct: false,
          label:
            "They prove that a colony cannot solve shortest-path problems at all, so the writers who claim it can are simply mistaken.",
        },
        {
          correct: false,
          label:
            "They arise because experienced foragers follow a remembered route, which holds the colony on the old branch even when the trail changes.",
        },
      ],
    },
  },
};

export default item;
