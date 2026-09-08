import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Wegen mehrerer Daten lässt sich kein Fakt zur Brückengeschichte feststellen.",
        },
        {
          isCorrect: false,
          label:
            "Das älteste Datum ist für jede Art von Geschichte immer das passendste.",
        },
        {
          isCorrect: false,
          label: "Der Mittelteil der Brücke wurde 1958 weitgehend ersetzt.",
        },
        {
          isCorrect: false,
          label:
            "Periodisierung wählt das früheste Datum, während Chronologie die Reihenfolge späterer Ereignisse außer Acht lässt.",
        },
        {
          isCorrect: true,
          label:
            "Periodisierung wählt erklärende Grenzen für einen Analysezweck, während Chronologie Ereignisse zeitlich ordnet.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because several dates exist, no fact about the bridge's history can be established.",
        },
        {
          isCorrect: false,
          label:
            "The oldest date is always the most appropriate for every kind of history.",
        },
        {
          isCorrect: false,
          label:
            "The bridge's central span was substantially replaced in 1958.",
        },
        {
          isCorrect: false,
          label:
            "Periodisation selects the earliest date, while chronology ignores the order of later events.",
        },
        {
          isCorrect: true,
          label:
            "Periodisation selects explanatory boundaries for an analytical purpose, whereas chronology places events in time order.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena ada beberapa tanggal, tidak ada satu pun fakta tentang riwayat jembatan yang dapat dipastikan.",
        },
        {
          isCorrect: false,
          label:
            "Satu tanggal paling tua selalu paling tepat untuk semua jenis sejarah.",
        },
        {
          isCorrect: false,
          label: "Bagian tengah jembatan diganti besar-besaran pada 1958.",
        },
        {
          isCorrect: false,
          label:
            "Periodisasi memilih tanggal paling awal, sedangkan kronologi mengabaikan urutan peristiwa setelah tanggal itu.",
        },
        {
          isCorrect: true,
          label:
            "Periodisasi memilih batas penjelas sesuai tujuan analisis, sedangkan kronologi menempatkan peristiwa dalam urutan waktu.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
