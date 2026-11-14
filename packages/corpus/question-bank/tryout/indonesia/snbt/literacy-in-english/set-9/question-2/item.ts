import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "hawthorne-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A second relay group, given the same output reports and group pay, was watched just as closely, and its output also climbed.",
        },
        {
          correct: true,
          label:
            "A second relay group, watched just as closely but paid a flat wage and told nothing about its output, showed no climb.",
        },
        {
          correct: false,
          label:
            "A second relay group, paid a flat wage and told nothing about its output, still climbed while being watched just as closely.",
        },
        {
          correct: false,
          label:
            "Output in the relay room, like output in the lighting tests, tended to be higher on Mondays than later in the week.",
        },
        {
          correct: false,
          label:
            "Women from the relay room later said in interviews that they had enjoyed the interest the researchers took in them.",
        },
      ],
    },
  },
};

export default item;
