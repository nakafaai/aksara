import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Erste Belege zu Menüvorbestellung am Vortag im Kontext „Schulfrühstücksprogramm“",
        },
        {
          isCorrect: false,
          label:
            "Prüfung mehrerer gleichzeitiger Änderungen im Kontext „Schulfrühstücksprogramm“",
        },
        {
          isCorrect: true,
          label: "Geordnete Prüfung einer Änderung: Schulfrühstücksprogramm",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung des Kontexts „Schulfrühstücksprogramm“",
        },
        {
          isCorrect: false,
          label:
            "Vollständige Bewertung des Kontexts „Schulfrühstücksprogramm“",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Early evidence about menu booking one day in advance in the context of school breakfast programme",
        },
        {
          isCorrect: false,
          label:
            "Testing several simultaneous changes in the context of school breakfast programme",
        },
        {
          isCorrect: true,
          label: "A structured test of one change: school breakfast programme",
        },
        {
          isCorrect: false,
          label:
            "User reactions to a permanent redesign of school breakfast programme",
        },
        {
          isCorrect: false,
          label: "A complete evaluation of school breakfast programme",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bukti awal tentang pemesanan menu sehari sebelumnya dalam konteks program sarapan sekolah",
        },
        {
          isCorrect: false,
          label:
            "Pengujian beberapa perubahan serentak dalam konteks program sarapan sekolah",
        },
        {
          isCorrect: true,
          label: "Uji Teratur atas Satu Perubahan: program sarapan sekolah",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan pengguna terhadap perancangan ulang tetap pada program sarapan sekolah",
        },
        {
          isCorrect: false,
          label: "Evaluasi menyeluruh terhadap program sarapan sekolah",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
