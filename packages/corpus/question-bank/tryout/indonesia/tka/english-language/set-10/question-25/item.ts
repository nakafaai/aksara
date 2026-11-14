import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "reader-response",
  },
  stimulus: "coding-club",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "“The club should not start, because attendance dropped by a few students.”",
        },
        {
          correct: true,
          label:
            "“A one-semester trial with feedback seems a sensible way to see whether a regular club works.”",
        },
        {
          correct: false,
          label: "“Every student should be made to join the coding club.”",
        },
        {
          correct: false,
          label:
            "“The school should close the football club to make room for coding.”",
        },
        {
          correct: false,
          label:
            "“Coding will definitely make every student better at mathematics.”",
        },
      ],
    },
  },
};

export default item;
