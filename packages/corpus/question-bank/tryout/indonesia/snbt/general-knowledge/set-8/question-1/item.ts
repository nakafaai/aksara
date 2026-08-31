import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Annahmen, Datengrenzen und Entscheidungskriterien werden im Bericht unmittelbar genannt.",
        },
        {
          isCorrect: false,
          label:
            "Zwei Sensoren erfassen das Ereignis im selben Zeitraum und nicht nacheinander.",
        },
        {
          isCorrect: true,
          label:
            "Zwei gegenläufige Trends werden nebeneinandergestellt, damit ihr Unterschied deutlich erkennbar wird.",
        },
        {
          isCorrect: false,
          label:
            "Die letzte zusätzliche Einheit bringt gegenüber der vorherigen nur einen geringen Mehrnutzen.",
        },
        {
          isCorrect: false,
          label:
            "Eine Anweisung verwendet das Wort 'bald' ohne Zeitgrenze, sodass zwei Personen sie unterschiedlich auslegen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The assumptions, data limits, and decision criteria are stated directly in the report.",
        },
        {
          isCorrect: false,
          label:
            "Two sensors record the event during the same interval rather than in succession.",
        },
        {
          isCorrect: true,
          label:
            "Two trends moving in opposite directions are placed side by side so their difference is clear.",
        },
        {
          isCorrect: false,
          label:
            "The final additional unit provides only a small increase in benefit compared with the previous unit.",
        },
        {
          isCorrect: false,
          label:
            "An instruction uses 'soon' without a time limit, causing two operators to interpret it differently.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Asumsi, batas data, dan kriteria keputusan dinyatakan langsung dalam laporan.",
        },
        {
          isCorrect: false,
          label:
            "Dua sensor merekam kejadian pada selang waktu yang sama, bukan secara bergantian.",
        },
        {
          isCorrect: true,
          label:
            "Dua tren yang bergerak berlawanan ditempatkan berdampingan agar perbedaannya terlihat jelas.",
        },
        {
          isCorrect: false,
          label:
            "Unit tambahan terakhir hanya memberi kenaikan manfaat yang kecil dibanding unit sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Petunjuk memakai kata 'segera' tanpa batas waktu sehingga dua pelaksana menafsirkannya secara berbeda.",
        },
      ],
    },
  },
};

export default item;
