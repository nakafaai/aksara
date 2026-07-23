# ADR 0002: Recoverable release state

- Status: Accepted
- Date: 2026-07-23

## Context

A content release changes Convex state and Nakafa cache visibility, while a
renderer change is deployed independently. Convex and Vercel do not share a
distributed transaction. A release protocol therefore needs an invisible
candidate, an already-proven inverse, one atomic visibility change, explicit
operator acceptance, and a forward recovery path.

The protocol must also survive duplicate requests, transport failure after a
successful commit, process crashes between pages, and retry from another
runner. Process memory and a workflow run are not authoritative state.

References:

- [Convex mutation transactions](https://docs.convex.dev/functions/mutation-functions#transactions)
- [Convex optimistic concurrency control](https://docs.convex.dev/database/advanced/occ)
- [Convex pagination](https://docs.convex.dev/database/pagination)
- [MDX `run` security warning](https://mdxjs.com/packages/mdx/#runcode-options)

## Decision

Convex owns one authoritative publication singleton with three slots:

| Slot | Meaning |
|---|---|
| `active` | Completed release currently visible to reads |
| `candidate` | Invisible release being staged or verified |
| `recovery` | Signed, verified inverse protecting candidate or active |

A staged slot has only `staging`, `verifying`, `verified`, or `aborting`
phase. Historical status may additionally be `missing`, `aborted`, or
`completed`. There is no `active` or `finalizing` phase and no `finalize`
operation. Visibility and ownership are settled by the activation mutation,
not by a later copy loop.

Candidate release ID, recovery release ID, and the candidate base release ID
must be distinct. The release manifest binds its immutable base identity,
result catalog, item stream, projection stream, route stream, renderer
manifest, structured snapshot states, and provenance. Routes are a separate
ordered signed stream; they are not reconstructed from projection metadata
during publication or rollback.

### Structured snapshots

The same global release pointer selects three fixed structured families:
`program`, `quran`, and `tryout`. There is no per-family active pointer and no
second release protocol.

Every signed release declares one transition for each family:

| Mode | Meaning | Rows staged |
|---|---|---|
| `inherit` | Preserve the base snapshot identity | Zero |
| `replace` | Select one new complete immutable snapshot | All rows |
| `restore` | Forward rollback to an existing or absent snapshot | Zero |

The transition signs the base and result snapshot IDs, row count, and row
digest. A replacement separately stages the domain manifest and bounded rows.
Verification recomputes the domain manifest identity, every row hash, canonical
order, counts, and digests before activation. `stageSnapshot` owns one domain
manifest; `stageSnapshotBatch` owns bounded rows. Body projections are not
overloaded for structured data.

Program snapshots authenticate the six real program rows and all 12 `en`/`id`
slug identities. Try-out snapshots authenticate the active hierarchy and
artifact-bound attempt placements. Quran snapshots authenticate all 114
surahs, 6,236 verses, localized search rows, and reviewed provenance status.
Quran production activation remains fail-closed while provenance is blocked.

The global release Ed25519 signature is the only publication trust root.
Family manifests are authenticated transitively by their content-addressed
snapshot ID in the signed release. Quran does not have an independent
signature or release state.

### Candidate activation

1. Read authoritative current state and reject a conflicting candidate or
   retained recovery.
2. Stage the signed candidate and its bounded item, route, projection,
   structured-snapshot, and artifact batches.
3. Recompute and verify every signed candidate count and digest.
4. Derive, sign, stage, and verify the candidate's exact inverse under the
   operator-selected recovery ID.
5. Re-fetch the deployed Nakafa renderer manifest and require its exact hash
   to match the candidate.
6. In one Convex mutation, compare the expected base, set `active` to the
   candidate, clear `candidate`, and retain the verified inverse in
   `recovery`.

The candidate is never visible before step 6. A second candidate is rejected
while recovery is retained.

### Acceptance and recovery

`accept --release-id A --recovery-id R` is the explicit healthy-release
decision. It requires `A` to be active and `R` to be its retained inverse,
then resumably aborts `R`. It needs publication authentication but no signing
key or renderer credential.

`recover --release-id A --recovery-id R` is forward recovery. It verifies the
signed inverse again, revalidates the current deployed renderer against `R`,
and atomically activates `R`. It needs publication and renderer credentials,
but no signing key. Recovery never moves an active pointer backward and never
reuses `A` as the new release identity.

If the activation response is lost, retry first reads historical completion
evidence for the exact active and recovery pair. A matching completed receipt
is authenticated and returned without a second activation. A missing lookup
continues from current state. A different identity fails closed.

### Failure and cleanup

Before activation, publisher failure remains invisible. Cleanup first aborts
the exact staged inverse, then aborts the exact candidate, so a candidate is
never left with an untracked recovery. Abort is bounded, idempotent, and
resumable from backend-owned progress.

Retention cleanup is separate from release state. It deletes only immutable
artifacts that are unreachable and old enough; it does not copy heads,
finalize visibility, or delete an active, candidate, or recovery release.

## Trust boundary

Aksara authors are trusted production code authors. Signed MDX is executable
reviewed code, not a sandbox and not a public-upload format.

Production v1 trusts authenticated Convex state for route and head membership,
delivery classification, and the active publication pointer. Nakafa still
independently decodes and verifies the signed release, exact renderer manifest,
signed artifact, artifact hash, component requirements, and projection hash
before execution.

The signed result catalog digest authenticates the complete canonical result
set. It is not a per-row inclusion proof. The current design therefore detects
an artifact, release, renderer, or projection mismatch, but it does not claim
tamper resistance if an attacker can arbitrarily rewrite trusted Convex
membership or delivery state. Adding that stronger database-compromise threat
model would require an authenticated membership proof and a new ADR.

Public, authenticated, and entitled delivery remain separate server reads.
Public routes and LLMS must never receive protected answers merely because the
source repository is public.

## Consequences

- Every release and explicit rollback has a verified recovery path before it
  becomes visible.
- Healthy acceptance and emergency recovery are intentional operator actions.
- Content publication does not pretend to transact with a renderer deploy.
- Lost responses and runner crashes resume from durable state.
- New candidates wait until retained recovery is accepted or activated.
- Cleanup remains bounded and cannot become a hidden finalization phase.

## Rejected

- Activating a candidate before its inverse is verified.
- A mutable `live` copy followed by a long finalization loop.
- Rewinding a global pointer as rollback.
- Sharing one release ID between candidate and recovery.
- Reconstructing route ownership from a different projection stream.
- Separate program, Quran, or try-out active pointers.
- A detached Quran-only signature or family-specific release protocol.
- Copying immutable structured rows during forward rollback.
- Treating a result digest as a row inclusion proof.
- Claiming signed artifacts protect against arbitrary trusted-database writes.
