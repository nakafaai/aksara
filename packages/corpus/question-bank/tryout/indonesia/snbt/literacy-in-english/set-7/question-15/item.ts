import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "cycling-safety",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Eastvale's rate would fall from $$6$$ to $$4$$ injuries per million kilometres.",
        },
        {
          correct: true,
          label: "Eastvale's rate would still be higher than Riverton's.",
        },
        {
          correct: false,
          label: "Eastvale would now be safer to cycle in than Riverton.",
        },
        {
          correct: true,
          label:
            "Eastvale's number of injuries would rise even though its rate fell.",
        },
        {
          correct: false,
          label:
            "Each Eastvale resident would now cycle more, on average, than each Riverton resident.",
        },
      ],
    },
  },
};

export default item;
