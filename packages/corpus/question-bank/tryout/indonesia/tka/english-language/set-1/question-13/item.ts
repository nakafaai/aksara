import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "broadcast",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The caretaker moved the cable before the club's final rehearsal.",
        },
        {
          correct: true,
          label:
            "The cable was already in the wrong socket when Rina tested her microphone on Monday.",
        },
        {
          correct: false,
          label:
            "Rina realised at two minutes past seven that the speakers had gone silent.",
        },
        {
          correct: false,
          label:
            "The club recorded that Monday's broadcast only after the cable had been fixed.",
        },
        {
          correct: false,
          label: "The classroom check began with the Monday broadcast.",
        },
      ],
    },
  },
};

export default item;
