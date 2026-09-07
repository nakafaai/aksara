import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Bedienenden im Aufnahmestudio der Schule gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Bedienenden im Aufnahmestudio der Schule gaben kurze Rückmeldungen, die nicht lang waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Bedienenden im Aufnahmestudio der Schule gaben kurze Rückmeldungen im Aufnahmestudio der Schule, in dem sie tätig waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Bedienenden im Aufnahmestudio der Schule gaben kurze Rückmeldungen in kurzer Form.",
        },
        {
          isCorrect: false,
          label:
            "Die Bedienenden im Aufnahmestudio der Schule gaben kurze Rückmeldungen, also Rückmeldungen von geringer Länge.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Operators in the school recording studio gave brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Operators in the school recording studio gave brief comments that were not long.",
        },
        {
          isCorrect: false,
          label:
            "Operators in the school recording studio gave brief comments in the school recording studio where they worked.",
        },
        {
          isCorrect: false,
          label:
            "Operators in the school recording studio gave brief comments in a brief form.",
        },
        {
          isCorrect: false,
          label:
            "Operators in the school recording studio gave brief comments, meaning comments that were short.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Operator studio rekaman sekolah memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar singkat di studio rekaman sekolah tempat mereka bertugas.",
        },
        {
          isCorrect: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: false,
          label:
            "Operator studio rekaman sekolah memberikan komentar yang singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
