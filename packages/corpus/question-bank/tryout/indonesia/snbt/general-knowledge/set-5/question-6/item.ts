import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "die wortgetreue Kopie einer ausgewählten Erinnerung",
        },
        {
          isCorrect: false,
          label: "das Füllen von Lücken mit nicht gekennzeichneten Erfindungen",
        },
        {
          isCorrect: false,
          label: "eine chronologische Ereignisliste ohne Quellenvergleich",
        },
        {
          isCorrect: true,
          label:
            "die erneute Zusammensetzung einer Darstellung der Vergangenheit aus vorhandenen Spuren",
        },
        {
          isCorrect: false,
          label:
            "die körperliche Reparatur eines alten Gegenstands auf Neuzustand",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "a word-for-word copy of one selected memory",
        },
        {
          isCorrect: false,
          label: "filling gaps with unmarked fictional material",
        },
        {
          isCorrect: false,
          label: "a date-ordered event list without source comparison",
        },
        {
          isCorrect: true,
          label: "rebuilding an account of the past from available traces",
        },
        {
          isCorrect: false,
          label: "physical repair that makes an old object look new again",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "salinan kata demi kata dari satu ingatan yang dipilih",
        },
        {
          isCorrect: false,
          label:
            "pengisian bagian yang hilang dengan cerita rekaan tanpa penanda",
        },
        {
          isCorrect: false,
          label: "daftar peristiwa menurut tanggal tanpa membandingkan sumber",
        },
        {
          isCorrect: true,
          label:
            "penyusunan kembali penjelasan masa lalu dari jejak yang tersedia",
        },
        {
          isCorrect: false,
          label: "perbaikan fisik benda lama agar kembali tampak baru",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
