import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "ein Tag, an dem der bisherige Ablauf als Bezug zum Versuch beibehalten wurde",
        },
        {
          isCorrect: false,
          label: "der Tag, an dem das Endergebnis bekannt gegeben wurde",
        },
        {
          isCorrect: false,
          label: "der erste Tag vor Beginn der Ausgangsmessung",
        },
        {
          isCorrect: false,
          label: "ein Tag, an dem zwei Änderungen gleichzeitig geprüft wurden",
        },
        {
          isCorrect: false,
          label: "ein Tag ohne Betrieb, damit das Personal pausieren konnte",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "a day on which the earlier process was retained as a reference for the trial",
        },
        {
          isCorrect: false,
          label: "the day when the final result was announced to users",
        },
        {
          isCorrect: false,
          label: "the first day before baseline recording began",
        },
        {
          isCorrect: false,
          label: "a day on which two changes were tested together",
        },
        {
          isCorrect: false,
          label: "a day without activity so that staff could rest",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "hari ketika alur lama dipakai sebagai acuan terhadap hari uji",
        },
        {
          isCorrect: false,
          label: "hari ketika hasil akhir diumumkan kepada pengguna",
        },
        {
          isCorrect: false,
          label: "hari pertama sebelum pencatatan nilai awal dimulai",
        },
        {
          isCorrect: false,
          label: "hari ketika dua perubahan diuji sekaligus",
        },
        {
          isCorrect: false,
          label: "hari tanpa kegiatan agar petugas dapat beristirahat",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
