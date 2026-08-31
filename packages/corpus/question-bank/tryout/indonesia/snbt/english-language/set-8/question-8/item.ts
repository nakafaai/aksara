import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because the trial reached 31, compared with a baseline of 19 and a comparison value of 20, a shared glossary with examples from each participant should become permanent before the stated limitation is examined.",
        },
        {
          isCorrect: true,
          label:
            "The rise to 31, compared with a baseline of 19 and a comparison value of 20 supports a limited extension of a shared glossary with examples from each participant, while the fact that one glossary could not capture every regional or family usage must shape the follow-up.",
        },
        {
          isCorrect: false,
          label:
            "The consultation with affected groups makes the baseline and comparison figures unnecessary for the decision.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that one glossary could not capture every regional or family usage affects delivery details, but it does not restrict who can be covered by the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "Because staffing and schedules were stable, the difference between the trial and comparison is best attributed to those unchanged conditions.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
