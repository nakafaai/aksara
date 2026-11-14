import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "nuclear-power",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "It grants Text 1's facts about overruns and the value of early cuts but disputes that money for reactors must come at the expense of wind and solar.",
        },
        {
          correct: false,
          label:
            "It rejects Text 1's account of overruns, arguing that critics have exaggerated how late and costly the recent reactor projects really were.",
        },
        {
          correct: false,
          label:
            "It agrees with Text 1 that new reactors should wait until storage has been given a fair trial, but argues that the trial will take longer.",
        },
        {
          correct: false,
          label:
            "It accepts Text 1's reasoning in full and adds only that the country's existing reactors should keep running for as long as they are safe.",
        },
        {
          correct: false,
          label:
            "It concedes that reactors cost more than wind and solar when compared plant by plant, but argues that their low emissions justify the long delays that Text 1 objects to.",
        },
      ],
    },
  },
};

export default item;
