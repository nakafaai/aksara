import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  stimulus: "broadcast",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Two weeks of rehearsal were too few, so the club should have practised for longer.",
        },
        {
          correct: false,
          label:
            "The club should have held a full rehearsal on Monday morning instead of only testing the microphone.",
        },
        {
          correct: false,
          label:
            "The caretaker should have asked the club before touching the amplifier.",
        },
        {
          correct: false,
          label:
            "Rina should have listened more carefully to her headphones during the broadcast.",
        },
        {
          correct: true,
          label:
            "Every check the club ran listened at the studio end, so none of them could catch a fault on the way to the classrooms, which is the gap Dimas's message now covers.",
        },
      ],
    },
  },
};

export default item;
