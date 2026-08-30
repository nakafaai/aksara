import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nicht: die Karte ausgestellt wird.",
        },
        {
          isCorrect: false,
          label: "Nicht: der Zugang freigeschaltet wird.",
        },
        {
          isCorrect: true,
          label: "der Zugang freigeschaltet wird",
        },
        {
          isCorrect: false,
          label: "die Karte ausgestellt wird",
        },
        {
          isCorrect: false,
          label: "Nicht: die Anmeldung abgeschlossen ist.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "It is not true that the card is issued.",
        },
        {
          isCorrect: false,
          label: "It is not true that access is granted.",
        },
        {
          isCorrect: true,
          label: "access is granted",
        },
        {
          isCorrect: false,
          label: "the card is issued",
        },
        {
          isCorrect: false,
          label: "It is not true that registration is completed.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tidak benar bahwa kartu diterbitkan.",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa akses dibuka.",
        },
        {
          isCorrect: true,
          label: "akses dibuka",
        },
        {
          isCorrect: false,
          label: "kartu diterbitkan",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa pendaftaran selesai.",
        },
      ],
    },
  },
};

export default item;
