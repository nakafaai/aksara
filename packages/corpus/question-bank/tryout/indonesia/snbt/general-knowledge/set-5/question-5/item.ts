import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Verantwortliche historische Rekonstruktion vergleicht Quellen, erklärt Perspektiven und bewahrt Originale zur erneuten Prüfung.",
        },
        {
          isCorrect: false,
          label:
            "Die Eröffnungsfeier fand Monate nach dem Umzug einiger Klassen statt.",
        },
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
            "Originalaufnahmen bleiben erhalten, damit spätere Forscher die Deutung neu bewerten können.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Responsible historical reconstruction compares sources, explains viewpoints, and preserves originals for reassessment.",
        },
        {
          isCorrect: false,
          label:
            "The opening ceremony took place months after some classes moved.",
        },
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
            "Original recordings are preserved so later researchers can reassess the interpretation.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Rekonstruksi sejarah yang bertanggung jawab membandingkan sumber, menjelaskan sudut pandang, dan mempertahankan bahan asli untuk penilaian ulang.",
        },
        {
          isCorrect: false,
          label:
            "Upacara peresmian berlangsung beberapa bulan setelah sebagian kelas pindah.",
        },
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
            "Rekaman asli disimpan agar tafsir dapat dinilai ulang oleh peneliti berikutnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
