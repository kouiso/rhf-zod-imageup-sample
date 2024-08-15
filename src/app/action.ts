"use server";

import { revalidatePath } from "next/cache";

export async function handleFormSubmission(data: FormData) {
  try {
    // モックなデータベース処理
    console.log("データベースに保存中...", data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 模擬的な遅延

    // 成功メッセージ
    revalidatePath("/"); // キャッシュの再検証
  } catch (error) {
    console.error("データベース処理中にエラーが発生しました:", error);
    throw new Error("データベース処理中にエラーが発生しました。");
  }
}
