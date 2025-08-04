// controllers/syncPost.controllers.js
import {
  authorizeGoogle,
  fetchParsedSheet,
} from "../utils/googleSheetServices.js";
import Post from "../models/post.models.js";

export const syncPostsFromSheet = async (req, res) => {
  try {
    console.log("🔍 Step 1: Starting sync...");

    const auth = await authorizeGoogle();
    console.log("✅ Step 2: Authorized with Google");

    const spreadsheetId = "1M_ysaqEcruLL-52xV_tx5smdAd2KWTnYSjm5OKZzeVA";
    const range = "Sheet1!A1:L"; // Include headers now

    const parsedRows = await fetchParsedSheet(auth, spreadsheetId, range);
    console.log("✅ Step 3: Parsed rows:", parsedRows.length);

    if (!parsedRows.length) {
      console.log("⚠️ No rows to sync.");
      return res.status(404).send("No valid data found.");
    }

    let createdCount = 0;

    for (const row of parsedRows) {
      const {
        title,
        body,
        summary,
        author,
        category,
        date,
        imageUrl,
        status,
        likes,
        createdAt,
      } = row;

      // Skip if required fields are missing
      if (!title || !body || !summary || !category || !date) {
        console.warn(
          "⛔ Skipping row due to missing fields:",
          title || "(no title)"
        );
        continue;
      }

      // Avoid inserting duplicate posts
      const exists = await Post.findOne({ title });
      if (exists) {
        console.log("ℹ️ Post already exists:", title);
        continue;
      }

      await Post.create({
        title,
        body,
        summary,
        author: author || "Admin",
        category,
        date: new Date(date),
        imageUrl: imageUrl || "",
        status: status || "published",
        likes: Number(likes) || 0,
        createdAt: createdAt ? new Date(createdAt) : undefined,
      });

      console.log("📝 Created post:", title);
      createdCount++;
    }

    return res.status(200).send(`✅ Synced ${createdCount} new post(s).`);
  } catch (err) {
    console.error("🛑 Sync error:", err.message);
    return res.status(500).send("Failed to sync posts.");
  }
};
