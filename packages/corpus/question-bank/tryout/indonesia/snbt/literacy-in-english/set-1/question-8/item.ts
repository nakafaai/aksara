import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "homework-limits",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The claim is right, because the pilot showed that scores hold steady once homework is removed.",
        },
        {
          correct: true,
          label:
            "The length of the limit matters less than whether the work set within it, such as recall practice, is worth doing.",
        },
        {
          correct: false,
          label:
            "A limit of $$40$$ minutes is too little for pupils facing exams, so it should be raised for them.",
        },
        {
          correct: false,
          label:
            "A limit of any length is a mistake, because it teaches pupils that learning stops when a timer rings.",
        },
        {
          correct: false,
          label:
            "The claim holds for pupils who have just started secondary school but not for pupils facing exams.",
        },
      ],
    },
  },
};

export default item;
