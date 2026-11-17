import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "metabolism-and-enzymes",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3$$ coated capsules or $$58$$ plain capsules, because each coated capsule gives $$25\\,000$$ units of activity in the duodenum.",
        },
        {
          correct: false,
          label:
            "$$8$$ coated capsules or $$8$$ plain capsules, because Z works again once it leaves the acid of the stomach.",
        },
        {
          correct: true,
          label:
            "$$8$$ coated capsules or $$144$$ plain capsules, because each coated capsule gives $$10\\,000$$ units of activity in the duodenum.",
        },
        {
          correct: false,
          label:
            "$$7$$ coated capsules or $$144$$ plain capsules, because each coated capsule gives $$10\\,000$$ units of activity in the duodenum.",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3$$ kapsul bersalut atau $$58$$ kapsul biasa, kerana setiap kapsul bersalut memberi $$25\\,000$$ unit aktiviti di dalam duodenum.",
        },
        {
          correct: false,
          label:
            "$$8$$ kapsul bersalut atau $$8$$ kapsul biasa, kerana Z bertindak semula sebaik sahaja Z meninggalkan asid perut.",
        },
        {
          correct: true,
          label:
            "$$8$$ kapsul bersalut atau $$144$$ kapsul biasa, kerana setiap kapsul bersalut memberi $$10\\,000$$ unit aktiviti di dalam duodenum.",
        },
        {
          correct: false,
          label:
            "$$7$$ kapsul bersalut atau $$144$$ kapsul biasa, kerana setiap kapsul bersalut memberi $$10\\,000$$ unit aktiviti di dalam duodenum.",
        },
      ],
    },
  },
};

export default item;
