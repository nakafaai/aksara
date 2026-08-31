import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Verschiedene Quellen verbinden 1912 mit Bau, 1914 mit Nutzung und 1916 mit Einweihung.",
        },
        {
          isCorrect: false,
          label:
            "Historische Daten müssen mit den bezeichneten Ereignissen verbunden werden, weil ein Objekt mehrere Anfänge und wichtige Veränderungen haben kann.",
        },
        {
          isCorrect: false,
          label:
            "Die Stadt könnte das älteste Datum wählen, damit das Denkmal historischer wirkt.",
        },
        {
          isCorrect: false,
          label:
            "Die neue Tafel wird eine Zeitleiste mit der Bedeutung jedes Datums zeigen.",
        },
        {
          isCorrect: false,
          label:
            "Wegen mehrerer Daten lässt sich kein Fakt zur Brückengeschichte feststellen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Different records connect 1912 with construction, 1914 with use, and 1916 with inauguration.",
        },
        {
          isCorrect: false,
          label:
            "Historical dates must be tied to the events they denote because one object can have several beginnings and major changes.",
        },
        {
          isCorrect: false,
          label:
            "The city could choose the oldest date to make the monument appear more historic.",
        },
        {
          isCorrect: false,
          label: "The new plaque will display a timeline explaining each date.",
        },
        {
          isCorrect: false,
          label:
            "Because several dates exist, no fact about the bridge's history can be established.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dokumen berbeda mengaitkan 1912 dengan konstruksi, 1914 dengan penggunaan, dan 1916 dengan peresmian.",
        },
        {
          isCorrect: false,
          label:
            "Tanggal sejarah harus disertai peristiwa yang dirujuk karena satu objek dapat memiliki beberapa awal dan perubahan penting.",
        },
        {
          isCorrect: false,
          label:
            "Pemerintah kota dapat memilih tanggal yang paling tua agar monumen tampak lebih bersejarah.",
        },
        {
          isCorrect: false,
          label:
            "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal.",
        },
        {
          isCorrect: false,
          label:
            "Karena ada beberapa tanggal, tidak ada satu pun fakta tentang riwayat jembatan yang dapat dipastikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
