import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Stichproben finden bei vielen leeren Suchen relevante Dokumente, besonders in Handschriften mit alter Schreibweise.",
        },
        {
          isCorrect: false,
          label:
            "Eine Stichprobe mit manuell erweiterten Suchbegriffen findet mehr relevante Handschriften, lässt aber weiterhin Einträge mit alter Schreibweise aus.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird Leistungsunterschiede nach Schriftart und Zeitraum prüfen.",
        },
        {
          isCorrect: true,
          label:
            "Eine Vollprüfung zeigt identische Genauigkeit und Auffindbarkeit für alle Schriftarten, Schreibweisen, Zeiträume und Popularitätsstufen.",
        },
        {
          isCorrect: false,
          label: "Nutzerkorrekturen betrafen häufiger beliebte Sammlungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sample review finds relevant documents in many zero-result cases, especially handwritten notes with historical spelling.",
        },
        {
          isCorrect: false,
          label:
            "A sample using manually expanded search terms finds more relevant manuscripts but still misses records written with older spelling.",
        },
        {
          isCorrect: false,
          label:
            "The team will audit performance differences by writing type and period.",
        },
        {
          isCorrect: true,
          label:
            "A complete audit shows identical accuracy and retrieval rates across every writing type, spelling, period, and level of collection popularity.",
        },
        {
          isCorrect: false,
          label: "User corrections were more frequent for popular collections.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pemeriksaan sampel menemukan dokumen relevan pada banyak hasil nol, terutama dalam catatan tangan dengan ejaan lama.",
        },
        {
          isCorrect: false,
          label:
            "Sampel dengan kata pencarian yang diperluas secara manual menemukan lebih banyak naskah relevan, tetapi masih melewatkan catatan dengan ejaan lama.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode.",
        },
        {
          isCorrect: true,
          label:
            "Audit menyeluruh menunjukkan akurasi dan peluang ditemukan identik untuk semua jenis tulisan, ejaan, periode, dan tingkat popularitas koleksi.",
        },
        {
          isCorrect: false,
          label:
            "Koreksi pengguna lebih sering diberikan pada koleksi populer.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
