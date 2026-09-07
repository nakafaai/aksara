import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ausgangsdaten vor der Prüfung von Richtungspfeilen",
        },
        {
          isCorrect: true,
          label:
            "Richtungspfeile beim Rundgang durch die Schülerausstellung im Test",
        },
        {
          isCorrect: false,
          label: "Gleichzeitige Prüfung mehrerer Änderungen an der Ausstellung",
        },
        {
          isCorrect: false,
          label: "Rückmeldungen zur dauerhaften Neugestaltung der Ausstellung",
        },
        {
          isCorrect: false,
          label: "Vollständige Bewertung aller Ausstellungstätigkeiten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Baseline Records Before Direction Arrows Were Tested",
        },
        {
          isCorrect: true,
          label: "Testing Direction Arrows on the Student Exhibition Route",
        },
        {
          isCorrect: false,
          label: "Testing Several Simultaneous Changes to the Exhibition",
        },
        {
          isCorrect: false,
          label: "Visitor Reactions to a Permanent Redesign of the Exhibition",
        },
        {
          isCorrect: false,
          label: "A Complete Evaluation of All Exhibition Activities",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Pengujian Panah Arah",
        },
        {
          isCorrect: true,
          label: "Pengujian Panah Arah pada Rute Pameran Karya Siswa",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Pameran",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan Pengunjung terhadap Perancangan Ulang Permanen Pameran",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Pameran",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
