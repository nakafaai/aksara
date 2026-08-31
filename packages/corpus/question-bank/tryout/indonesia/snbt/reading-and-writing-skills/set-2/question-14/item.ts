import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "*dienen* durch *dient* ersetzen.",
        },
        {
          isCorrect: false,
          label: "das Wort *auch* entfernen.",
        },
        {
          isCorrect: false,
          label: "*Bezugsgrundlage* durch *Schätzung* ersetzen.",
        },
        {
          isCorrect: false,
          label: "das Wort *den* vor *aktuellen* einfügen.",
        },
        {
          isCorrect: true,
          label: "das Wort *Hinsichtlich* am Satzanfang entfernen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "replacing *provide* with *provides*.",
        },
        {
          isCorrect: false,
          label: "removing the word *also*.",
        },
        {
          isCorrect: false,
          label: "replacing *benchmark* with *estimate*.",
        },
        {
          isCorrect: false,
          label: "adding the word *the* before *current*.",
        },
        {
          isCorrect: true,
          label:
            "removing the word *Regarding* at the beginning of the sentence.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "mengganti *menyediakan* dengan *disediakan*.",
        },
        {
          isCorrect: false,
          label: "menghilangkan kata *juga*.",
        },
        {
          isCorrect: false,
          label: "mengganti *tolok ukur* dengan *perkiraan*.",
        },
        {
          isCorrect: false,
          label: "menambahkan kata *yang* sebelum *terkini*.",
        },
        {
          isCorrect: true,
          label: "menghilangkan kata *mengenai* pada awal kalimat.",
        },
      ],
    },
  },
};

export default item;
