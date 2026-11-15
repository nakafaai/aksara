import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "bus-punctuality",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "For both operators, rural trips were on time more often than urban trips.",
        },
        {
          correct: true,
          label:
            "Run at its own rates on Northline's mix of $$800$$ urban and $$200$$ rural trips, Southway would have an overall rate of about $$69\\%$$.",
        },
        {
          correct: false,
          label:
            "Southway's drivers take more care to keep to the timetable than Northline's drivers.",
        },
        {
          correct: false,
          label: "Northline ran more trips on time in total than Southway did.",
        },
        {
          correct: true,
          label: "Each operator ran $$1{,}000$$ trips last year.",
        },
      ],
    },
  },
};

export default item;
