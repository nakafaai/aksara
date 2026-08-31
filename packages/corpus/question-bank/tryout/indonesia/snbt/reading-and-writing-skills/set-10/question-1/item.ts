import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Geordnete Prüfung einer Änderung: Kochkurs für Jugendliche",
        },
        {
          isCorrect: false,
          label:
            "Erste Belege zu nach Rezeptschritten gruppierte Zutaten im Kontext „Kochkurs für Jugendliche“",
        },
        {
          isCorrect: false,
          label:
            "Prüfung mehrerer gleichzeitiger Änderungen im Kontext „Kochkurs für Jugendliche“",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung des Kontexts „Kochkurs für Jugendliche“",
        },
        {
          isCorrect: false,
          label:
            "Vollständige Bewertung des Kontexts „Kochkurs für Jugendliche“",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "A structured test of one change: teen cooking class",
        },
        {
          isCorrect: false,
          label:
            "Early evidence about ingredients grouped by recipe stage in the context of teen cooking class",
        },
        {
          isCorrect: false,
          label:
            "Testing several simultaneous changes in the context of teen cooking class",
        },
        {
          isCorrect: false,
          label: "User reactions to a permanent redesign of teen cooking class",
        },
        {
          isCorrect: false,
          label: "A complete evaluation of teen cooking class",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Uji Teratur atas Satu Perubahan: kelas memasak remaja",
        },
        {
          isCorrect: false,
          label:
            "Bukti awal tentang bahan yang dikelompokkan menurut tahap resep dalam konteks kelas memasak remaja",
        },
        {
          isCorrect: false,
          label:
            "Pengujian beberapa perubahan serentak dalam konteks kelas memasak remaja",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan pengguna terhadap perancangan ulang tetap pada kelas memasak remaja",
        },
        {
          isCorrect: false,
          label: "Evaluasi menyeluruh terhadap kelas memasak remaja",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
