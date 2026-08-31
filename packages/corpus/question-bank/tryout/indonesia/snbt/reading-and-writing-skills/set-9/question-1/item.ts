import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Geordnete Prüfung einer Änderung: Verteilung von Mangrovensetzlingen",
        },
        {
          isCorrect: false,
          label:
            "Erste Belege zu Pflanzortetiketten auf jedem Tablett im Kontext „Verteilung von Mangrovensetzlingen“",
        },
        {
          isCorrect: false,
          label:
            "Prüfung mehrerer gleichzeitiger Änderungen im Kontext „Verteilung von Mangrovensetzlingen“",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung des Kontexts „Verteilung von Mangrovensetzlingen“",
        },
        {
          isCorrect: false,
          label:
            "Vollständige Bewertung des Kontexts „Verteilung von Mangrovensetzlingen“",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "A structured test of one change: mangrove seedling distribution",
        },
        {
          isCorrect: false,
          label:
            "Early evidence about planting-site labels on every tray in the context of mangrove seedling distribution",
        },
        {
          isCorrect: false,
          label:
            "Testing several simultaneous changes in the context of mangrove seedling distribution",
        },
        {
          isCorrect: false,
          label:
            "User reactions to a permanent redesign of mangrove seedling distribution",
        },
        {
          isCorrect: false,
          label: "A complete evaluation of mangrove seedling distribution",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Uji Teratur atas Satu Perubahan: pembagian bibit mangrove",
        },
        {
          isCorrect: false,
          label:
            "Bukti awal tentang label lokasi tanam pada setiap baki dalam konteks distribusi bibit mangrove",
        },
        {
          isCorrect: false,
          label:
            "Pengujian beberapa perubahan serentak dalam konteks distribusi bibit mangrove",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan pengguna terhadap perancangan ulang tetap pada distribusi bibit mangrove",
        },
        {
          isCorrect: false,
          label: "Evaluasi menyeluruh terhadap distribusi bibit mangrove",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
