import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "clinic-reminders",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6$$, the gap between $$10\\%$$ and $$4\\%$$ in 2024.",
        },
        {
          correct: false,
          label:
            "$$1$$, the fall in the signed-up group from $$5\\%$$ to $$4\\%$$.",
        },
        {
          correct: false,
          label:
            "$$5$$, the fall from the clinic's $$9\\%$$ in 2023 to $$4\\%$$.",
        },
        {
          correct: false,
          label:
            "$$2$$, the fall in the signed-up group added to the fall in the other group.",
        },
        {
          correct: true,
          label:
            "$$0$$, because the group without reminders fell by the same amount.",
        },
      ],
    },
  },
};

export default item;
