import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Freiwilligen des Lärmprotokolls gaben kurze Rückmeldungen, die nicht lang waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Freiwilligen des Lärmprotokolls gaben kurze Rückmeldungen als Freiwillige, die am Lärmprotokoll arbeiteten.",
        },
        {
          isCorrect: false,
          label:
            "Die Freiwilligen des Lärmprotokolls gaben kurze Rückmeldungen in kurzer Form.",
        },
        {
          isCorrect: true,
          label:
            "Die Freiwilligen des Lärmprotokolls gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Freiwilligen des Lärmprotokolls gaben kurze Rückmeldungen, also Rückmeldungen von geringer Länge.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The noise-log volunteers gave brief comments that were not long.",
        },
        {
          isCorrect: false,
          label:
            "The noise-log volunteers gave brief comments as volunteers working on the noise log.",
        },
        {
          isCorrect: false,
          label:
            "The noise-log volunteers gave brief comments in a brief form.",
        },
        {
          isCorrect: true,
          label: "The noise-log volunteers gave brief comments.",
        },
        {
          isCorrect: false,
          label:
            "The noise-log volunteers gave brief comments, meaning comments that were short.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat yang tidak panjang.",
        },
        {
          isCorrect: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat sebagai relawan yang mencatat kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          isCorrect: true,
          label: "Relawan pencatatan kebisingan memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Relawan pencatatan kebisingan memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
