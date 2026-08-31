import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Erste Belege zu Richtungspfeile an jeder Kreuzung im Kontext „Ausstellung von Schülerarbeiten“",
        },
        {
          isCorrect: true,
          label:
            "Geordnete Prüfung einer Änderung: Ausstellung von Schülerarbeiten",
        },
        {
          isCorrect: false,
          label:
            "Prüfung mehrerer gleichzeitiger Änderungen im Kontext „Ausstellung von Schülerarbeiten“",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung des Kontexts „Ausstellung von Schülerarbeiten“",
        },
        {
          isCorrect: false,
          label:
            "Vollständige Bewertung des Kontexts „Ausstellung von Schülerarbeiten“",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Early evidence about direction arrows placed at each junction in the context of student work exhibition",
        },
        {
          isCorrect: true,
          label: "A structured test of one change: student work exhibition",
        },
        {
          isCorrect: false,
          label:
            "Testing several simultaneous changes in the context of student work exhibition",
        },
        {
          isCorrect: false,
          label:
            "User reactions to a permanent redesign of student work exhibition",
        },
        {
          isCorrect: false,
          label: "A complete evaluation of student work exhibition",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bukti awal tentang panah arah di setiap persimpangan dalam konteks pameran karya siswa",
        },
        {
          isCorrect: true,
          label: "Uji Teratur atas Satu Perubahan: pameran karya siswa",
        },
        {
          isCorrect: false,
          label:
            "Pengujian beberapa perubahan serentak dalam konteks pameran karya siswa",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan pengguna terhadap perancangan ulang tetap pada pameran karya siswa",
        },
        {
          isCorrect: false,
          label: "Evaluasi menyeluruh terhadap pameran karya siswa",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
