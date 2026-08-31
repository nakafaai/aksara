import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Erste Belege zu Fotobeschriftungen an den Rückgaberegalen im Kontext „Sportgeräteausleihe“",
        },
        {
          isCorrect: true,
          label: "Geordnete Prüfung einer Änderung: Ausleihe von Sportgeräten",
        },
        {
          isCorrect: false,
          label:
            "Prüfung mehrerer gleichzeitiger Änderungen im Kontext „Sportgeräteausleihe“",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung des Kontexts „Sportgeräteausleihe“",
        },
        {
          isCorrect: false,
          label: "Vollständige Bewertung des Kontexts „Sportgeräteausleihe“",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Early evidence about photo labels on the return shelves in the context of sports equipment lending",
        },
        {
          isCorrect: true,
          label: "A structured test of one change: sports equipment lending",
        },
        {
          isCorrect: false,
          label:
            "Testing several simultaneous changes in the context of sports equipment lending",
        },
        {
          isCorrect: false,
          label:
            "User reactions to a permanent redesign of sports equipment lending",
        },
        {
          isCorrect: false,
          label: "A complete evaluation of sports equipment lending",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bukti awal tentang label foto pada rak pengembalian dalam konteks peminjaman alat olahraga",
        },
        {
          isCorrect: true,
          label: "Uji Teratur atas Satu Perubahan: peminjaman alat olahraga",
        },
        {
          isCorrect: false,
          label:
            "Pengujian beberapa perubahan serentak dalam konteks peminjaman alat olahraga",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan pengguna terhadap perancangan ulang tetap pada peminjaman alat olahraga",
        },
        {
          isCorrect: false,
          label: "Evaluasi menyeluruh terhadap peminjaman alat olahraga",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
