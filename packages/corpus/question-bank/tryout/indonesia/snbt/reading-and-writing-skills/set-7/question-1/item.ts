import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Menübestellungen am Vortag im Schulfrühstücksprogramm im Test",
        },
        {
          isCorrect: false,
          label:
            "Gleichzeitige Prüfung mehrerer Änderungen am Frühstücksprogramm",
        },
        {
          isCorrect: false,
          label: "Ausgangsdaten vor der Prüfung von Vorbestellungen",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung des Frühstücksprogramms",
        },
        {
          isCorrect: false,
          label:
            "Vollständige Bewertung aller Tätigkeiten des Frühstücksprogramms",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Testing Advance Menu Orders in the School Breakfast Programme",
        },
        {
          isCorrect: false,
          label:
            "Testing Several Simultaneous Changes to the Breakfast Programme",
        },
        {
          isCorrect: false,
          label: "Baseline Records Before Advance Ordering Was Tested",
        },
        {
          isCorrect: false,
          label:
            "Student Reactions to a Permanent Redesign of the Breakfast Programme",
        },
        {
          isCorrect: false,
          label: "A Complete Evaluation of All Breakfast Programme Activities",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pengujian Pemesanan Menu Sehari Sebelumnya dalam Program Sarapan Sekolah",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Program Sarapan",
        },
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Pemesanan Sehari Sebelumnya Diuji",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan Siswa terhadap Perancangan Ulang Permanen Program Sarapan",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Program Sarapan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
