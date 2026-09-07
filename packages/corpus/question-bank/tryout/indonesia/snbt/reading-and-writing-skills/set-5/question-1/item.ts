import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ausgangsdaten vor der Prüfung von Beispielfotos",
        },
        {
          isCorrect: false,
          label:
            "Gleichzeitige Prüfung mehrerer Änderungen an der Baumerfassung",
        },
        {
          isCorrect: true,
          label:
            "Beispielfotos für die Erfassung von Straßenbaumschäden im Test",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung der Baumerfassung",
        },
        {
          isCorrect: false,
          label:
            "Vollständige Bewertung aller Tätigkeiten bei der Baumerfassung",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Baseline Records Before Sample Photographs Were Tested",
        },
        {
          isCorrect: false,
          label: "Testing Several Simultaneous Changes to Tree Surveys",
        },
        {
          isCorrect: true,
          label: "Testing Sample Photographs in Street-Tree Condition Surveys",
        },
        {
          isCorrect: false,
          label: "Observer Reactions to a Permanent Redesign of Tree Surveys",
        },
        {
          isCorrect: false,
          label: "A Complete Evaluation of All Tree-Survey Activities",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Contoh Foto Diuji",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak dalam Pendataan Pohon",
        },
        {
          isCorrect: true,
          label: "Pengujian Contoh Foto dalam Pendataan Kondisi Pohon Jalan",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan Pencatat terhadap Perancangan Ulang Permanen Pendataan",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Pendataan Pohon",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
