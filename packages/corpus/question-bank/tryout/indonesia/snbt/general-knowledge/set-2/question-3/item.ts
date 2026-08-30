import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nur Schulgebäude benötigen eine Verringerung des Katastrophenrisikos, weil andere Infrastruktur bereits sicher ist.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Frühwarnsysteme können risikobewusste Planung und die Durchsetzung von Vorschriften bei Bauvorhaben ersetzen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Katastrophenrisiken müssen erst nach Abschluss einer Entwicklungsinvestition berücksichtigt werden.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die Verringerung von Katastrophenrisiken sollte Entwicklungsinvestitionen leiten, weil sich viel kritische Infrastruktur in Gefahrenzonen befindet.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Verstärkung von Gebäuden reicht auch ohne Vorschriften, Aufsicht oder Katastrophenschutzübungen aus.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Only school buildings need disaster-risk reduction because other infrastructure is already safe.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Early-warning systems can replace risk-aware planning and enforcement in development projects.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Disaster risks need to be considered only after a development investment has been completed.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Disaster-risk reduction should guide development investment because much critical infrastructure lies in hazard zones.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Reinforcing buildings is sufficient even without regulation, oversight, or preparedness drills.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Hanya bangunan sekolah yang memerlukan pengurangan risiko bencana karena infrastruktur lain sudah aman.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sistem peringatan dini dapat menggantikan perencanaan berbasis risiko dan penegakan aturan dalam pembangunan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Risiko bencana baru perlu diperhitungkan setelah investasi pembangunan selesai dijalankan.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pengurangan risiko bencana harus menjadi acuan investasi pembangunan karena banyak infrastruktur penting berada di zona bahaya.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penguatan bangunan sudah cukup meskipun tanpa regulasi, pengawasan, atau latihan kesiapsiagaan.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
