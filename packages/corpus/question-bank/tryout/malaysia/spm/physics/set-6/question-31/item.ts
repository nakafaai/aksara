import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "RM $$12$$ a day, saving RM $$240$$ a month" },
        { correct: true, label: "RM $$4.80$$ a day, saving RM $$96$$ a month" },
        {
          correct: false,
          label: "RM $$7.20$$ a day, saving RM $$144$$ a month",
        },
        {
          correct: false,
          label: "RM $$4.80$$ a day, saving RM $$48$$ a month",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "RM $$12$$ sehari, menjimatkan RM $$240$$ sebulan",
        },
        {
          correct: true,
          label: "RM $$4.80$$ sehari, menjimatkan RM $$96$$ sebulan",
        },
        {
          correct: false,
          label: "RM $$7.20$$ sehari, menjimatkan RM $$144$$ sebulan",
        },
        {
          correct: false,
          label: "RM $$4.80$$ sehari, menjimatkan RM $$48$$ sebulan",
        },
      ],
    },
  },
};

export default item;
