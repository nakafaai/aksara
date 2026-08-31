import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Geordnete Prüfung einer Änderung: Tag der offenen Labortür",
        },
        {
          isCorrect: false,
          label:
            "Erste Belege zu Fragekarten an jedem Demonstrationstisch im Kontext „öffentliche Laborführung“",
        },
        {
          isCorrect: false,
          label:
            "Prüfung mehrerer gleichzeitiger Änderungen im Kontext „öffentliche Laborführung“",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung des Kontexts „öffentliche Laborführung“",
        },
        {
          isCorrect: false,
          label:
            "Vollständige Bewertung des Kontexts „öffentliche Laborführung“",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "A structured test of one change: open laboratory tour",
        },
        {
          isCorrect: false,
          label:
            "Early evidence about question cards at each demonstration table in the context of open laboratory tour",
        },
        {
          isCorrect: false,
          label:
            "Testing several simultaneous changes in the context of open laboratory tour",
        },
        {
          isCorrect: false,
          label:
            "User reactions to a permanent redesign of open laboratory tour",
        },
        {
          isCorrect: false,
          label: "A complete evaluation of open laboratory tour",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Uji Teratur atas Satu Perubahan: tur laboratorium terbuka",
        },
        {
          isCorrect: false,
          label:
            "Bukti awal tentang kartu pertanyaan di setiap meja demonstrasi dalam konteks tur laboratorium terbuka",
        },
        {
          isCorrect: false,
          label:
            "Pengujian beberapa perubahan serentak dalam konteks tur laboratorium terbuka",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan pengguna terhadap perancangan ulang tetap pada tur laboratorium terbuka",
        },
        {
          isCorrect: false,
          label: "Evaluasi menyeluruh terhadap tur laboratorium terbuka",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
