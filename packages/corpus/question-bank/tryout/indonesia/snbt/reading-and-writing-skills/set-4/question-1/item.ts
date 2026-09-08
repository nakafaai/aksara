import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ausgangsbeobachtungen vor dem Test neuer Regalbeschriftungen",
        },
        {
          isCorrect: true,
          label: "Fotoetiketten für die Rückgabe von Sportgeräten im Test",
        },
        {
          isCorrect: false,
          label: "Gleichzeitiger Test mehrerer Änderungen an der Ausleihe",
        },
        {
          isCorrect: false,
          label: "Rückmeldungen zur dauerhaften Neugestaltung der Ausleihe",
        },
        {
          isCorrect: false,
          label: "Vollständige Bewertung der Sportgeräteausleihe",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Baseline Observations Before Testing Shelf Labels",
        },
        {
          isCorrect: true,
          label: "Testing Photo Labels on Sports Equipment Return Shelves",
        },
        {
          isCorrect: false,
          label: "Testing Several Simultaneous Changes to the Lending Service",
        },
        {
          isCorrect: false,
          label: "Borrower Reactions to a Permanent Redesign of the Service",
        },
        {
          isCorrect: false,
          label:
            "A Complete Evaluation of the Sports Equipment Lending Service",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Pengujian Label Rak",
        },
        {
          isCorrect: true,
          label: "Pengujian Label Foto pada Rak Pengembalian Alat Olahraga",
        },
        {
          isCorrect: false,
          label:
            "Pengujian Beberapa Perubahan Serentak pada Layanan Peminjaman",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan Peminjam terhadap Perancangan Ulang Permanen Layanan",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Layanan Peminjaman Alat Olahraga",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
