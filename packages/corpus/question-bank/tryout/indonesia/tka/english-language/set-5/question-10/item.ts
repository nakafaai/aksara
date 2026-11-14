import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "fact-opinion",
  },
  stimulus: "cave-visit",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Looking back, I also think the museum was the most important part.",
        },
        {
          correct: false,
          label:
            "We left at six in the morning and reached the entrance just before nine.",
        },
        {
          correct: false,
          label: "It displayed photographs of the cave from fifty years ago.",
        },
        {
          correct: false,
          label: "Pak Darto asked everyone to switch off their headlamps.",
        },
        {
          correct: false,
          label:
            "On the bus home, our teacher asked us to write one sentence about the trip.",
        },
      ],
    },
  },
};

export default item;
