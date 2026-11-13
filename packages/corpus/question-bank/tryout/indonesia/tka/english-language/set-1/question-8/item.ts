import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "gauge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "(1) why the scale must be tested, (2) the test pours and the table, (3) setting the zero line, (4) the failed first trial and its cause, (5) rules for daily use",
        },
        {
          correct: false,
          label:
            "(1) why the scale must be tested, (2) setting the zero line, (3) the test pours and the table, (4) rules for daily use, (5) the failed first trial and its cause",
        },
        {
          correct: true,
          label:
            "(1) why the scale must be tested, (2) setting the zero line, (3) the test pours and the table, (4) the failed first trial and its cause, (5) rules for daily use",
        },
        {
          correct: false,
          label:
            "(1) why rain is measured in millilitres, (2) setting the zero line, (3) the test pours and the table, (4) the failed first trial and its cause, (5) rules for daily use",
        },
        {
          correct: false,
          label:
            "(1) why the scale must be tested, (2) setting the zero line, (3) the test pours and the table, (4) the failed first trial, traced to a leak, (5) rules for daily use",
        },
      ],
    },
  },
};

export default item;
