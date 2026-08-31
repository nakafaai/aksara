import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Auswirkung ist groß genug, um das Hauptergebnis zu verändern, und nicht nur eine kleine Randabweichung.",
        },
        {
          isCorrect: false,
          label:
            "Der Bericht bewertet Nutzen, Risiken, Kosten und Auswirkungen auf verschiedene Gruppen, bevor er eine Empfehlung abgibt.",
        },
        {
          isCorrect: true,
          label:
            "Eine grundlegende Annahme wird zuerst geprüft, weil alle späteren Schlussfolgerungen von ihr abhängen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verwirft eine ansprechende Grafik, weil sie die Forschungsfrage nicht beantwortet.",
        },
        {
          isCorrect: false,
          label:
            "Die Veränderung ist groß genug, um die Entscheidung auch unter Berücksichtigung der Messunsicherheit zu ändern.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The effect is large enough to change the main outcome rather than merely adding a small edge variation.",
        },
        {
          isCorrect: false,
          label:
            "The report assesses benefits, risks, costs, and effects on different groups before making a recommendation.",
        },
        {
          isCorrect: true,
          label:
            "A basic assumption is examined first because every later conclusion depends on it.",
        },
        {
          isCorrect: false,
          label:
            "The team rejects an attractive chart because it does not answer the research question.",
        },
        {
          isCorrect: false,
          label:
            "The change is large enough to alter the decision after measurement uncertainty is considered.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dampaknya cukup besar untuk mengubah hasil utama, bukan sekadar variasi kecil di tepi.",
        },
        {
          isCorrect: false,
          label:
            "Laporan menilai manfaat, risiko, biaya, dan dampak pada berbagai kelompok sebelum memberi rekomendasi.",
        },
        {
          isCorrect: true,
          label:
            "Satu asumsi dasar diperiksa lebih dahulu karena seluruh simpulan berikutnya bergantung padanya.",
        },
        {
          isCorrect: false,
          label:
            "Tim menolak grafik yang menarik karena grafik itu tidak menjawab pertanyaan penelitian.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan cukup besar untuk mengubah keputusan setelah ketidakpastian pengukuran turut dipertimbangkan.",
        },
      ],
    },
  },
};

export default item;
