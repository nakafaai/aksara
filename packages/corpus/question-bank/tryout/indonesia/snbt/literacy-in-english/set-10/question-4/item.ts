import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "ant-foraging",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "In a repeat of the delayed test, colonies stayed on the long branch just as often when its scent was wiped off at the moment the shortcut was added.",
        },
        {
          correct: false,
          label:
            "In a repeat of the delayed test, colonies switched to the shortcut far more often when the long branch's scent was wiped off as the shortcut was added.",
        },
        {
          correct: false,
          label:
            "In computer simulations, colonies whose trails faded very quickly never settled on either branch of the bridge at all.",
        },
        {
          correct: false,
          label:
            "When both branches of the bridge were open from the start, a few colonies still settled on the long branch.",
        },
        {
          correct: false,
          label:
            "In a different ant species, experienced foragers kept to a remembered route after the trail laid along it had been moved.",
        },
      ],
    },
  },
};

export default item;
