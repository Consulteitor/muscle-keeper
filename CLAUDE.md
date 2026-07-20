@AGENTS.md

# Muscle Keeper

Aplicació de salut per a usuaris de fàrmacs GLP-1. La font de veritat del producte (esquema de BD complet, to de veu, regles de privacitat, monetització, roadmap) viu al repo `Consulteitor/hq`, a `projectes/muscle-keeper/projecte.md`. Llegeix-lo abans de fer canvis de producte.

Regles bloquejants d'aquest repo (vegeu `hq` per al detall complet):
- Sense consell mèdic ni de dosificació al copy, mai.
- Sense emojis al copy de producte. To directe i adult, no gamificat.
- Dades de salut → RLS a totes les taules, sense excepcions.
- No servir media des de `raw.githubusercontent.com`.
- Idiomes: `es` (per defecte), `ca`, `en` — qualsevol string visible ha d'existir a `src/messages/{es,ca,en}.json`.

## Bitàcora central (hq)

L'estat de tots els projectes de l'Oriol viu al repo privat `Consulteitor/hq` (en local: `~/Projects/hq`; si no hi és: `gh repo clone Consulteitor/hq`).

- **En començar a treballar aquí:** fes `git pull` de hq i llegeix `PROJECTS.md` + `projectes/muscle-keeper/projecte.md`.
- **En acabar un bloc de feina:** afegeix una entrada a `bitacora/AAAA-MM.md` de hq (data, què s'ha fet, pendents, decisions), actualitza `projectes/muscle-keeper/projecte.md` si ha canviat res estructural, i fes commit+push de hq.
