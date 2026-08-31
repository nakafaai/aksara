import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nach Anzeige der Namensquellen können Familien und Handwerker falsche Label erkennen, ohne die Suche zu erschweren.",
        },
        {
          isCorrect: true,
          label:
            "Archivforschung belegt, dass alle lokalen Namen erst nach dem Kuratorenlabel entstanden und es absichtlich kopierten.",
        },
        {
          isCorrect: false,
          label:
            "Ein neuer Scanner macht verblasste Beschriftungen lesbarer, verändert jedoch weder die Herkunft noch die zeitliche Reihenfolge der Namen.",
        },
        {
          isCorrect: false,
          label: "Suchergebnisse werden die Quelle jedes Namens anzeigen.",
        },
        {
          isCorrect: false,
          label: "Ein Name im alten Buch wurde von einem Kurator geschaffen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "After name sources are displayed, families and artisans can identify incorrect labels without reducing search success.",
        },
        {
          isCorrect: true,
          label:
            "Archive research proves that every local name appeared after the curator's label and deliberately copied it.",
        },
        {
          isCorrect: false,
          label:
            "A new scanner makes faded labels easier to read but changes neither the origin nor the chronological order of the names.",
        },
        {
          isCorrect: false,
          label: "Search results will display the source of every name.",
        },
        {
          isCorrect: false,
          label: "One name in an old book was created by a curator.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sesudah sumber nama ditampilkan, keluarga dan perajin dapat menunjukkan label yang salah tanpa mengurangi keberhasilan pencarian.",
        },
        {
          isCorrect: true,
          label:
            "Penelitian arsip membuktikan bahwa semua nama lokal muncul setelah label kurator dan sengaja menyalinnya.",
        },
        {
          isCorrect: false,
          label:
            "Pemindai baru membuat label yang pudar lebih mudah dibaca, tetapi tidak mengubah asal maupun urutan waktu kemunculan nama.",
        },
        {
          isCorrect: false,
          label: "Hasil pencarian akan menampilkan sumber setiap nama.",
        },
        {
          isCorrect: false,
          label: "Salah satu nama dalam buku lama dibuat oleh kurator.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
