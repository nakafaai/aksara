import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der erste Teil prüft die überarbeitete Fassung, der folgende erklärt die Rückkehr zur wörtlichen Übersetzung.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil vergleicht drei Evakuierungsrouten, der folgende bestimmt eine gemeinsame Route für alle Dörfer.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil ändert Fachbegriffe, der folgende prüft das Erinnerungsvermögen derselben Teilnehmer erneut.",
        },
        {
          isCorrect: false,
          label:
            "Der erste Teil entdeckt eine Signalstörung, der folgende repariert den Sender ohne Änderung der Nachricht.",
        },
        {
          isCorrect: true,
          label:
            "Das Scheitern der wörtlichen Fassung führt zur gemeinsamen Überarbeitung, deren Bewertung sich auf den zweiten Test stützt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The first part tests the revised version, and the later part explains why literal translation was chosen again.",
        },
        {
          isCorrect: false,
          label:
            "The first part compares three evacuation routes, and the later part chooses one route for every village.",
        },
        {
          isCorrect: false,
          label:
            "The first part changes technical terms, and the later part retests the same participants to measure their memory.",
        },
        {
          isCorrect: false,
          label:
            "The first part detects a signal fault, and the later part repairs the transmitter without changing the message.",
        },
        {
          isCorrect: true,
          label:
            "The literal version’s failure motivates collaborative revision, and the second test provides evidence for evaluating the revision.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bagian awal menguji versi revisi, lalu bagian berikutnya menjelaskan mengapa terjemahan harfiah dipilih kembali.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan tiga rute evakuasi, lalu bagian berikutnya menetapkan rute yang berlaku untuk semua kampung.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal mengubah istilah teknis, lalu bagian berikutnya menguji hasil revisi pada peserta yang sama untuk menilai daya ingat.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menemukan gangguan sinyal, lalu bagian berikutnya memperbaiki pemancar tanpa mengubah isi pesan.",
        },
        {
          isCorrect: true,
          label:
            "Kegagalan versi harfiah menjadi dasar perancangan bersama, lalu uji kedua menyediakan bukti untuk menilai hasil revisi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
