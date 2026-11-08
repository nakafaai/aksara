import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "railway-time",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bristol's clockmakers were unable to build a clock that kept accurate time.",
        },
        {
          correct: true,
          label:
            "For a time, people in Bristol lived with both local time and railway time.",
        },
        {
          correct: false,
          label:
            "Bristol's station kept local time until Parliament changed the law in 1880.",
        },
        {
          correct: false,
          label:
            "The clock was built in 1880 to celebrate the new law on Greenwich time.",
        },
        {
          correct: false,
          label:
            "Visitors to Bristol might have used the clock to time their journeys by sea.",
        },
      ],
    },
  },
};

export default item;
