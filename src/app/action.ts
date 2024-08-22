"use server";

import { revalidatePath } from "next/cache";
import type { FormData } from "./schema"; // 修正

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function handleFormSubmission(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  try {
    // モックなデータベース処理
    console.log("データベースに保存中...", data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 模擬的な遅延

    // 成功メッセージ
    revalidatePath("/"); // キャッシュの再検証

    return { message: "フォームが正常に送信されました。" };
  } catch (error) {
    console.error("データベース処理中にエラーが発生しました:", error);
    return {
      message: "データベース処理中にエラーが発生しました。",
      issues: [error.message],
    };
  }
}
