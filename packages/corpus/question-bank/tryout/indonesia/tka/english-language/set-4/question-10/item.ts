import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Practicing alone at home is a waste of time for musicians who play in a group.",
        },
        {
          isCorrect: true,
          label:
            "Playing in a group takes both a well-learned part and attention to the person who leads.",
        },
        {
          isCorrect: false,
          label:
            "Good musicians should trust their own counting, whatever the other players are doing.",
        },
        {
          isCorrect: false,
          label:
            "Teachers should stop a rehearsal every time one player makes a mistake in the melody.",
        },
        {
          isCorrect: false,
          label:
            "A concert goes well when the players are free to choose their own speed.",
        },
      ],
    },
  },
  stimulusKey: "gamelan-rehearsal",
};

export default item;
