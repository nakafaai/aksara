import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "hawthorne-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It confirms Parsons's explanation, because both show the workers were reacting to information about output rather than to attention.",
        },
        {
          correct: false,
          label:
            "It undercuts Parsons's explanation, because a pattern tied to the day of the week could account for the relay group's climb.",
        },
        {
          correct: false,
          label:
            "It extends Parsons's explanation, adding the calendar to feedback and pay as a cause of the climb in the relay room.",
        },
        {
          correct: false,
          label:
            "It shows Parsons was wrong to set attention aside, because Levitt and List also found signs of workers responding to being studied.",
        },
        {
          correct: true,
          label:
            "It gives a different dull explanation for a different set of tests, so it bears on the lighting legend, not on his account of the relay room.",
        },
      ],
    },
  },
};

export default item;
