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
            "the four minutes on the club's recording, Rina's microphone test, Pak Hadi's knock, the cable found, Dimas's message",
        },
        {
          correct: false,
          label:
            "Rina's microphone test, Pak Hadi's knock, the four minutes on the club's recording, the cable found, Dimas's message",
        },
        {
          correct: false,
          label:
            "Rina's microphone test, the four minutes on the club's recording, the cable found, Pak Hadi's knock, Dimas's message",
        },
        {
          correct: false,
          label:
            "Dimas's message, Rina's microphone test, the four minutes on the club's recording, Pak Hadi's knock, the cable found",
        },
        {
          correct: true,
          label:
            "Rina's microphone test, the four minutes on the club's recording, Pak Hadi's knock, the cable found, Dimas's message",
        },
      ],
    },
  },
};

export default item;
