import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "hawthorne-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The report is right to set the rise aside, since the reanalysed lighting records traced such rises to the calendar rather than to real change.",
        },
        {
          correct: false,
          label:
            "The report is right that the rise is not real learning, since any improvement in a group under study counts as a Hawthorne effect.",
        },
        {
          correct: false,
          label:
            "The report should credit the inspectors' attention for the rise, since attention is the cause that the label refers to.",
        },
        {
          correct: false,
          label:
            "The report should accept the rise as real learning, since the 2014 review found that the effect could not be measured.",
        },
        {
          correct: true,
          label:
            "The report has not yet explained the rise, and it still has to show which feature of the inspected term actually changed the scores.",
        },
      ],
    },
  },
};

export default item;
