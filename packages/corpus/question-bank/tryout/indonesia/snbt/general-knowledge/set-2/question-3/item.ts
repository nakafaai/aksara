import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nur Schulgebäude benötigen eine Verringerung des Katastrophenrisikos, weil andere Infrastruktur bereits sicher ist.",
        },
        {
          isCorrect: true,
          label:
            "Die Verringerung von Katastrophenrisiken sollte Entwicklungsinvestitionen leiten, weil sich viel kritische Infrastruktur in Gefahrenzonen befindet.",
        },
        {
          isCorrect: false,
          label:
            "Frühwarnsysteme können risikobewusste Planung und die Durchsetzung von Vorschriften bei Bauvorhaben ersetzen.",
        },
        {
          isCorrect: false,
          label:
            "Katastrophenrisiken müssen erst nach Abschluss einer Entwicklungsinvestition berücksichtigt werden.",
        },
        {
          isCorrect: false,
          label:
            "Die Verstärkung von Gebäuden reicht auch ohne Vorschriften, Aufsicht oder Katastrophenschutzübungen aus.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Only school buildings need disaster-risk reduction because other infrastructure is already safe.",
        },
        {
          isCorrect: true,
          label:
            "Disaster-risk reduction should guide development investment because much critical infrastructure lies in hazard zones.",
        },
        {
          isCorrect: false,
          label:
            "Early-warning systems can replace risk-aware planning and enforcement in development projects.",
        },
        {
          isCorrect: false,
          label:
            "Disaster risks need to be considered only after a development investment has been completed.",
        },
        {
          isCorrect: false,
          label:
            "Reinforcing buildings is sufficient even without regulation, oversight, or preparedness drills.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Hanya bangunan sekolah yang memerlukan pengurangan risiko bencana karena infrastruktur lain sudah aman.",
        },
        {
          isCorrect: true,
          label:
            "Pengurangan risiko bencana harus menjadi acuan investasi pembangunan karena banyak infrastruktur penting berada di zona bahaya.",
        },
        {
          isCorrect: false,
          label:
            "Sistem peringatan dini dapat menggantikan perencanaan berbasis risiko dan penegakan aturan dalam pembangunan.",
        },
        {
          isCorrect: false,
          label:
            "Risiko bencana baru perlu diperhitungkan setelah investasi pembangunan selesai dijalankan.",
        },
        {
          isCorrect: false,
          label:
            "Penguatan bangunan sudah cukup meskipun tanpa regulasi, pengawasan, atau latihan kesiapsiagaan.",
        },
      ],
    },
  },
};

export default item;
