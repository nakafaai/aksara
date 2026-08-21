import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Nur Schulgebäude benötigen eine Verringerung des Katastrophenrisikos, weil andere Infrastruktur bereits sicher ist.",
      value: false,
    },
    {
      label:
        "Frühwarnsysteme können risikobewusste Planung und die Durchsetzung von Vorschriften bei Bauvorhaben ersetzen.",
      value: false,
    },
    {
      label:
        "Katastrophenrisiken müssen erst nach Abschluss einer Entwicklungsinvestition berücksichtigt werden.",
      value: false,
    },
    {
      label:
        "Die Verringerung von Katastrophenrisiken sollte Entwicklungsinvestitionen leiten, weil sich viel kritische Infrastruktur in Gefahrenzonen befindet.",
      value: true,
    },
    {
      label:
        "Die Verstärkung von Gebäuden reicht auch ohne Vorschriften, Aufsicht oder Katastrophenschutzübungen aus.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "Only school buildings need disaster-risk reduction because other infrastructure is already safe.",
      value: false,
    },
    {
      label:
        "Early-warning systems can replace risk-aware planning and enforcement in development projects.",
      value: false,
    },
    {
      label:
        "Disaster risks need to be considered only after a development investment has been completed.",
      value: false,
    },
    {
      label:
        "Disaster-risk reduction should guide development investment because much critical infrastructure lies in hazard zones.",
      value: true,
    },
    {
      label:
        "Reinforcing buildings is sufficient even without regulation, oversight, or preparedness drills.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Hanya bangunan sekolah yang memerlukan pengurangan risiko bencana karena infrastruktur lain sudah aman.",
      value: false,
    },
    {
      label:
        "Sistem peringatan dini dapat menggantikan perencanaan berbasis risiko dan penegakan aturan dalam pembangunan.",
      value: false,
    },
    {
      label:
        "Risiko bencana baru perlu diperhitungkan setelah investasi pembangunan selesai dijalankan.",
      value: false,
    },
    {
      label:
        "Pengurangan risiko bencana harus menjadi acuan investasi pembangunan karena banyak infrastruktur penting berada di zona bahaya.",
      value: true,
    },
    {
      label:
        "Penguatan bangunan sudah cukup meskipun tanpa regulasi, pengawasan, atau latihan kesiapsiagaan.",
      value: false,
    },
  ],
};

export default choices;
