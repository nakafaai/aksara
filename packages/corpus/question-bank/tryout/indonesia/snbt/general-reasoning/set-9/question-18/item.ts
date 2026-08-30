import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nicht: die Daten geprüft werden.",
        },
        {
          isCorrect: false,
          label: "Nicht: der Bericht veröffentlicht wird.",
        },
        {
          isCorrect: false,
          label: "die Daten geprüft werden",
        },
        {
          isCorrect: true,
          label: "der Bericht veröffentlicht wird",
        },
        {
          isCorrect: false,
          label: "Nicht: die Datei hochgeladen wird.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "It is not true that the data are validated.",
        },
        {
          isCorrect: false,
          label: "It is not true that the report is published.",
        },
        {
          isCorrect: false,
          label: "the data are validated",
        },
        {
          isCorrect: true,
          label: "the report is published",
        },
        {
          isCorrect: false,
          label: "It is not true that the file is uploaded.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tidak benar bahwa data divalidasi.",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa laporan diterbitkan.",
        },
        {
          isCorrect: false,
          label: "data divalidasi",
        },
        {
          isCorrect: true,
          label: "laporan diterbitkan",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa berkas diunggah.",
        },
      ],
    },
  },
};

export default item;
