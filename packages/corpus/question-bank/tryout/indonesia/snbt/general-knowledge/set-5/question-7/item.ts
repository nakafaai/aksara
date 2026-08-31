import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Verantwortliche historische Rekonstruktion vergleicht Quellen, erklärt Perspektiven und bewahrt Originale zur erneuten Prüfung.",
        },
        {
          isCorrect: true,
          label:
            "Stundenpläne, Fotos, Raumschreiben und weitere Interviews zeigen einen schrittweisen Umzug.",
        },
        {
          isCorrect: false,
          label:
            "Erinnerungen können abweichen, weil jede Person einen anderen Teil des Ereignisses erlebt hat.",
        },
        {
          isCorrect: false,
          label:
            "Originalaufnahmen bleiben erhalten, damit spätere Forscher die Deutung neu bewerten können.",
        },
        {
          isCorrect: false,
          label:
            "Schriftliche Dokumente beweisen, dass mündliche Aussagen historisch wertlos sind.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Responsible historical reconstruction compares sources, explains viewpoints, and preserves originals for reassessment.",
        },
        {
          isCorrect: true,
          label:
            "Timetables, photographs, room letters, and additional interviews show that the move occurred in stages.",
        },
        {
          isCorrect: false,
          label:
            "Memories may differ because each witness observed a different part of the event.",
        },
        {
          isCorrect: false,
          label:
            "Original recordings are preserved so later researchers can reassess the interpretation.",
        },
        {
          isCorrect: false,
          label:
            "Written documents prove that oral testimony has no historical value.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rekonstruksi sejarah yang bertanggung jawab membandingkan sumber, menjelaskan sudut pandang, dan mempertahankan bahan asli untuk penilaian ulang.",
        },
        {
          isCorrect: true,
          label:
            "Jadwal, foto, surat ruang, dan wawancara tambahan menunjukkan perpindahan berlangsung bertahap.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan ingatan dapat muncul karena setiap narasumber menyaksikan bagian peristiwa yang berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Rekaman asli disimpan agar tafsir dapat dinilai ulang oleh peneliti berikutnya.",
        },
        {
          isCorrect: false,
          label:
            "Dokumen tertulis membuktikan bahwa kesaksian lisan tidak memiliki nilai sejarah.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
