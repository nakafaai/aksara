import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The writer had not practiced the melody enough at home before the rehearsals.",
        },
        {
          isCorrect: false,
          label: "The other players were not keeping a steady beat.",
        },
        {
          isCorrect: false,
          label: "The drummer changed the speed without giving any signal.",
        },
        {
          isCorrect: true,
          label:
            "The writer kept counting instead of following the drummer's changes in speed.",
        },
        {
          isCorrect: false,
          label:
            "The writer's saron was too quiet to be heard over the other instruments.",
        },
      ],
    },
  },
  stimulusKey: "gamelan-rehearsal",
};

export default item;
