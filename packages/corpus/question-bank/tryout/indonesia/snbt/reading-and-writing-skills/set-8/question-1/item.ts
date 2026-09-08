import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Fragekarten bei einer offenen Laborführung im Test",
        },
        {
          isCorrect: false,
          label: "Ausgangsdaten vor der Prüfung von Fragekarten",
        },
        {
          isCorrect: false,
          label:
            "Gleichzeitige Prüfung mehrerer Änderungen an der Laborführung",
        },
        {
          isCorrect: false,
          label: "Rückmeldungen zur dauerhaften Neugestaltung der Laborführung",
        },
        {
          isCorrect: false,
          label: "Vollständige Bewertung aller Labortätigkeiten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Testing Question Cards on an Open Laboratory Tour",
        },
        {
          isCorrect: false,
          label: "Baseline Records Before Question Cards Were Tested",
        },
        {
          isCorrect: false,
          label: "Testing Several Simultaneous Changes to the Laboratory Tour",
        },
        {
          isCorrect: false,
          label: "Reactions to a Permanent Redesign of the Laboratory Tour",
        },
        {
          isCorrect: false,
          label: "A Complete Evaluation of All Laboratory Activities",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pengujian Kartu Pertanyaan dalam Tur Laboratorium Terbuka",
        },
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Kartu Pertanyaan Diuji",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Tur Laboratorium",
        },
        {
          isCorrect: false,
          label: "Tanggapan atas Perancangan Ulang Permanen Tur Laboratorium",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Seluruh Kegiatan Laboratorium",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
