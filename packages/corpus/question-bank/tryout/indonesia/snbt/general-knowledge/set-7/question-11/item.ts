import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nach dem Abbau der Zugangshindernisse erscheinen Vorschläge zuvor nicht vertretener Weiler im Ergebnis.",
        },
        {
          isCorrect: false,
          label:
            "Eine überarbeitete Einladung macht Zeitpunkt und Ort der Versammlung leichter auffindbar, ohne die verfügbaren Teilnahmewege zu verändern.",
        },
        {
          isCorrect: false,
          label:
            "Die endgültige Entscheidung wird Auswahl, Einwände und Einfluss der Beiträge festhalten.",
        },
        {
          isCorrect: false,
          label:
            "Fast alle ersten Redebeiträge kamen aus den drei nächstgelegenen Vierteln.",
        },
        {
          isCorrect: true,
          label:
            "Neue Daten zeigen, dass Bewohner der Hügel trotz von Anfang an gleichwertiger Termine, Fahrten, Informationen und Kommunikationshilfen fernblieben.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "After access barriers are reduced, proposals from previously unrepresented hamlets appear in the consultation results.",
        },
        {
          isCorrect: false,
          label:
            "A revised invitation makes the meeting time and location easier to find without changing the available ways to participate.",
        },
        {
          isCorrect: false,
          label:
            "The final decision will record the choice, objections, and the influence of contributions.",
        },
        {
          isCorrect: false,
          label:
            "Nearly every initial speaker came from the three nearest neighbourhoods.",
        },
        {
          isCorrect: true,
          label:
            "New data show that hill residents chose not to attend even though equivalent schedules, transport, information, and communication support had existed from the start.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setelah hambatan akses dikurangi, usulan dari dusun yang sebelumnya tidak terwakili mulai muncul dalam hasil musyawarah.",
        },
        {
          isCorrect: false,
          label:
            "Undangan yang direvisi membuat waktu dan lokasi musyawarah lebih mudah ditemukan tanpa mengubah jalur partisipasi yang tersedia.",
        },
        {
          isCorrect: false,
          label:
            "Keputusan akhir akan mencatat pilihan, keberatan, dan pengaruh masukan.",
        },
        {
          isCorrect: false,
          label:
            "Hampir seluruh pembicara pertama berasal dari tiga rukun tetangga terdekat.",
        },
        {
          isCorrect: true,
          label:
            "Data baru menunjukkan warga perbukitan sebenarnya memilih tidak hadir meskipun tersedia jadwal, transportasi, informasi, dan sarana komunikasi yang setara sejak awal.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
