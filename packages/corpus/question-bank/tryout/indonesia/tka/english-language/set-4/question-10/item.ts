import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  stimulus: "gamelan-rehearsal",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Practicing alone at home is a waste of time for musicians who play in a group.",
        },
        {
          correct: true,
          label:
            "Playing in a group takes both a well-learned part and attention to the person who leads.",
        },
        {
          correct: false,
          label:
            "Good musicians should trust their own counting, whatever the other players are doing.",
        },
        {
          correct: false,
          label:
            "Teachers should stop a rehearsal every time one player makes a mistake in the melody.",
        },
        {
          correct: false,
          label:
            "A concert goes well when the players are free to choose their own speed.",
        },
      ],
    },
  },
};

export default item;
