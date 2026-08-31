import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Prüfung ist abgeschlossen.",
        },
        {
          isCorrect: false,
          label: "Die Prüfung wurde abgebrochen.",
        },
        {
          isCorrect: false,
          label: "Über den Prüfungsstatus ist nichts ableitbar.",
        },
        {
          isCorrect: true,
          label: "Die Prüfung ist nicht abgeschlossen.",
        },
        {
          isCorrect: false,
          label: "Die Prüfung ist abgeschlossen, aber die Quote fehlt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The audit is complete.",
        },
        {
          isCorrect: false,
          label: "The audit was cancelled.",
        },
        {
          isCorrect: false,
          label: "Nothing can be inferred about the audit status.",
        },
        {
          isCorrect: true,
          label: "The audit is not complete.",
        },
        {
          isCorrect: false,
          label: "The audit is complete, but quota is unavailable.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Audit telah selesai.",
        },
        {
          isCorrect: false,
          label: "Audit dibatalkan.",
        },
        {
          isCorrect: false,
          label: "Status audit tidak dapat disimpulkan.",
        },
        {
          isCorrect: true,
          label: "Audit belum selesai.",
        },
        {
          isCorrect: false,
          label: "Audit selesai, tetapi kuota tidak tersedia.",
        },
      ],
    },
  },
};

export default item;
