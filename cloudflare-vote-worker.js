const VALID_ITEMS = {
  maps: new Set([
    "nacht", "verruckt", "shino", "derriese", "kino", "five", "ascension",
    "callofthedead", "shangri", "moon", "tranzit", "dierise", "mob", "buried",
    "origins", "shadows", "thegiant", "eisendrache", "zetsubou", "gorod",
    "revelations", "ix", "voyage", "blood", "dotn", "ancientevil", "tag",
    "diemaschine", "firebase", "mauer", "forsaken", "terminus", "liberty",
    "citadelle", "tomb", "shatteredveil", "reckoning", "ashes", "astro",
    "paradox", "totenreich"
  ]),
  weapons: new Set([
    "raygun", "ray-gun-mk2", "wunderwaffe", "wunderwaffe-dg-scharfschutze",
    "thundergun", "winters-howl", "vr-11", "scavenger", "31-79-jgb215",
    "wave-gun", "thrustodyne-m23", "sliquifier", "paralyzer", "blundergat",
    "staves", "apothicon-servant", "bows", "kt-4", "gkz-45-mk3",
    "death-of-orion", "kraken", "alistairs-folly", "savage-impaler",
    "hands-of-god", "tundragun", "die-shockwave", "rai", "crbr-s",
    "chrysalax", "dr-11-beamsmasher", "jotun-star", "gorgofex", "necrofluid",
    "lgm-1"
  ]),
  perks: new Set([
    "jugg", "qr", "sc", "ddc", "sf", "phd", "mule", "deadshot-daiquiri",
    "tomb", "whos-who", "vulture-aid", "electric-cherry", "widows-wine",
    "der-wunderfizz", "deadshot-dealer", "death-perception", "dying-wish",
    "victorious-tortoise", "stone-cold-stronghold", "winters-wail", "timeslip",
    "ethereal-razor", "electric-burst", "zombshell", "secret-sauce",
    "bandolier-bandit", "blaze-phase", "blood-wolf-bite", "elemental-pop",
    "phd-slider", "melee-macchiato"
  ]),
  characters: new Set([
    "dempsey", "nikolai", "takeo", "richtofen", "samantha", "maxis",
    "marlton", "misty", "russman", "stuhlinger", "maya", "weaver", "grey",
    "carver", "bruno", "diego", "scarlet", "shaw", "monty", "shadowman",
    "director_richtofen", "peck", "strauss", "raptor_one", "ravenov", "sam_ai"
  ]),
};

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "https://group935.net",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(body, env, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(env),
    },
  });
}

function normalizePollId(value) {
  const pollId = String(value || "maps");
  return VALID_ITEMS[pollId] ? pollId : null;
}

async function voterHash(voterId, secret) {
  const text = `${secret}:${voterId}`;
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function getTotals(env, pollId) {
  const rows = await env.DB.prepare(
    "SELECT item_id, COUNT(*) AS count FROM votes WHERE poll_id = ? GROUP BY item_id"
  ).bind(pollId).all();

  const counts = {};
  let totalVotes = 0;

  for (const row of rows.results || []) {
    counts[row.item_id] = row.count;
    totalVotes += row.count;
  }

  return { pollId, counts, totalVotes };
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(env),
      });
    }

    if (request.method === "GET") {
      const url = new URL(request.url);
      const pollId = normalizePollId(url.searchParams.get("poll"));
      if (!pollId) return json({ error: "Invalid poll" }, env, 400);
      return json(await getTotals(env, pollId), env);
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, env, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, env, 400);
    }

    const pollId = normalizePollId(body.pollId || body.poll);
    const itemId = String(body.itemId || body.mapId || "");
    const voterId = String(body.voterId || "");

    if (!pollId) {
      return json({ error: "Invalid poll" }, env, 400);
    }

    if (!VALID_ITEMS[pollId].has(itemId)) {
      return json({ error: "Invalid vote item" }, env, 400);
    }

    if (voterId.length < 12 || voterId.length > 160) {
      return json({ error: "Invalid voter" }, env, 400);
    }

    const hash = await voterHash(voterId, env.VOTE_HASH_SECRET);

    const existing = await env.DB.prepare(
      "SELECT item_id FROM votes WHERE poll_id = ? AND voter_hash = ?"
    ).bind(pollId, hash).first();

    if (existing) {
      if (existing.item_id !== itemId) {
        await env.DB.prepare(
          "UPDATE votes SET item_id = ?, updated_at = CURRENT_TIMESTAMP WHERE poll_id = ? AND voter_hash = ?"
        ).bind(itemId, pollId, hash).run();
      }

      return json({
        accepted: true,
        changed: existing.item_id !== itemId,
        previousItemId: existing.item_id,
        itemId,
        ...(await getTotals(env, pollId)),
      }, env);
    }

    try {
      await env.DB.prepare(
        "INSERT INTO votes (poll_id, voter_hash, item_id) VALUES (?, ?, ?)"
      ).bind(pollId, hash, itemId).run();
    } catch {
      return json({ error: "Vote could not be saved" }, env, 500);
    }

    return json({
      accepted: true,
      changed: false,
      itemId,
      ...(await getTotals(env, pollId)),
    }, env);
  },
};
