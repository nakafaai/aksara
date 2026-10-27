import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "cause-effect",
  },
  stimulus: "gamelan-rehearsal",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The writer had not practiced the melody enough at home before the rehearsals.",
        },
        {
          correct: false,
          label: "The other players were not keeping a steady beat.",
        },
        {
          correct: false,
          label: "The drummer changed the speed without giving any signal.",
        },
        {
          correct: true,
          label:
            "The writer kept counting instead of following the drummer's changes in speed.",
        },
        {
          correct: false,
          label:
            "The writer's saron was too quiet to be heard over the other instruments.",
        },
      ],
    },
  },
};

export default item;
