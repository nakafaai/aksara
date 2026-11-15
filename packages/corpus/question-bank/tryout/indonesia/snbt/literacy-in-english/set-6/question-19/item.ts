import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "characterization",
  },
  stimulus: "piano-lessons",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "She praised a performance so bad that the narrator stopped in the middle.",
        },
        {
          correct: true,
          label:
            "She asked for the slow movement to be played louder and louder.",
        },
        {
          correct: false,
          label:
            "She told the narrator's mother that she had taught her everything she could.",
        },
        {
          correct: true,
          label:
            "She watched the metronome's swinging arm rather than listening for its tick.",
        },
        {
          correct: true,
          label: "She did not move when the telephone rang in the hall.",
        },
      ],
    },
  },
};

export default item;
