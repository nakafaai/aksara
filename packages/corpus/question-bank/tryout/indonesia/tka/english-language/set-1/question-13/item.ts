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
            "The cable was pushed into AUX 2 between Rina's microphone test and the start of the broadcast.",
        },
        {
          correct: true,
          label:
            "The fault that silenced the classrooms already existed when Rina tested her microphone.",
        },
        {
          correct: false,
          label:
            "Holding the final rehearsal after the painting would have revealed the fault before Monday.",
        },
        {
          correct: false,
          label:
            "Pak Hadi reached the studio window within a minute of the speakers going silent.",
        },
        {
          correct: false,
          label:
            "The club first checked the sound from a classroom on the Monday it went live.",
        },
      ],
    },
  },
};

export default item;
