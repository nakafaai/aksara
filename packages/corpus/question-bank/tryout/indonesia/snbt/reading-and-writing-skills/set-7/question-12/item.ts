import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team einen Rückgabecode an jedem Griff im folgenden Kontext: Schirmverleih am Bahnhof.",
        },
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team einen Rückgabecode an jedem Griff im Kontext Schirmverleih am Bahnhof.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team einen Rückgabecode an jedem Griff im Kontext Schirmverleih am Bahnhof.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team einen Rückgabecode an jedem Griff im Kontext Schirmverleih am Bahnhof.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team einen Rückgabecode an jedem Griff im Kontext Schirmverleih am Bahnhof",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "On Monday, the team tested a return code on each handle in this setting (station umbrella lending).",
        },
        {
          isCorrect: false,
          label:
            "on Monday, the team tested a return code on each handle in this setting (station umbrella lending).",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested a return code on each handle in this setting (station umbrella lending).",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested a return code on each handle in this setting (station umbrella lending).",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested a return code on each handle in this setting (station umbrella lending)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji kode pengembalian di peminjaman payung stasiun.",
        },
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji kode pengembalian di peminjaman payung stasiun.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji kode pengembalian di peminjaman payung stasiun.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji kode pengembalian di peminjaman payung stasiun.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji kode pengembalian di peminjaman payung stasiun",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
