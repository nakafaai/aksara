import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "driverless-liability",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "It accepts that manufacturers should finally pay for faults in their systems, but it rejects making them the party victims claim from and denies that the owner's choices stop mattering.",
        },
        {
          correct: false,
          label:
            "It rejects the rule because owners chose to buy their cars and switch the systems on, so owners should carry the cost of the crashes that follow.",
        },
        {
          correct: false,
          label:
            "It accepts the rule in full and adds only that insurers should pay victims while the dispute with the manufacturer is being settled.",
        },
        {
          correct: false,
          label:
            "It accepts the rule for crashes caused by software faults but argues that a failed handover should always be the owner's responsibility.",
        },
        {
          correct: false,
          label:
            "It rejects the rule because manufacturers, unlike owners, cannot see what the car's software decided in the moments before a crash.",
        },
      ],
    },
  },
};

export default item;
