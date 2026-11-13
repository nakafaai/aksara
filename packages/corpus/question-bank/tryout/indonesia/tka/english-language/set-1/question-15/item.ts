import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "broadcast",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A radio club's first live broadcast went unheard because the caretaker broke the amplifier, so the club now labels its sockets in red tape.",
        },
        {
          correct: false,
          label:
            "A radio club's first live broadcast went unheard because the host's headphones were faulty, so the club now has someone listen from a classroom.",
        },
        {
          correct: true,
          label:
            "A radio club's first live broadcast went unheard because a cable had been moved, a fault its studio checks could not reveal, so the club now confirms from a classroom that listeners can hear.",
        },
        {
          correct: false,
          label:
            "A radio club's first live broadcast went unheard because a cable had been moved, so the club now rehearses with headphones before every broadcast.",
        },
        {
          correct: false,
          label:
            "A radio club's first live broadcast went unheard because a cable had been moved, and after the room changes went wrong, the club stopped broadcasting live.",
        },
      ],
    },
  },
};

export default item;
