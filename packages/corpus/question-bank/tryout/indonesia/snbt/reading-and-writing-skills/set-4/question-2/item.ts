import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Termine, an denen nur die alten Buchstabencodes als Bezug für den Versuch verwendet werden",
        },
        {
          isCorrect: false,
          label: "Termine, an denen das Endergebnis bekannt gegeben wird",
        },
        {
          isCorrect: false,
          label: "die ersten Termine vor Beginn der Ausgangsmessung",
        },
        {
          isCorrect: false,
          label:
            "Termine, an denen zwei Änderungen gleichzeitig geprüft werden",
        },
        {
          isCorrect: false,
          label: "Termine ohne Betrieb, damit das Personal pausieren kann",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "sessions in which shelves retain only the old letter codes as a reference for the trial",
        },
        {
          isCorrect: false,
          label: "sessions in which the final result is announced to borrowers",
        },
        {
          isCorrect: false,
          label: "the first sessions before baseline recording begins",
        },
        {
          isCorrect: false,
          label: "sessions in which two changes are tested together",
        },
        {
          isCorrect: false,
          label: "sessions without activity so that staff can rest",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "sesi ketika rak hanya memakai kode huruf lama sebagai acuan bagi sesi uji",
        },
        {
          isCorrect: false,
          label: "sesi ketika hasil akhir diumumkan kepada peminjam",
        },
        {
          isCorrect: false,
          label: "sesi pertama sebelum pencatatan nilai awal dimulai",
        },
        {
          isCorrect: false,
          label: "sesi ketika dua perubahan diuji sekaligus",
        },
        {
          isCorrect: false,
          label: "sesi tanpa kegiatan agar petugas dapat beristirahat",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
