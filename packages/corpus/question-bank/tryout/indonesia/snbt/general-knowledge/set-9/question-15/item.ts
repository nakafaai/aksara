import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Der Mittelteil der Brücke wurde 1958 weitgehend ersetzt.",
        },
        {
          isCorrect: true,
          label:
            "Historische Daten müssen mit den bezeichneten Ereignissen verbunden werden, weil ein Objekt mehrere Anfänge und wichtige Veränderungen haben kann.",
        },
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
          label:
            "Die neue Tafel wird eine Zeitleiste mit der Bedeutung jedes Datums zeigen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The bridge's central span was substantially replaced in 1958.",
        },
        {
          isCorrect: true,
          label:
            "Historical dates must be tied to the events they denote because one object can have several beginnings and major changes.",
        },
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
          label: "The new plaque will display a timeline explaining each date.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Bagian tengah jembatan diganti besar-besaran pada 1958.",
        },
        {
          isCorrect: true,
          label:
            "Tanggal sejarah harus disertai peristiwa yang dirujuk karena satu objek dapat memiliki beberapa awal dan perubahan penting.",
        },
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
          label:
            "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
