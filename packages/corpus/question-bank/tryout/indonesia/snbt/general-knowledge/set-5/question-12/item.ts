import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Schriftliche Dokumente beweisen, dass mündliche Aussagen historisch wertlos sind.",
        },
        {
          isCorrect: false,
          label:
            "Das Archiv sollte die sicherste Aussage wählen und abweichende Aufnahmen löschen.",
        },
        {
          isCorrect: false,
          label:
            "Die Eröffnungsfeier fand Monate nach dem Umzug einiger Klassen statt.",
        },
        {
          isCorrect: true,
          label:
            "Widersprüchliche Aussagen können zeigen, wie Erinnerung funktioniert, statt eine Quelle automatisch auszuschließen.",
        },
        {
          isCorrect: false,
          label:
            "Originalaufnahmen bleiben erhalten, damit spätere Forscher die Deutung neu bewerten können.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Written documents prove that oral testimony has no historical value.",
        },
        {
          isCorrect: false,
          label:
            "The archive should choose the most confident witness and delete inconsistent recordings.",
        },
        {
          isCorrect: false,
          label:
            "The opening ceremony took place months after some classes moved.",
        },
        {
          isCorrect: true,
          label:
            "Conflicting testimony can reveal how memory works rather than automatically disqualifying one source.",
        },
        {
          isCorrect: false,
          label:
            "Original recordings are preserved so later researchers can reassess the interpretation.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dokumen tertulis membuktikan bahwa kesaksian lisan tidak memiliki nilai sejarah.",
        },
        {
          isCorrect: false,
          label:
            "Arsip harus memilih narasumber yang paling yakin dan menghapus rekaman yang tidak sesuai.",
        },
        {
          isCorrect: false,
          label:
            "Upacara peresmian berlangsung beberapa bulan setelah sebagian kelas pindah.",
        },
        {
          isCorrect: true,
          label:
            "Perbedaan kesaksian dapat menjadi informasi tentang cara ingatan bekerja, bukan alasan otomatis untuk membuang salah satu sumber.",
        },
        {
          isCorrect: false,
          label:
            "Rekaman asli disimpan agar tafsir dapat dinilai ulang oleh peneliti berikutnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
