import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Sichere, ausgewogene Pausensnacks können zur Nährstoffaufnahme von Kindern beitragen",
        },
        {
          isCorrect: false,
          label: "Jeder Pausensnack ist unsicher",
        },
        {
          isCorrect: false,
          label: "Kinder sollten ihre Hauptmahlzeiten durch Snacks ersetzen",
        },
        {
          isCorrect: false,
          label:
            "Mikrobiologische und chemische Sicherheit können ignoriert werden, wenn ein Snack genügend Energie liefert",
        },
        {
          isCorrect: false,
          label:
            "Energie ist das einzige Ernährungskriterium bei der Auswahl eines Snacks",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Safe, nutritionally balanced school snacks can contribute to children's nutrient intake",
        },
        {
          isCorrect: false,
          label: "Every school snack is unsafe",
        },
        {
          isCorrect: false,
          label: "Children should replace their main meals with snacks",
        },
        {
          isCorrect: false,
          label:
            "Microbiological and chemical safety can be ignored when a snack provides enough energy",
        },
        {
          isCorrect: false,
          label:
            "Energy is the only nutritional consideration when choosing a snack",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Makanan selingan sekolah yang aman dan bergizi seimbang dapat membantu memenuhi asupan zat gizi anak",
        },
        {
          isCorrect: false,
          label: "Semua jajanan sekolah tidak aman",
        },
        {
          isCorrect: false,
          label: "Anak sebaiknya mengganti makanan utama dengan jajanan",
        },
        {
          isCorrect: false,
          label:
            "Keamanan mikrobiologis dan kimia boleh diabaikan jika jajanan menyediakan cukup energi",
        },
        {
          isCorrect: false,
          label:
            "Energi merupakan satu-satunya pertimbangan gizi saat memilih makanan selingan",
        },
      ],
    },
  },
};

export default item;
