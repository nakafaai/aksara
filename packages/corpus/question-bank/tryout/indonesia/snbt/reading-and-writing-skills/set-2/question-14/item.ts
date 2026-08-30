import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "das Wort *Hinsichtlich* am Satzanfang entfernen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "*dienen* durch *dient* ersetzen." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "das Wort *auch* entfernen." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "*Bezugsgrundlage* durch *Schätzung* ersetzen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "das Wort *den* vor *aktuellen* einfügen." },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "removing the word *Regarding* at the beginning of the sentence.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "replacing *provide* with *provides*." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "removing the word *also*." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "replacing *benchmark* with *estimate*." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "adding the word *the* before *current*." },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "menghilangkan kata *mengenai* pada awal kalimat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "mengganti *menyediakan* dengan *disediakan*.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "menghilangkan kata *juga*." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "mengganti *tolok ukur* dengan *perkiraan*.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "menambahkan kata *yang* sebelum *terkini*.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
