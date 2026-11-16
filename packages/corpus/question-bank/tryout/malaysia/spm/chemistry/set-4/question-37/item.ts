import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$36\\text{ kg}$$ of water, and a percentage yield of $$83\\%$$",
        },
        {
          correct: true,
          label:
            "$$72\\text{ kg}$$ of water, and a percentage yield of $$90\\%$$",
        },
        {
          correct: false,
          label:
            "$$72\\text{ kg}$$ of water, and a percentage yield of $$78\\%$$",
        },
        {
          correct: false,
          label:
            "No water, because nylon-6,6 is an addition polymer, and a percentage yield of $$78\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$36\\text{ kg}$$ air, dan peratus hasil $$83\\%$$",
        },
        {
          correct: true,
          label: "$$72\\text{ kg}$$ air, dan peratus hasil $$90\\%$$",
        },
        {
          correct: false,
          label: "$$72\\text{ kg}$$ air, dan peratus hasil $$78\\%$$",
        },
        {
          correct: false,
          label:
            "Tiada air, kerana nilon-6,6 ialah polimer penambahan, dan peratus hasil $$78\\%$$",
        },
      ],
    },
  },
};

export default item;
