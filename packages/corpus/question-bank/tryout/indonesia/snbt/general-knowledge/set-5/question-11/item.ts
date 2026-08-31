import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Eine unabhängige Bauakte unterscheidet ebenfalls Klassenumzug und Eröffnung.",
        },
        {
          isCorrect: true,
          label:
            "Ein neu datierter Brief zeigt, dass tatsächlich alle Klassen am selben Tag umzogen.",
        },
        {
          isCorrect: false,
          label:
            "Besucher verwechseln die beiden Daten seltener, wenn die Bildunterschriften direkt unter den jeweiligen Fotos stehen.",
        },
        {
          isCorrect: false,
          label:
            "Originalaufnahmen bleiben erhalten, damit spätere Forscher die Deutung neu bewerten können.",
        },
        {
          isCorrect: false,
          label:
            "Die Eröffnungsfeier fand Monate nach dem Umzug einiger Klassen statt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "An independent construction record also distinguishes the class-move date from the opening date.",
        },
        {
          isCorrect: true,
          label:
            "A newly dated letter shows that every class actually moved on the same day.",
        },
        {
          isCorrect: false,
          label:
            "Visitors confuse the two dates less often when the captions are placed directly beneath the corresponding photographs.",
        },
        {
          isCorrect: false,
          label:
            "Original recordings are preserved so later researchers can reassess the interpretation.",
        },
        {
          isCorrect: false,
          label:
            "The opening ceremony took place months after some classes moved.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Catatan pembangunan independen juga membedakan tanggal perpindahan kelas dan tanggal peresmian.",
        },
        {
          isCorrect: true,
          label:
            "Surat bertanggal baru menunjukkan semua kelas sebenarnya pindah pada hari yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung lebih jarang tertukar antara kedua tanggal ketika keterangan diletakkan tepat di bawah foto yang bersangkutan.",
        },
        {
          isCorrect: false,
          label:
            "Rekaman asli disimpan agar tafsir dapat dinilai ulang oleh peneliti berikutnya.",
        },
        {
          isCorrect: false,
          label:
            "Upacara peresmian berlangsung beberapa bulan setelah sebagian kelas pindah.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
