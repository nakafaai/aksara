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
          correct: true,
          label:
            "The length of the limit matters less than whether the work set within it, such as recall practice, is worth doing.",
        },
        {
          correct: false,
          label:
            "The claim is right, because the pilot showed that scores hold steady once homework is removed.",
        },
        {
          correct: true,
          label:
            "Cutting older pupils' homework to nothing could hurt most the pupils who have the least help at home.",
        },
        {
          correct: false,
          label:
            "A limit of $$40$$ minutes is too little for pupils facing exams, so for those pupils it should be raised rather than cut.",
        },
        {
          correct: false,
          label:
            "A limit of any length is a mistake, because it teaches pupils that learning stops when a timer rings.",
        },
      ],
    },
  },
};

export default item;
