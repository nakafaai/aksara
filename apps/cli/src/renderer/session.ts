import type { PreviewRepository } from "@nakafa/aksara-contracts/preview/spec";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import { findAksaraRoot, resolveNakafaRoot } from "#cli/checkout";
import type { RunningNakafa } from "#cli/child/session";
import {
  makePreviewCredentials,
  type PreviewCredentials,
} from "#cli/credentials";
import type { PreviewEnvironment } from "#cli/environment/read";
import {
  type PreviewEvidenceError,
  readRepositoryEvidence,
} from "#cli/evidence";
import type { SelectedDocument } from "#cli/integrity";
import { NakafaApp } from "#cli/nakafa";
import { openPreviewProvider, type PreviewProvider } from "#cli/provider";
import { selectCatalogDocument, selectPreviewDocument } from "#cli/repository";

/** Renderer discovery backed by either one request or the complete catalog. */
export type RendererSessionSelection =
  | { readonly kind: "catalog" }
  | { readonly kind: "document"; readonly requestedPath: string };

/** Inputs required to open one scoped actual Nakafa renderer session. */
export interface RendererSessionInput {
  readonly cwd: string;
  readonly environment: PreviewEnvironment;
  readonly selection: RendererSessionSelection;
}

/** Shared actual-app resources used by preview and catalog validation. */
export interface RendererSession {
  readonly aksaraRoot: string;
  readonly child: RunningNakafa;
  readonly credentials: PreviewCredentials;
  readonly manifest: RendererManifestEnvelope;
  readonly provider: PreviewProvider;
  readonly repositories: {
    readonly aksara: PreviewRepository;
    readonly nakafa: PreviewRepository;
  };
  /** Re-reads exact repository identity before committing preview state. */
  readonly repositoryEvidence: Effect.Effect<
    {
      readonly aksara: PreviewRepository;
      readonly nakafa: PreviewRepository;
    },
    PreviewEvidenceError
  >;
  readonly selected: SelectedDocument;
}

/** Converts exact repository evidence into concise structured CLI output. */
function logEvidence(
  repository: "aksara" | "nakafa",
  evidence: PreviewRepository
) {
  return Effect.logInfo("Renderer repository evidence.").pipe(
    Effect.annotateLogs({
      dirty: evidence.dirty,
      repository,
      sha: evidence.sha,
    })
  );
}

/** Reads current revision evidence for both participating checkouts. */
const readRepositories = Effect.fn("AksaraCli.readRendererRepositories")(
  function* (aksaraRoot: string, nakafaRoot: string) {
    return yield* Effect.all(
      {
        aksara: readRepositoryEvidence("aksara", aksaraRoot),
        nakafa: readRepositoryEvidence("nakafa", nakafaRoot),
      },
      { concurrency: 2 }
    );
  }
);

/** Selects the exact real corpus document used by one renderer session. */
function selectDocument(
  aksaraRoot: string,
  selection: RendererSessionSelection
) {
  if (selection.kind === "catalog") {
    return selectCatalogDocument(aksaraRoot);
  }
  return selectPreviewDocument(aksaraRoot, selection.requestedPath);
}

/** Opens and authenticates one scoped session against the actual Nakafa app. */
export const openRendererSession = Effect.fn("AksaraCli.openRendererSession")(
  function* (input: RendererSessionInput) {
    const app = yield* NakafaApp;
    const exactProcess = yield* ExactProcess;
    const aksaraRoot = yield* findAksaraRoot(input.cwd);
    const nakafaRoot = yield* resolveNakafaRoot(
      aksaraRoot,
      input.environment.nakafaAppDir
    );
    const selected = yield* selectDocument(aksaraRoot, input.selection);
    const repositoryEvidence = readRepositories(aksaraRoot, nakafaRoot).pipe(
      Effect.provideService(ExactProcess, exactProcess)
    );
    const repositories = yield* repositoryEvidence;
    yield* Effect.all([
      logEvidence("aksara", repositories.aksara),
      logEvidence("nakafa", repositories.nakafa),
    ]);
    const credentials = yield* makePreviewCredentials();
    const provider = yield* openPreviewProvider({
      document: selected.document,
      repositories,
      token: credentials.providerToken,
    });
    const child = yield* app.start({
      credentials,
      provider,
      root: nakafaRoot,
    });
    const manifest = yield* app
      .fetchRenderer(child.origin, credentials.renderer)
      .pipe(Effect.raceFirst(child.awaitExit));
    return {
      aksaraRoot,
      child,
      credentials,
      manifest,
      provider,
      repositories,
      repositoryEvidence,
      selected,
    } satisfies RendererSession;
  }
);
