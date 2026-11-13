import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "outline",
  },
  stimulus: "broadcast",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pak Hadi's knock, the final rehearsal, the office painting, the repeated announcement, the classroom check",
        },
        {
          correct: false,
          label:
            "the office painting, the final rehearsal, Pak Hadi's knock, the repeated announcement, the classroom check",
        },
        {
          correct: false,
          label:
            "the final rehearsal, the office painting, Pak Hadi's knock, the classroom check, the repeated announcement",
        },
        {
          correct: false,
          label:
            "the final rehearsal, the office painting, the repeated announcement, Pak Hadi's knock, the classroom check",
        },
        {
          correct: true,
          label:
            "the final rehearsal, the office painting, Pak Hadi's knock, the repeated announcement, the classroom check",
        },
      ],
    },
  },
};

export default item;
