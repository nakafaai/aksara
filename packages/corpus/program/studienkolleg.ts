import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/**
 * The Studienkollegs, which prepare learners with a foreign school certificate
 * for the Feststellungsprüfung. The KMK Rahmenordnung fixes the Schwerpunktkurse
 * and the exam, and each Kolleg publishes the topics it teaches. The German
 * name stays the title and slug in every locale, as for the Oberstufe.
 */
export const studienkollegProgramSource = {
  defaultCoverageStatus: "partial",
  displayOrder: 47,
  iconKey: "certificate",
  key: LEARNING_PROGRAM_KEYS.studienkolleg,
  kind: "school-curriculum",
  navigation: {
    levels: ["stage", "course", "unit", "lesson"],
    model: "curriculum-tree",
  },
  provider: {
    homeCountry: "DE",
    kind: "official",
    name: "Kultusministerkonferenz",
  },
  recommendedCountry: "DE",
  sources: [
    {
      label:
        "Rahmenordnung für den Hochschulzugang mit ausländischen Bildungsnachweisen, für die Ausbildung an den Studienkollegs und für die Feststellungsprüfung (Beschluss der Kultusministerkonferenz vom 15.04.1994 i.d.F. vom 21.09.2006)",
      retrievedAt: "2026-11-20",
      reviewAfter: "2027-12-31",
      type: "official-policy",
      url: "https://www.kmk.org/fileadmin/pdf/ZAB/Hochschulzugang_Beschluesse_der_KMK/Rahmenordnung2006.pdf",
    },
    {
      label: "Studienkolleg der TU Darmstadt, T-Kurs, Fach Mathematik",
      retrievedAt: "2026-11-20",
      reviewAfter: "2027-12-31",
      type: "institution-document",
      url: "https://www.stk.tu-darmstadt.de/schwerpunktkurse_stk/tkurs_stk/faecher_tkurs_stk/mathematik_stk/index.de.jsp",
    },
    {
      label:
        "Niedersächsisches Studienkolleg, Inhalte des Fachunterrichts Mathematik im T-Kurs, Stand September 2023",
      retrievedAt: "2026-11-20",
      reviewAfter: "2027-12-31",
      type: "institution-document",
      url: "https://www.stk.uni-hannover.de/fileadmin/stk/footer/Pruefungsinhalte/Fachinhalte_Mathe_T-Kurs_fuer_Homepage.pdf",
    },
    {
      label:
        "Niedersächsisches Studienkolleg, Inhalte des Fachunterrichts Mathematik im M-Kurs, Stand September 2023",
      retrievedAt: "2026-11-20",
      reviewAfter: "2027-12-31",
      type: "institution-document",
      url: "https://www.stk.uni-hannover.de/fileadmin/stk/footer/Pruefungsinhalte/Fachinhalte_Mathe_M-Kurs_fuer_Homepage.pdf",
    },
    {
      label:
        "Sächsische Feststellungsprüfungsverordnung (FSPVO) vom 10. März 2026, Anlage 1 Rahmenfestlegung für Schwerpunktkurse",
      retrievedAt: "2026-11-20",
      reviewAfter: "2027-12-31",
      type: "official-policy",
      url: "https://revosax.sachsen.de/vorschrift_gesamt/21515/49551.html",
    },
    {
      label:
        "Studienkolleg Sachsen, Informationen zur Feststellungsprüfung im Fach Mathematik (T-Kurs), archived copy",
      retrievedAt: "2026-11-20",
      reviewAfter: "2027-12-31",
      type: "institution-document",
      url: "https://web.archive.org/web/20240704034939/https://www.stksachs.uni-leipzig.de/fileadmin/Einrichtung_Studienkolleg/media/pdf/ebooks/ext-info/Ext_FSP_Mathe_T_Kurs.pdf",
    },
    {
      label:
        "Studienkolleg Sachsen, Informationen zur Feststellungsprüfung im Fach Mathematik (M-Kurs), archived copy",
      retrievedAt: "2026-11-20",
      reviewAfter: "2027-12-31",
      type: "institution-document",
      url: "https://web.archive.org/web/20240702104502/https://www.stksachs.uni-leipzig.de/fileadmin/Einrichtung_Studienkolleg/media/pdf/ebooks/ext-info/Ext_FSP_Mathe_M_Kurs.pdf",
    },
  ],
  translations: [
    { appLocale: "en", publicSlug: "studienkolleg", title: "Studienkolleg" },
    { appLocale: "id", publicSlug: "studienkolleg", title: "Studienkolleg" },
    { appLocale: "de", publicSlug: "studienkolleg", title: "Studienkolleg" },
    { appLocale: "ms", publicSlug: "studienkolleg", title: "Studienkolleg" },
  ],
  version: { label: "KMK Rahmenordnung 2006, Kolleg topic lists 2023 to 2026" },
} as const;
