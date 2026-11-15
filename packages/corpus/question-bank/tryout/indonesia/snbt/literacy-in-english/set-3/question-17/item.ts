import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "application",
  },
  stimulus: "clinic-interpreter",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A job applicant who understands every question but feels the interviewer judging him by his accent rather than his answers.",
        },
        {
          correct: false,
          label:
            "An immigrant who cannot follow a fast-talking official and asks his son to explain the forms.",
        },
        {
          correct: false,
          label:
            "A patient who understands the diagnosis perfectly but dreads hearing bad news at all.",
        },
        {
          correct: false,
          label:
            "A student who fails an exam because the questions were harder than anything taught in class.",
        },
        {
          correct: false,
          label:
            "A tourist who cannot read the menu and has to point at the pictures to order a meal.",
        },
      ],
    },
  },
};

export default item;
