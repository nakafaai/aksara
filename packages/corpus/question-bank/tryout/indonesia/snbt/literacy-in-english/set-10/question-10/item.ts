import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "homeschooling",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "By granting that the family's success may be real, but arguing that it will probably fade as the children's work gets harder.",
        },
        {
          correct: true,
          label:
            "By granting that the family's success may be real, but noting that families for whom it works share their stories most, so one story says little in general.",
        },
        {
          correct: false,
          label:
            "By granting that the family's success may be real, and agreeing that the survey figures show many other families got the same results.",
        },
        {
          correct: false,
          label:
            "By granting that the family's success may be real, and calling for studies of children who move between home and school, which would show her result is typical.",
        },
        {
          correct: false,
          label:
            "By rejecting the story as unreliable, since families whose homeschooling went well rarely write about it.",
        },
      ],
    },
  },
};

export default item;
