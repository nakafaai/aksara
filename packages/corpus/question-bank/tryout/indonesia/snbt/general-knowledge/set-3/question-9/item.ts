import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Schriftliche Unterlagen sind immer richtig, während jede mündliche Aussage verworfen werden muss.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum sollte die spannendste Geschichte wählen und störende Angaben entfernen.",
        },
        {
          isCorrect: true,
          label:
            "Offenheit über verbleibende Unsicherheit gehört zur Sorgfalt eines Archivs und bedeutet nicht, dass die Recherche gescheitert ist.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum wird die Überarbeitungsgeschichte des Ausstellungsschildes anzeigen.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum wird Korrekturen mit einer überprüfbaren Quellenangabe annehmen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Written records are always correct, whereas all oral testimony must be rejected.",
        },
        {
          isCorrect: false,
          label:
            "The museum should choose the most engaging story and remove details that disrupt the narrative.",
        },
        {
          isCorrect: true,
          label:
            "Honesty about what remains uncertain is part of archival rigour, not evidence that the research failed.",
        },
        {
          isCorrect: false,
          label:
            "The museum will display the exhibition label's revision history.",
        },
        {
          isCorrect: false,
          label:
            "The museum will accept corrections that include a verifiable source trail.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Catatan tertulis selalu benar, sedangkan semua kesaksian lisan harus ditolak.",
        },
        {
          isCorrect: false,
          label:
            "Museum sebaiknya memilih kisah paling menarik dan menghapus keterangan yang mengganggu kelancaran cerita.",
        },
        {
          isCorrect: true,
          label:
            "Kejujuran tentang bagian yang belum pasti merupakan bagian dari ketelitian arsip, bukan tanda bahwa penelitian gagal.",
        },
        {
          isCorrect: false,
          label: "Museum akan menampilkan riwayat revisi label pameran.",
        },
        {
          isCorrect: false,
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
