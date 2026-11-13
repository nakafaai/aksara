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
            "A caretaker's mistake ruined a radio club's first broadcast, so the club stopped trusting the school staff.",
        },
        {
          correct: false,
          label:
            "After two weeks of rehearsals, a radio club's first live broadcast went smoothly apart from a short delay.",
        },
        {
          correct: true,
          label:
            "A radio club's first broadcast went unheard because a cable had been moved, a fault its headphone checks could not reveal, so the club now confirms from a classroom that listeners can hear.",
        },
        {
          correct: false,
          label:
            "A radio club learned that live broadcasts are too risky and moved to recorded programmes.",
        },
        {
          correct: false,
          label:
            "A host kept talking for four minutes to a silent school because her headphones had stopped working.",
        },
      ],
    },
  },
};

export default item;
